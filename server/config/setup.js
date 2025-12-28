import { connectDB, client } from "./db.js";

const db = await connectDB();

const command = "collMod";

try {
  await db.command({
    [command]: "users",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "password", "rootDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength: 3,
            description:
              "name field should a string with at least three characters",
          },
          email: {
            bsonType: "string",
            description: "please enter a valid email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          },
          password: {
            bsonType: "string",
            minLength: 6,
          },
          rootDirId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },

    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "directories",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "userId", "parentDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
          },
          userId: {
            bsonType: "objectId",
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "files",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "extension", "userId", "parentDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
          },
          extension: {
            bsonType: "string",
          },
          userId: {
            bsonType: "objectId",
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });
} catch (err) {
  console.log("error setting up the database", err);
} finally {
  await client.close();
}
