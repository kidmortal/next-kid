export default async (req, res) => {
  console.log("Request Ts");
  res.status(200).json("oi");
  return {
    statusCode: 200,
    body: "oi",
  };
};
