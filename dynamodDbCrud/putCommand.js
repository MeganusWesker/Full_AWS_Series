import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"; // client low level
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"; // high level
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const put = async () => {
  try {
    const command = new PutCommand({
      TableName: "learning-crud-using-dynmao-school",
      Item: {
        rollNo: "420", //partitionkey
        admissionId: "6942", // sortKey
      },
    });

    const response = await ddbDocClient.send(command);
    console.log(response, "response");
  } catch (error) {
    console.log(error);
  }
};

const putLow = async () => {
  try {
    const command = new PutItemCommand({
      TableName: "learning-crud-using-dynmao-school",
      Item: {
        rollNo: {
          S: "420",
        }, //partitionkey
        admissionId: {
          S: "6942",
        }, // sortKey

        name: {
          S: "meganus",
        },
        class: {
          S: "lkg",
        },

        dost: {
          S: "wesker",
        },
      },
    });

    const response = await client.send(command);
    console.log(response, "response");
  } catch (error) {
    console.log(error);
  }
};

const putWithMarsahl = async () => {
  try {
    const input = {
      rollNo: "421",
      admissionId: "33",
      gender: "male",
      studentStyle: "mishimaStyle",
      name: "Heiachi",
      marks: 79,
    };

    console.log(marshall(input), "marshALL");
    const command = new PutItemCommand({
      TableName: "learning-crud-using-dynmao-school",
      Item: marshall(input),
    });

    const response = await client.send(command);
    console.log(response, "response");
  } catch (error) {
    console.log(error);
  }
};

putWithMarsahl();
