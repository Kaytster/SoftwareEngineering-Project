"use server";

import path from "path";
import fs from "fs";
import { verifySession } from "../../lib/session";
import Database, { Database as DBType, Statement } from "better-sqlite3";
import { randomUUID } from "crypto";

export interface IDBUser {
  UserID: string;
  Email: string;
  PasswordHash: string;
  FirstName: string;
  MiddleName: string | null;
  LastName: string;
  Address: string;
  Postcode: string;
  PhoneNumber: string;
  AvatarImageID: string | null;
  Role: string;
  Status: string;
  CharityID: string | null;
}

interface IUser {
  UserID: string;
  Email: string;
  PasswordHash: string;
  FirstName: string;
  MiddleName: string | null;
  LastName: string;
  Address: string;
  Postcode: string;
  PhoneNumber: string;
  AvatarImageID: string | null;
  Role: string;
  Status: string;
}

interface ICharityUser extends IUser {
  CharityID: string | null;
  CharityName: string;
  Description: string;
}

export interface ICharityStripped {
  CharityID: string;
  CharityName: string;
  Email: string;
  PhoneNumber: string;
}

export interface ICategory {
  CategoryID: number;
  Description: string;
}

export interface IImage {
  ImageID: string;
  ServerName: string;
}

export async function getAllUsers() {
  const session = await verifySession();

  if (!session || session.userRole !== "Admin") {
    return {
      status: 401,
      statusText: "Unauthorized",
    };
  }

  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH!, {
      fileMustExist: true,
      readonly: true,
    });
  } catch (err) {
    return {
      status: 500,
      statusText: err as string,
    };
  }

  let adminsSt = database.prepare(
    `SELECT
      UserID, Email, FirstName, MiddleName, LastName, Address, Postcode, PhoneNumber, AvatarImageID, Role, Status
    FROM User
    WHERE Role = 'Admin'
    ORDER BY UserID
    ;`,
  );
  let donorsSt = database.prepare(
    `SELECT
      UserID, Email, FirstName, MiddleName, LastName, Address, Postcode, PhoneNumber, AvatarImageID, Role, Status
    FROM User
    WHERE Role = 'Donor'
    ORDER BY UserID
    ;`,
  );
  let charitiesSt = database.prepare(
    `SELECT
      UserID, User.Email, FirstName, MiddleName, LastName, User.Address, User.Postcode, User.PhoneNumber, AvatarImageID, Role, Status, User.CharityID, CharityName, Description
    FROM User INNER JOIN Charity ON Charity.CharityID = User.CharityID
    WHERE Role = 'CharityWorker'
    ORDER BY UserID
    ;`,
  );

  let admins = adminsSt.all() as IUser[];
  let donors = donorsSt.all() as IUser[];
  let charities = charitiesSt.all() as ICharityUser[];

  database.close();

  return {
    status: 200,
    statusText: "Success",
    data: {
      admins,
      donors,
      charities,
    },
  };
}

export async function getAllCharities() {
  const session = await verifySession();
  if (!session) {
    return {
      status: 401,
      statusText: "Unauthorized",
    };
  }

  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH, {
      fileMustExist: true,
      readonly: true,
    });

    let st = database.prepare(
      `SELECT CharityID, CharityName, Email, PhoneNumber
      FROM Charity
      ;`,
    );

    let charities = st.all() as ICharityStripped[];

    database.close();

    return {
      status: 200,
      statusText: "Success!",
      data: charities,
    };
  } catch (err) {
    return {
      status: 500,
      statusText: err,
    };
  }
}

export async function getAllCategories() {
  const session = await verifySession();
  if (!session) {
    return {
      status: 401,
      statusText: "Unauthorized",
    };
  }

  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH, {
      fileMustExist: true,
      readonly: true,
    });

    let st = database.prepare(
      `SELECT CategoryID, Description
      FROM Category
      ;`,
    );

    let categories = st.all() as ICategory[];

    database.close();

    return {
      status: 200,
      statusText: "Success!",
      data: categories,
    };
  } catch (err) {
    if (database !== null) {
      database.close();
    }

    return {
      status: 500,
      statusText: err,
    };
  }
}

export async function postDonation(formData: FormData) {
  const session = await verifySession();

  if (!session || session?.userRole !== "Donor") {
    return {
      status: 401,
      statusText: "Unauthorized",
    };
  }

  let itemName = formData.get("itemName");
  let itemDesc = formData.get("itemDesc");
  let itemTags = formData.get("itemTags");
  let itemPhoto = formData.get("itemPhotos") as File;
  let itemCategory = Number(formData.get("itemCategory"));
  let charity = formData.get("charity");

  if (itemCategory < 1) {
    return {
      status: 400,
      statusText: "Item category is required but was not chosen.",
    };
  }
  if (charity === "none" || !charity) {
    return {
      status: 400,
      statusText: "Charity is required but was not chosen.",
    };
  }

  // simple check for image upload
  if (itemPhoto.size === 0) {
    return {
      status: 400,
      statusText: "Item photo is required but was not provided",
    };
  }

  const arrayBuffer = await itemPhoto.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  let fileExtension = path.extname(itemPhoto.name);
  let fileName = randomUUID() + fileExtension;
  let outDir = path.join(process.cwd(), "public", "uploads");
  try {
    await fs.writeFile(path.join(outDir, fileName), buffer, (err) => {
      if (err) throw err;
    });
    console.log(`File \"${fileName}\" has been written to the disk!`);
  } catch (err) {
    return {
      status: 500,
      statusText: err,
    };
  }

  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH, {
      fileMustExist: true,
    });

    // What are the chances of UUID collision?
    // Only one way to find out...
    let clothingItemStatement = database.prepare(
      `INSERT INTO ClothingItem
        (ItemID, CategoryID, Colour, Brand, ClothingSize, Description)
      VALUES
        (LOWER(HEX(RANDOMBLOB(16))), ?, ?, ?, ?, ?)
      ;`,
    );

    let imageStatement = database.prepare(
      `INSERT INTO Image
        (ImageID, ServerName)
      VALUES
        (LOWER(HEX(RANDOMBLOB(16))), ?);
      ;`,
    );

    let donationStatement = database.prepare(
      `INSERT INTO Donation
        (DonationID, ItemID, ImageID, DonorID, CharityID, DateTime, Status, AcceptedDate)
      VALUES
        (LOWER(HEX(RANDOMBLOB(16))), ?, ?, ?, ?, DATETIME('now'), 'PENDING', NULL)
      ;`,
    );

    let imageIdSt = database.prepare(
      `SELECT ImageID, ServerName
      FROM Image
      WHERE ROWID = ?
      ;`,
    );

    let itemIdSt = database.prepare(
      `SELECT ItemID
      FROM ClothingItem
      WHERE ROWID = ?
      ;`,
    );

    let imageRes = imageStatement.run(fileName);
    let imageIdRes = imageIdSt.get(imageRes.lastInsertRowid) as {
      ImageID: string;
      ServerName: string;
    };

    let itemRes = clothingItemStatement.run(
      itemCategory,
      "Unknown",
      "Offbrand",
      "XL",
      itemDesc,
    );
    let itemIdRes = itemIdSt.get(itemRes.lastInsertRowid) as {
      ItemID: string;
    };

    let donationRes = donationStatement.run(
      itemIdRes.ItemID,
      imageIdRes.ImageID,
      session.userId,
      charity,
    );

    database.close();

    return {
      status: 200,
      statusText: "Donation created successfully!",
    };
  } catch (err) {
    return {
      status: 500,
      statusText: err as string,
    };
  }
}

export async function getImageNameById(imageId: string) {
  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH, {
      fileMustExist: true,
      readonly: true,
    });

    let st = database.prepare(
      `SELECT ImageID, ServerName
      FROM Image
      WHERE ImageID = ?
      ;`,
    );

    let res: undefined | IImage = st.get(imageId) as undefined | IImage;

    database.close();

    if (!res) {
      return {
        status: 404,
        statusText: "Not found",
      };
    }

    return {
      status: 200,
      statusText: "Success!",
      data: res.ServerName,
    };
  } catch (err) {
    if (database) {
      database.close();
    }

    return {
      status: 500,
      statusText: err,
    };
  }
}
