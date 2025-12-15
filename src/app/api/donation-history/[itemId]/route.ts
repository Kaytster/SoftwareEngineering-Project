import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {promises as fs} from 'fs';
import path from "path";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
            d.ImageID, 
            i.ServerName as currentImageServerName
        FROM
            ClothingItem ci
        JOIN
            Donation d ON d.ItemID = ci.ItemID
        JOIN
            Image i ON d.ImageId = i.ImageID
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

export async function PUT(request: NextRequest, {params} : {params: {itemId: string}}) {
    
    const itemId = params.itemId;
    if (!itemId) {
        return NextResponse.json({error: "Item id required."}, {status: 400});
    }

    try {
        const db = await getDb();
        const formData = await request.formData();

        const updateData: any = {
            Category: formData.get('category') as string,
            Description: formData.get('description') as string,
            Colour: formData.get('colour') as string,
            Brand: formData.get('brand') as string,
            ClothingSize: formData.get('clothingSize') as string,
        };

        const categoryRow: any = await db.get(
            "SELECT CategoryID FROM Category WHERE Description = ?",
            [updateData.Category]
        );

        if (!categoryRow) {
            return NextResponse.json({
                error: `Invalid category: '${updateData.Category}' was not found.`
            }, {status: 400});
        }

        const finalCategoryID = categoryRow.CategoryID;

        const newImageFile = formData.get('newImageFile') as File | null;
        const oldImageName = formData.get('currentImageServerName') as string;

        let newImageID: string | null = null;
        let finalImageServerName = oldImageName;

        const uploadDir = path.join(process.cwd(), 'public', 'images');
        await fs.mkdir(uploadDir, {recursive: true});

        //Handle image uploading
        if (newImageFile && newImageFile.size > 0) {

            let nextImageID: string;
            try {
                const lastImageRow: any = await db.get(
                    "SELECT ImageID FROM Image ORDER BY ImageID DESC LIMIT 1"
                );

                if (lastImageRow && lastImageRow.ImageID) {
                    const lastID = lastImageRow.ImageID;
                    const numberPart = parseInt(lastID.substring(2)) + 1;

                    nextImageID = 'IM' + numberPart.toString().padStart(3, '0');
                } else {
                    nextImageID = 'IM001';
                }
            } catch (error) {
                console.error("Failed to generate next ImageID:", error);
                throw new Error("Could not determine next unique ImageID.");
            }
            
            const imageBuffer = Buffer.from(await newImageFile.arrayBuffer());
            const fileExtention = path.extname(newImageFile.name || '.jpg');
            const newServerName = `item-${itemId}-${Date.now()}${fileExtention}`;
            const targetPath = path.join(uploadDir, newServerName);

            await fs.writeFile(targetPath, imageBuffer);
            finalImageServerName = newServerName;

            const newImageResult: any = await db.run(
                "INSERT INTO Image (ImageID, ServerName) VALUES (?, ?)",
                [nextImageID, finalImageServerName]
            );
            newImageID = nextImageID;
            
            if (oldImageName) {
                const oldImagePath = path.join(uploadDir, oldImageName);
                try {
                    await fs.unlink(oldImagePath);
                } catch (cleanupError) {
                    console.warn('Failed to delete old image file');
                }
            }
        }
        
        const updateItemQuery = `UPDATE ClothingItem SET
        CategoryID = ?,
        Description = ?,
        Colour = ?,
        Brand = ?,
        ClothingSize = ?
        WHERE
        ItemID = ?`;

        await db.run(updateItemQuery, [
            finalCategoryID,
            updateData.Description,
            updateData.Colour,
            updateData.Brand,
            updateData.ClothingSize,
            itemId
        ]);

        if (newImageID) {
            const currentDonation: any = await db.get("SELECT ImageID FROM Donation WHERE ItemID = ?", [itemId]);
            await db.run(
                "UPDATE Donation SET ImageID = ? WHERE ItemID = ?",
                [newImageID, itemId]
            );

            if (currentDonation && currentDonation.ImageID) {
                await db.run("DELETE FROM Image WHERE ImageID = ?", [currentDonation.ImageID]);
            }
        }

        return NextResponse.json({
            message: 'Item updated successfully!',
            imageServerName: finalImageServerName
        }, {status: 200});
    } catch (error) {
        console.error('Update Item API Error: ', error);
        return NextResponse.json(
            {error: 'Failed to proccess item update'},
            {status: 500}
        );
    }
}