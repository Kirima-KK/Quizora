import { connectToDatabase } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const db = await connectToDatabase();
    const collection = db.collection(`${process.env.USER_COLLECTION_NAME}`);

    const user = await collection.findOne({ email: json.email });
    if (!user) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    const result = await bcrypt.compare(json.password, user.password);
    if (!result) {
      return NextResponse.json({ error: 'Password not matched' }, { status: 404 });
    }

    const payload = {
      userId: user._id,
      email: user.email
    }
    const secret = process.env.JWT_SECRET!;
    // TODO: uncomment expires token
    // const options: SignOptions = { expiresIn: Number(process.env.JWT_EXPIRES_IN) };

    const token = jwt.sign(payload, secret);
    // const token = jwt.sign(payload, secret, options);

    const response = NextResponse.json({ message: token });
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Prevent CSRF attacks
      maxAge: Number(process.env.JWT_EXPIRES_IN),
      path: '/'
    });

    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}