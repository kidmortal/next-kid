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
  console.log("conseguiu user");
  console.log(user);
  res.status(200).json(user);
  console.log("respondeu res status 200");
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("context");
  callback(null, {
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify(user),
  });
  console.log("callback");
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
