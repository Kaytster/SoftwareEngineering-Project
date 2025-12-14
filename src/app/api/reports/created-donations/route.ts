import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";
import { ReportData } from "@/app/reports/page";

interface SqlResultRow {
    month: string;
    createdDonations: number;
}

export async function GET() {
    try{
        const db = await getDb();

        const sqlQuery = `SELECT
        STRFTIME('%Y-%m', DateTime) AS month,
        COUNT(DISTINCT DonationID) AS createdDonations
        FROM Donation
        WHERE DateTime IS NOT NULL
        GROUP BY month
        ORDER BY month;
        `;

        const resultRows = await db.all<SqlResultRow[]>(sqlQuery);

        const reportData: ReportData = resultRows.map((row: SqlResultRow) => ({
            month: row.month,
            createdDonations: row.createdDonations,
        }));

        return NextResponse.json(reportData);
        
    } catch (error) {
        console.error("Database query failed: ", error);
        return NextResponse.json({error: 'Failed to fetch created donations report'}, {status: 500});
    }
}