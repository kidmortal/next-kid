export async function handler(event, context) {
  return {
    statusCode: 201,
    body: { data: event.queryStringParameters },
  };
}
