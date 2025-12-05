import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        const db = await getDb();
        const { donationId } = req.nextUrl.searchParams.get('donationId');

        const donation = await db.get(
            `SELECT DonationID, Status 
            FROM Donation 
            WHERE DonationID = ?`,
            [donationId]
        );

        if (!donation) {
            return NextResponse.json(
                { error: "Donation not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(donation);
    } 
    
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to load donation" },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const url = new URL(req.url);
        const donationId = url.searchParams.get("donationId");
        const { Status } = await req.json();

        const db = await getDb();
        await db.run(
            `UPDATE Donation
            SET Status = ?
            WHERE DonationID = ?`,
            [Status, donationId]
        );

        return NextResponse.json({ success: true });
    } 
    
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update status" },
            { status: 500 }
        );
    }
}