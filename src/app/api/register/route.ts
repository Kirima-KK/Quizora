import { connectToDatabase } from "@/app/_lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const result = await req.json();

    const jwtSecret = `${process.env.JWT_SECRET}`;

    if (!result.email || !result.password) return NextResponse.json({ error: "Bad Request" }, { status: 400 });

    const db = await connectToDatabase();
    const collection = db.collection(`${process.env.USER_COLLECTION_NAME}`);

    const user = await collection.findOne({ email: result.email });
    if (user) {
      return NextResponse.json({ error: "User already exist." }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(result.password.toString(), salt);

    const newUser = await collection.insertOne({
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      password: hash,
      createdAt: new Date()
    });

    const payload = {
      user: {
        id: newUser.insertedId
      }
    };

    const token = jwt.sign(payload, jwtSecret);

    return NextResponse.json({ token: token }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}