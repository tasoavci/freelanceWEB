// api/getUserBalance.js

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { id } = req.query; // Kullanıcı kimliğini alınır
    if (!id) {
      throw new Error('ID is required to fetch user balance');
    }

    await connectMongoDB();
    const userInfo = await User.findById(id); // Kullanıcının bilgilerini veritabanından alınır

    if (!userInfo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ balance: userInfo.balance }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return NextResponse.json({ message: "An error occurred while fetching user balance" }, { status: 500 });
  }
}
