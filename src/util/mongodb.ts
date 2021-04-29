import { Db, MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

type MongoConnection = {
  client: MongoClient;
  db: Db;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

export async function connectToDatabase(): Promise<MongoConnection> {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = await MongoClient.connect(MONGODB_URI, opts);
  return {
    client,
    db: client.db(MONGODB_DB),
  } as MongoConnection;
}
