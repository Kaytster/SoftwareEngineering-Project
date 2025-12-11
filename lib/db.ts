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
    return db;
}