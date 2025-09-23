import { ObjectSchema } from "realm";

export const AnimalSchema: ObjectSchema = {
  name: "Animal",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    colorHex: "string?",
  },
};
