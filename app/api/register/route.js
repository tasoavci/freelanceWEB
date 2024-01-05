// register/route.js
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { fullName, email, type, password } = body
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('Received data:', { fullName, email, type, password: hashedPassword });
        
        await connectMongoDB();
        await User.create({ fullName, email, type, password: hashedPassword })
        
        return NextResponse.json({ message: "User signed up." }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}