import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET() {
    try{
        const db = await getDb();

        const data = await db.all(`
            SELECT 
                Role AS role,
                COUNT(*) AS count
            FROM User
            GROUP BY role
            ORDER BY count DESC;
        `);
        
        //test 
        console.log(data)
        return NextResponse.json(data);
    } 

    catch (error){
        console.error(error);
        return NextResponse.json({ error: "Failed to load user roles levels" },{ status: 500 }
        );
    }
}
