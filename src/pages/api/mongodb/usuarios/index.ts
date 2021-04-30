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

    case "addNewNotificationClient":
      await AddNewNotificationClient(req, res);
      break;

    case "removeNotificationClient":
      await RemoveNotificationClient(req, res);
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
