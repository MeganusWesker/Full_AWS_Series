import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb"; // client low level
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"; // high level
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const get = async () => {
  try {
    const command = new DeleteItemCommand({
      TableName: "learning-crud-using-dynmao-school",
      Key: marshall({
        rollNo: "420",
        admissionId: "6942",
      }),
    });

    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

get();
