exports.handler = async (event, context) => {
  return {
    statusCode: 201,
    body: { data: event.queryStringParameters },
  };
};
