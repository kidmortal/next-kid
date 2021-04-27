type RequestParams = {
  call: string;
  param: object;
  path: string;
};

export async function RequestOmie(Params: RequestParams) {
  var params = {
    call: Params.call,
    app_key: process.env.OMIE_PYRAMID_APP_KEY,
    app_secret: process.env.OMIE_PYRAMID_APP_SECRET,
    param: [Params.param],
  };
  let response = await fetch(`https://app.omie.com.br/api/v1/${Params.path}`, {
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response.json();
}
