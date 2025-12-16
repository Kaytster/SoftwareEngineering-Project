import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET() {
    try{
        const db = await getDb();

        const data = await db.all(`
            SELECT strftime('%Y-%W', d.DateTime) AS week, COUNT(*) AS count
            FROM Donation d
            WHERE d.Status = 'ACCEPTED'
            GROUP BY strftime('%Y-%W', d.DateTime)
            ORDER BY week ASC
        `);
        
        console.log(data)
        return NextResponse.json(data);
    } 

    catch (error){
        console.error(error);
        return NextResponse.json({ error: "Failed to load distribution data" },{ status: 500 }
        );
    }
}
