import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL || "mongodb://localhost:27017/eccomerce-1";
let client;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      maxPoolSize: 10,
    });
    await client.connect();
  }
  return client;
}

// Graceful shutdown function
export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
