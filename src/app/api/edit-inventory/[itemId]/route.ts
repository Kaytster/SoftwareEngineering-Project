import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";

export async function GET(request: NextRequest, {params}: {params: {itemId: string}}) {
    const itemId = params.itemId;

    if (!itemId) {
        return NextResponse.json({error: "Item ID is required."}, {status: 400});
    }

    try {
        const db = await getDb();

        const query = `SELECT
        ci.ItemID, 
        c.Description AS Category, 
        ci.Description AS ItemDescription, 
        ci.Colour, 
        ci.Brand,
        ci.ClothingSize, 
        ci.ImageID, 
        i.ServerName as currentImageServerName
        FROM
        ClothingItem ci
        JOIN
        Image i ON ci.ImageId = i.ImageID
        JOIN
        Category c ON c.CategoryID = ci.CategoryID
        WHERE
        ci.ItemID = ?`;

        const item = await db.get(query, [itemId]);

        if (!item) {
            return NextResponse.json({error: "Item not found."}, {status: 404});
        }
        return NextResponse.json(item, {status: 200});
    } catch (error) {
        console.error("Fetch Item API Error ", error);
        return NextResponse.json(
            {error: "An unexpected server error occured"},
            {status: 500}
        );
    }
}