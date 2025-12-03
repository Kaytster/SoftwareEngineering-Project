import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const donations = db.prepare(`
      SELECT d.DonationID, i.ServerName, c.Description, ci.ClothingSize, ci.Brand, ci.Colour, u.UserID, 
        u.FirstName|| ' ' ||coalesce(u.MiddleName|| ' ', '')||u.LastName AS DonorName, d.DateTime, d.Status
      FROM Donation d
      JOIN User u ON u.UserID = d.DonorID
      JOIN Image i ON i.ImageID = d.ImageID
      JOIN ClothingItem ci ON ci.ItemID = d.ItemID
        JOIN Category c ON c.CategoryID = ci.CategoryID
      WHERE d.Status = 'ACCEPTED' OR d.Status = 'REJECTED'
    `).all();
    
    return NextResponse.json(donations);
  } 
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load donations" }, { status: 500 });
  }
}
