import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET() {
    try{
        const db = await getDb();

        const data = await db.all(`
            SELECT c.Description AS category, COUNT(*) AS count
            FROM Donation d
            JOIN ClothingItem ci ON ci.ItemID = d.ItemID
            JOIN Category c ON c.CategoryID = ci.CategoryID
            WHERE d.Status = 'ACCEPTED'
            GROUP BY c.CategoryID
            ORDER BY count DESC
        `);
        
        console.log(data)
        return NextResponse.json(data);
    } 

    catch (error){
        console.error(error);
        return NextResponse.json({ error: "Failed to load stock levels by category" },{ status: 500 }
        );
    }
}
