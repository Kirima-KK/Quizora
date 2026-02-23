import { Db, MongoClient } from "mongodb";

const uri = `${process.env.MONGODB_URI}`;
let dbInstance: Db;

export async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(uri);
  await client.connect();

  dbInstance = client.db(`${process.env.DB_NAME}`);
  return dbInstance;
}