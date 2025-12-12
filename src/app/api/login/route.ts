import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { get } from "http";
import { createSession } from "../../../../lib/session";
import { encryptCookie } from "../../../../lib/session";

interface DbUser {
    UserID: string;
    Email: string;
    PasswordHash: string;
    Role: string;
    LastLoginDate: string;
}

const COOKIE_NAME = "loginSession";
const COOKIE_DURATION = 1000 * 60 * 30;

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

        //Update the last login date.
        try {
            await db.run(
                `UPDATE User SET LastLoginDate = CURRENT_TIMESTAMP WHERE UserID = ?`,
                [user.UserID]
            );
        } catch (dbUpdateError) {
            console.error("Failed to update login date: ", dbUpdateError)
        }

        const encryptedCookie = await encryptCookie({
            userId: user.UserID,
            userRole: user.Role,
        });

        const expires = new Date(Date.now() + COOKIE_DURATION);
        
        // store the session in cookies
        let sessionRes = await createSession(user.UserID, user.Role);
        if (!sessionRes) {
            console.error("Error creating a session while sucessfully trying to log in");
        }

        if (sessionRes === null) {
            console.error("Error creating session whilst logging in");
            return NextResponse.json(
                {error: "Login failed due to session creation error"},
                {status: 500}
            );
        }

        //Redirect the user based or their role
        // return NextResponse.json({
        //     message: "Login Successful",
        //     role: user.Role,
        //     email: user.Email,
        // }, {status: 200});

        const response = NextResponse.json({
            message: "Login Successful",
            role: user.Role,
            email: user.Email,
        });

        response.cookies.set({
            name: COOKIE_NAME,
            value: encryptedCookie,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            expires,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            {error: "An unexpected error has occured"},
            {status: 500}
        );
    }
}

