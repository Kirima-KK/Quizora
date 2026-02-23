import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';
import path from 'path';
import fs from 'fs';

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000
};
const client = new MongoClient(`${process.env.MONGODB_URI}`, options);

const filename = path.join(__dirname, `${process.env.QUIZ_DATA}`);

const quizData = JSON.parse(fs.readFileSync(`${process.env.QUIZ_DATA}`, 'utf8')).docs
const usersData = JSON.parse(fs.readFileSync(`${process.env.USER_DATA}`, 'utf8')).docs
// Attach the client to ensure proper cleanup on function suspension
attachDatabasePool(client);

async function seedQuiz() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(`${process.env.QUIZ_COLLECTION_NAME}`);
    const cursor = await collection.find({})
    const documents = await cursor.toArray()

    if (documents.length === 0) {
      await collection.insertMany(quizData);
      console.log(`Inserted Quiz Items: ${collection.countDocuments()}`);
    } else {
      console.log(`Quiz Items already existed.`);
    }
  } catch (e) {
    console.error(e);
  }
}

async function seedUsers() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(`${process.env.USER_COLLECTION_NAME}`);
    const cursor = await collection.find({})
    const documents = await cursor.toArray()

    if (documents.length === 0) {
      await collection.insertMany(usersData);
      console.log(`Inserted User Items: ${collection.countDocuments()}`);
    } else {
      console.log(`User Items already existed.`);
    }
  } catch (e) {
    console.error(e);
  }
}

// Export a module-scoped MongoClient to ensure the client can be shared across functions.
export async function GET() {
  try {
    const result = await Promise.all(
      [
        seedQuiz(),
        seedUsers()
      ]
    );
    return Response.json({ message: "Databases seeded successfully." });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}; 