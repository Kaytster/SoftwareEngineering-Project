import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";
import { ReportData } from "@/app/reports/page";

interface SqlResultRow {
    month: string;
    activeUsers: number;
}

export async function GET() {
    try{
        const db = await getDb();

        const sqlQuery = `SELECT
        STRFTIME('%Y-%m', LastLoginDate) AS month,
        COUNT(DISTINCT UserID) AS activeUsers
        FROM User
        WHERE LastLoginDate IS NOT NULL
        GROUP BY month
        ORDER BY month;
        `;

        const resultRows = await db.all<SqlResultRow[]>(sqlQuery);

        const reportData: ReportData = resultRows.map((row: SqlResultRow) => ({
            month: row.month,
            activeUsers: row.activeUsers,
        }));

        return NextResponse.json(reportData);
        
    } catch (error) {
        console.error("Database query failed: ", error);
        return NextResponse.json({error: 'Failed to fetch active users report'}, {status: 500});
    }
}