import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { get } from "http";

interface DbUser {
    UserId: string;
    Email: string;
    PasswordHash: string;
    Role: string;
}

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();
        // Checking username and password have been input
        if (!email || !password) {
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            );
        }

        // Get the connection
        const db = await getDb();

        // Query for the user by email
        const user = await db.get<DbUser>(
            `SELECT UserID, Email, PasswordHash, Role FROM User WHERE Email = ?`,
            [email]
        );

        // Check if user is found
        if (!user) {
            return NextResponse.json(
                {error: "Invalid Email or Password"},
                {status: 401}
            );
        }

        //Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
        if (!isPasswordValid) {
            return NextResponse.json(
                {error: "Invalid Email or Password"},
                {status: 401}
            );
        }

        //Redirect the user based or their role
        return NextResponse.json({
            message: "Login Successful",
            role: user.Role,
            email: user.Email,
        }, {status: 200});

    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            {error: "An unexpected error has occured"},
            {status: 500}
        );
    }
}

