import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET() {
    try{
        const db = await getDb();

        const data = await db.all(`
            SELECT strftime('%Y-%m', d.DateTime) AS month, COUNT(*) AS count
            FROM Donation d
            GROUP BY strftime('%Y-%m', d.DateTime)
            ORDER BY month ASC
        `);
        console.log(data);
        return NextResponse.json(data);
    } 

    catch (error){
        console.error(error);
        return NextResponse.json({ error: "Failed to load distribution data" },{ status: 500 }
        );
    }
}