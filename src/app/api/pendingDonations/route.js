import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET(){
  try{
    const db = await getDb();

    const donations = await db.all(`
      SELECT d.DonationID, i.ServerName, c.Description, ci.ClothingSize, ci.Brand, ci.Colour, u.UserID, 
        u.FirstName || ' ' || COALESCE(u.MiddleName || ' ', '') || u.LastName AS DonorName, 
        d.DateTime, 
        d.Status
      FROM Donation d
      JOIN User u ON u.UserID = d.DonorID
      JOIN Image i ON i.ImageID = d.ImageID
      JOIN ClothingItem ci ON ci.ItemID = d.ItemID
      JOIN Category c ON c.CategoryID = ci.CategoryID
      WHERE d.Status = 'PENDING'
    `);

    return NextResponse.json(donations);
  } 
  catch (error){
    console.error(error);
    return NextResponse.json({ error: "Failed to load donations" }, { status: 500 });
  }
}
