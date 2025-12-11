import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";
import { ReportData } from "@/app/reports/page";

interface SqlResultRow {
    month: string;
    acceptedDonations: number;
}

export async function GET() {
    try{
        const db = await getDb();

        const sqlQuery = `SELECT
        STRFTIME('%Y-%m', AcceptedDate) AS month,
        COUNT(DISTINCT DonationID) AS acceptedDonations
        FROM Donation
        WHERE AcceptedDate IS NOT NULL
        GROUP BY month
        ORDER BY month;
        `;

        const resultRows = await db.all<SqlResultRow[]>(sqlQuery);

        const reportData: ReportData = resultRows.map((row: SqlResultRow) => ({
            month: row.month,
            acceptedDonations: row.acceptedDonations,
        }));

        return NextResponse.json(reportData);
        
    } catch (error) {
        console.error("Database query failed: ", error);
        return NextResponse.json({error: 'Failed to fetch accepted donations report'}, {status: 500});
    }
}