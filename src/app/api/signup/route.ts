import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { get } from "http";

export async function POST (request: Request) {
    try {
        const body = await request.json();
        const {firstName, lastName, email, password} = body;
        // Checking inputs are valid
        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                {error: "First Name, Last Name, Email and Password are required"},
                {status: 404}
            );
        }

        //Get the connection
        const db = await getDb();

        //Check if the user already exists
        const existingUser = await db.get(
            `SELECT UserID FROM User WHERE Email = ?`,
            [email]
        );
        if (existingUser) {
            return NextResponse.json(
                {error: "An account with this email already exists."},
                {status: 409}
            );
        }

        //Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        //Generate a new user ID - Making sure it follows the sequence US[XXX]
        //const newUserID = US-${randomUUID()};
        const maxIdRow = await db.get(
            `SELECT UserID FROM User ORDER BY UserID DESC LIMIT 1`
        );
        // Gets the current max ID (which starts as 10) and adds 1 for the next ID number
        let nextIdNumber = 1;
        if (maxIdRow && maxIdRow.UserID) {
            const lastNumberString = maxIdRow.UserID.substring(2);
            const lastNumber = parseInt(lastNumberString, 10)
            nextIdNumber = lastNumber + 1;
        }
        // Format the ID number
        const formattedIdNumber = String(nextIdNumber).padStart(3, '0') //makes sure it is three numbers and adds 0s
        const newUserID = `US${formattedIdNumber}`;

        const result = await db.run(
            `INSERT INTO User (UserID, Email, PasswordHash, FirstName, LastName, 
                         Address, Postcode, PhoneNumber, AvatarImageID, Role, Status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [newUserID, email, passwordHash, firstName, lastName, 'N/A', 'N/A', 'N/A', 'IMG000', 'Donor', 'Active']
        );

        //Redirect the user based or their role
        return NextResponse.json({
            message: "User registered successfully",
            userId: newUserID,
            email: email
        }, { status: 201 });

    } catch (error) {
        console.error("Signup API Error:", error);
        return NextResponse.json(
            {error: "An unexpected error has occured"},
            {status: 500}
        );
    }
}