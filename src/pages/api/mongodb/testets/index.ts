import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request Ts");
  res.status(200).json("oi");
  return {
    statusCode: 200,
    body: "oi",
  };
};
