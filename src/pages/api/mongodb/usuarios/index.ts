import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  context,
  callback
) => {
  const { email } = req.query;
  let user = await GetOneUser(email);
  res.status(200).json({
    isBase64Encoded: false,
    statusCode: 200,
    body: user,
  });
  if (callback) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
    });
  }
};

async function GetOneUser(email) {
  let Client, user;
  if (!email) return { erro: "Email nao foi informado" };
  try {
    Client = await connectToCachedDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Using Cached Connection");
  } catch (error) {
    Client = await connectToNewDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Created new connection");
  }
  return user;
}
