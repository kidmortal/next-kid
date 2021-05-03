import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { call } = req.body;

  if (!call) return res.status(200).json({ erro: "Funcao call nao informada" });
  switch (call) {
    case "getUserByEmail":
      await GetOneUser(req, res);
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
  let Client = await connectToNewDb();
  user = await Client.db().collection("usuarios").findOne({ email });
  console.log("Using New Connection");
  Client.close();
  res.status(200).json(user);
}

async function GetAllUsers(req: NextApiRequest, res: NextApiResponse) {
  let Client = await connectToNewDb();
  let users = await Client.db().collection("usuarios").find({}).toArray();
  console.log("Using New Connection");
  Client.close();
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

  let Client = await connectToNewDb();
  let filter = { email };
  let update = { $push: { "notificar.SEPARADO": name } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  Client.close();
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

  let Client = await connectToNewDb();
  let filter = { email };
  let update = { $pull: { "notificar.SEPARADO": name } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  Client.close();
  res.status(200).json(response.ok);
}

async function RelatorioDiarioNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToNewDb();
  let filter = { email };
  let update = { $set: { "notificar.RELATORIO_DIARIO": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  Client.close();
  res.status(200).json(response.ok);
}
async function PedidoSemDataNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToNewDb();
  let filter = { email };
  let update = { $set: { "notificar.DATA_INCORRETA": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  Client.close();
  res.status(200).json(response.ok);
}
async function PedidoSemCondicaoNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { active, email } = req.body;
  if (!email)
    return res.status(200).json({ erro: "Email do usuario não informado" });

  let Client = await connectToNewDb();
  let filter = { email };
  let update = { $set: { "notificar.SEM_CONDICAO": !!active } };
  let response = await Client.db()
    .collection("usuarios")
    .findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false });
  Client.close();
  res.status(200).json(response.ok);
}
