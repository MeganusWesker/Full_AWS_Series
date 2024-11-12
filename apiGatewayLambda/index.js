// return json

// JSON.stringify(OBJ)
export const testHandler = async (event) => {
  console.log(event, "event-_________");
  const pathParameters = event.pathParameters;

  const userName = process.env.USER_NAME_SPECIFIC;
  const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
  return {
    statusCode: 200,
    body: JSON.stringify({
      ...pathParameters,
      userName,
      ROOT_PASSWORD,
    }),
  };
};

export const nameTera = async (event) => {
  console.log(event, "event-_________");
  const query = event["queryStringParameters"];

  const userName = process.env.USER_NAME_SPECIFIC;
  const ROOT_PASSWORD = process.env.ROOT_PASSWORD;

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...query,
      userName,
      ROOT_PASSWORD,
    }),
  };
};

export const handler = async (event) => {
  console.log(event, "event-_________");
  const query = event["queryStringParameters"];

  const userName = process.env.USER_NAME_SPECIFIC;
  const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
  return {
    statusCode: 200,
    body: JSON.stringify({
      ...query,
      userName,
      ROOT_PASSWORD,
    }),
  };
};
