import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = db
            .prepare("SELECT * FROM User WHERE Email = ?")
            .get(email);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password. Try again." },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid email or password. Try again." },
                { status: 401 }
            );
        }

        // if successful, return user role
        return NextResponse.json({
            success: true,
            role: user.Role
        });

    } 
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong. Try again later." },
            { status: 500 }
        );
    }
}
