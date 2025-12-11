import {open, Database} from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

let db: Database | null = null;

//Get or create the database connection
export async function getDb(): Promise<Database> {
    if (db) {
        return db;
    }

    const dbPath = path.join(process.cwd(), 'db', 'sustainwearNEW.db')

    //Opening the connection
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    //Checking the table with users exists
    await db.exec(`
        CREATE TABLE IF NOT EXISTS User (
        UserID TEXT PRIMARY KEY NOT NULL,
        Email TEXT UNIQUE NOT NULL,
        PasswordHash TEXT NOT NULL);
        `);

    //Adding data to AcceptedDate
    // const donationCountResult = await db.get<{count: number}>(
    //     `SELECT COUNT(*) AS count FROM Donations`
    // );
    // if (donationCountResult && donationCountResult.count === 0) {
    //     console.log("Database Empty");

    //     await db.exec(`INSERT
    //         INTO DONATION (DonationID, ItemID, ImageID, DonorID, CharityID
    //         )
    //         `)
    // }

    // try {
       
    //     const columns = await db.all(`PRAGMA table_info(Donation)`);
    //     const createdAtIndex = columns.findIndex(col => col.name === 'CreatedAt');
    //     if (createdAtIndex !== -1) {
    //         console.log("Found 'CreatedAt' column. Attempting to drop...");
    //     await db.exec(`
    //         ALTER TABLE Donation 
    //         DROP COLUMN CreatedAt;
    //     `);
    //     console.log("Successfully dropped 'CreatedAt' column.");
    //     }
    // } catch (error) {
    //     console.warn("Error during CreatedAt column migration. If column still exists, use DB Browser.", error);
    // }

    return db;
}