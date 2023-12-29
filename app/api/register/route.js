import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { fullName, email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await User.create({ fullName, email, password: hashedPassword })

        return NextResponse.json({ message: "User signed up." }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}