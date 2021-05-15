import { MongoClient, ObjectId } from "mongodb";
import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { call } = req.body;
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ erro: "Nao autorizado" });

  if (!call) return res.status(200).json({ erro: "Funcao call nao informada" });
  switch (call) {
    case "getOneUser":
      await GetOneUser(req, res);
      break;

    case "getUserById":
      await GetUserById(req, res);
      break;

    case "updateUserById":
      await UpdateUserById(req, res);
      break;

    case "getAllUsers":
      await GetAllUsers(req, res);
      break;

    default:
      break;
  }
};

async function GetOneUser(req: NextApiRequest, res: NextApiResponse) {
  const { props } = req.body;
  let user;
  if (!props) return res.status(200).json({ erro: "Props nao foi informado" });
  let Client = await connectToCachedDb();
  user = await Client.db().collection("usuarios").findOne(props);
  res.status(200).json(user);
}

async function GetUserById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  let user;
  if (!id) return res.status(200).json({ erro: "Id nao foi informado" });
  let filter = { _id: new ObjectId(id) };
  let Client = await connectToCachedDb();
  user = await Client.db().collection("usuarios").findOne(filter);
  res.status(200).json(user);
}

async function UpdateUserById(req: NextApiRequest, res: NextApiResponse) {
  const { id, props } = req.body;
  if (!id) return res.status(200).json({ erro: "ID nao foi informado" });
  if (!props) return res.status(200).json({ erro: "Props nao foi informado" });
  let Client = await connectToCachedDb();
  let filter = { _id: new ObjectId(id) };
  let options = { upsert: true, returnOriginal: false };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, props, options);
  res.status(200).json(response.ok);
}

async function GetAllUsers(req: NextApiRequest, res: NextApiResponse) {
  let Client = await connectToCachedDb();
  let users = await Client.db().collection("usuarios").find({}).toArray();
  res.status(200).json(users);
}
