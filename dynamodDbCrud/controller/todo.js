import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { getDynmaoClient, getPayload } from "../utils/helperMethods.js";
import { PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const PRIMARY_KEY = process.env.PRIMARY_KEY;

export const creatOrUpdateTodo = async (event) => {
  try {
    const payload = getPayload(event);
    let { body } = payload;
    if (!body) throw new Error(`body can't be empty`);

    const client = getDynmaoClient();

    body = {
      ...body,
      [PRIMARY_KEY]: uuidv4(),
    };

    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: body,
    });

    await client.send(command);
    return {
      statusCode: 201,
      body: "created or updated successfully",
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
export const getTodoById = async (event) => {
  const client = getDynmaoClient();

  const query = event["queryStringParameters"];
  if (!query[PRIMARY_KEY]) throw new Error(`primary key not found`);

  const command = new GetCommand({
    TableName: process.env.TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: query[PRIMARY_KEY],
    },
  });

  const response = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(response.Item),
  };
};
export const deleteTodo = async (event) => {
  const client = getDynmaoClient();

  const query = event["queryStringParameters"];
  if (!query[PRIMARY_KEY]) throw new Error(`primary key not found`);

  const command = new DeleteCommand({
    TableName: process.env.TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: query[PRIMARY_KEY],
    },
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: "record deleted SuccessFully",
  };
};

// get by isArchived true or false basically true vale lake dihkao or false lahke dihkao user ke payload ke upar
// is completed
export const getTodos = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: process.env.TABLE_NAME,
    });

    const client = getDynmaoClient();

    const response = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
