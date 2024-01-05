import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"

export async function PUT(req) {
    try {
        const { id, balance } = await req.json(); // İsteğin gövdesinden gerekli bilgileri alınır
        if (!id) {
            throw new Error('ID is required for updating');
        }

        await connectMongoDB();
        const updatedUser = await User.findByIdAndUpdate(id, { balance }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User balance updated", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error updating user balance:', error);
        return NextResponse.json({ message: "An error occurred while updating user balance" }, { status: 500 });
    }
}
