import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const get = async () => {
  try {
    const command = new QueryCommand({
      TableName: "learning-crud-using-dynmao-school",
      ExpressionAttributeNames: {
        "#r": "rollNo",
        "#a": "admissionId",
        "#g": "gender",
      },
      ExpressionAttributeValues: {
        ":rValue": "580",
        ":aValue": "5",
        ":gValue": "female",
      },
      KeyConditionExpression: "#r = :rValue AND  #a >=:aValue",
      FilterExpression: "#g=:gValue",
    });

    // QueryFilter: { // FilterConditionMap
    //     "<keys>": {
    //       AttributeValueList: [
    //         "<AttributeValue>",
    //       ],
    //       ComparisonOperator: "EQ" || "NE" || "IN" || "LE" || "LT" || "GE" || "GT" || "BETWEEN" || "NOT_NULL" || "NULL" || "CONTAINS" || "NOT_CONTAINS" || "BEGINS_WITH", // required
    //     },
    //   },

    const response = await ddbDocClient.send(command);
    console.log(response, "response");
  } catch (error) {
    console.log(error);
  }
};

get();
