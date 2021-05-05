import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoUser } from "../../../../models/mongoUser";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { call } = req.body;

  if (!call) return res.status(200).json({ erro: "Funcao call nao informada" });
  switch (call) {
    case "getUserByEmail":
      await GetOneUser(req, res);
      break;

    case "updateUserById":
      await UpdateUserById(req, res);
      break;

    case "getAllUsers":
      await GetAllUsers(req, res);
      break;

    case "addNewNotificationClient":
      await AddNewNotificationClient(req, res);
      break;

    case "removeNotificationClient":
      await RemoveNotificationClient(req, res);
      break;

    case "relatorioDiarioNotification":
      await RelatorioDiarioNotification(req, res);
      break;

    case "pedidoSemDataNotification":
      await PedidoSemDataNotification(req, res);
      break;

    case "pedidoSemCondicaoNotification":
      await PedidoSemCondicaoNotification(req, res);
      break;

    default:
      break;
  }
};

async function GetOneUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  let user;
  if (!email) return res.status(200).json({ erro: "Email nao foi informado" });
  let Client = await connectToCachedDb();
  user = await Client.db().collection("usuarios").findOne({ email });
  res.status(200).json(user);
}

async function UpdateUserById(req: NextApiRequest, res: NextApiResponse) {
  const { id, nome, email, celular, callmebotKey } = req.body;
  if (!id) return res.status(200).json({ erro: "ID nao foi informado" });
  let Client = await connectToCachedDb();
  let filter = { _id: new ObjectId(id) };
  let update: MongoUser = { nome, email, celular, callmebotKey };
  let options = { upsert: true, returnOriginal: false };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, { $set: update }, options);
  console.log("Using New Connection");
  res.status(200).json(response.ok);
}

async function GetAllUsers(req: NextApiRequest, res: NextApiResponse) {
  let Client = await connectToCachedDb();
  let users = await Client.db().collection("usuarios").find({}).toArray();
  console.log("Using New Connection");
  res.status(200).json(users);
}

async function AddNewNotificationClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body;
  if (!name)
    return res.status(200).json({ erro: "Name do cliente não informado" });
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToCachedDb();
  let filter = { email };
  let update = { $push: { "notificar.SEPARADO": name } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  res.status(200).json(response.ok);
}
async function RemoveNotificationClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body;
  if (!name)
    return res.status(200).json({ erro: "Name do cliente não informado" });
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToCachedDb();
  let filter = { email };
  let update = { $pull: { "notificar.SEPARADO": name } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  res.status(200).json(response.ok);
}

async function RelatorioDiarioNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToCachedDb();
  let filter = { email };
  let update = { $set: { "notificar.RELATORIO_DIARIO": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  res.status(200).json(response.ok);
}
async function PedidoSemDataNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToCachedDb();
  let filter = { email };
  let update = { $set: { "notificar.DATA_INCORRETA": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  res.status(200).json(response.ok);
}
async function PedidoSemCondicaoNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToCachedDb();
  let filter = { email };
  let update = { $set: { "notificar.SEM_CONDICAO": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  res.status(200).json(response.ok);
}
