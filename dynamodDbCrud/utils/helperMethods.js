import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const getPayload = (event) => {
  if (event.body) event.body = JSON.parse(event.body);
  return event;
};

export const getDynmaoClient = () => {
  const client = new DynamoDBClient({
    region: "ap-south-1",
  });

  return DynamoDBDocumentClient.from(client);
};
