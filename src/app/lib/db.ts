import {open, Database} from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

let db: Database | null = null;

//Get or create the database connection
export async function getDb(): Promise<Database> {
    if (db) {
        return db;
    }
}