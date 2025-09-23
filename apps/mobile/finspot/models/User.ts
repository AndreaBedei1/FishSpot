import { ObjectSchema } from "realm";

export const UserSchema: ObjectSchema = {
  name: "User",
  primaryKey: "_id",
  properties: {
    _id: "int",
    email: "string",
    firstName: "string?",
    lastName: "string?",
    img: "string?",
    active: { type: "bool", default: true },
    createdAt: "date",
  },
};
