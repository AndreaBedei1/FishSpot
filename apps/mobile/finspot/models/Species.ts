import { ObjectSchema } from "realm";

export const SpeciesSchema: ObjectSchema = {
  name: "Species",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    scientificName: "string?",
    animalId: "int",
  },
};
