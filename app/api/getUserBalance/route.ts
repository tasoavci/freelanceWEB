// api/getUserBalance.js

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log({ body: req.body });
    const data = await req.json();
    const { id } = data;
    // const { id } = req.query; // Kullanıcı kimliğini alınır
    if (!id) {
      throw new Error('ID is required to fetch user balance');
    }

    await connectMongoDB();
    // @ts-ignore
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
