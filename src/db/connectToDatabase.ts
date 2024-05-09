import { MongoClient, Db } from "mongodb";
import mongoose from 'mongoose';

// Connection URL and database name
const url = process.env.URL as string;
const dbName = process.env.DB_NAME as string;

interface DatabaseConnection {
  client: MongoClient;
  db: Db;
}

export async function connectToDatabase(): Promise<DatabaseConnection> {
  // Create a new MongoClient
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the specified database
    const db = client.db(dbName);

    return { client, db };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}


export async function connectToDatabaseM() {
  const url = process.env.URL as string;
  try {
    // Connect to the MongoDB server
    await mongoose.connect(url);

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}