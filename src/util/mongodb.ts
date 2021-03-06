import { Db, MongoClient } from "mongodb";
// Connection string to the database
const uri = process.env.MONGODB_URI;
// Validate that the database connection string has been configured.
if (!uri) {
  throw new Error(
    "The MONGODB_URI environment variable must be configured with the connection string " +
      "to the database."
  );
}

// Cached connection promise
let cachedPromise = null;
// Function for connecting to MongoDB, returning a new or cached database connection
export async function connectToCachedDb() {
  if (!cachedPromise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    // If no connection promise is cached, create a new one. We cache the promise instead
    // of the connection itself to prevent race conditions where connect is called more than
    // once. The promise will resolve only once.
    // Node.js driver docs can be found at http://mongodb.github.io/node-mongodb-native/.
    cachedPromise = MongoClient.connect(uri, opts);
  }
  // await on the promise. This resolves only once.
  const client = await cachedPromise;
  return client;
}

export async function connectToNewDb() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = MongoClient.connect(uri, opts);
  return client;
}
