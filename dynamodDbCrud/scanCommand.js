import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const get = async () => {
  try {
    const command = new ScanCommand({
      TableName: "learning-crud-using-dynmao-school",

      //   Limit: 3, // for pagination
      //   ExclusiveStartKey: { rollNo: "580", admissionId: "993" },
      // nickname for the attribute // column ka name hota hai attribute
      ExpressionAttributeNames: {
        "#g": "gender",
        "#m": "marks",
      },
      // nickname for the coloumn value
      ExpressionAttributeValues: {
        ":m": "male",
        ":min": 85,
      },

      FilterExpression: "#g =:m OR #m >= :min",
      ProjectionExpression: "#g,#m",
    });

    const response = await ddbDocClient.send(command);
    console.log(response, "response");
  } catch (error) {
    console.log(error);
  }
};

get();

// ScanCommand limitation -> pura table scan hota hai thoid costly
// queryCommand -> partionkey ke base pe scan hota hai or sortkey optional hoti hai
// or compariason operator sirf sort key lgta hai  // thoda efficient hai
