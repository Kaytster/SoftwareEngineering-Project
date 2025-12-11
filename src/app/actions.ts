"use server";

import { verifySession } from "../../lib/session";
import Database, { Database as DBType, Statement } from "better-sqlite3";

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
      statusText: err,
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
