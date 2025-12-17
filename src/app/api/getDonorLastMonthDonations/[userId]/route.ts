"use server";

import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "../../../../../lib/session";
import { getDb } from "../../../../../lib/db";
import Database, { Database as DBType, Statement } from "better-sqlite3";

export interface IDonation {
  DonationID: string;
  ItemID: string;
  ImageID: string;
  DonorID: string;
  CharityID: string;
  DateTime: string;
  Status: string;
  ServerName: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId: requestUserId } = await params;

  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.userId !== requestUserId && session.userRole !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let database: DBType | null = null;

  try {
    database = new Database(process.env.DB_PATH!, {
      fileMustExist: true,
      readonly: true,
    });
  } catch (err) {
    return NextResponse.json({ error: "lmao" }, { status: 500 });
  }

  // get all user donation from the last month
  let res: IDonation[] | null = null;

  let st: Statement<string, IDonation> = database.prepare(
    `SELECT
        DonationID, ItemID, Donation.ImageID, DonorID, CharityID, DateTime, Status, ServerName
      FROM Donation
      INNER JOIN Image ON Donation.ImageID = Image.ImageID
      WHERE DonorID = ?
      AND DATE(DateTime) <= DATE('now')
      AND DATE(DateTime) >= DATE('now', '-1 month')
      ORDER BY DATE(DateTime) DESC
      ;`,
  );

  res = st.all(requestUserId);

  database.close();

  return NextResponse.json({ data: res }, { status: 200 });
}
