import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request Http");
  const { email } = req.query;
  let user = await GetOneUser(email);
  res.status(200).json(user);
};

exports.handler = async function (event, context, callback) {
  console.log("Request Netlify");
  const { email } = event.queryStringParameters;
  context.callbackWaitsForEmptyEventLoop = false;
  let user = await GetOneUser(email);
  callback(null, {
    statusCode: 200,
    body: user,
  });
};

async function GetOneUser(email) {
  let Client, user;
  if (!email) return { erro: "Email nao foi informado" };
  try {
    Client = await connectToCachedDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Using Cached Connection");
    console.log(user);
  } catch (error) {
    Client = await connectToNewDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Created new connection");
    console.log(user);
  }
  return user;
}
