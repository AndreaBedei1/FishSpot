import { ObjectSchema } from "realm";

export const SightingSchema: ObjectSchema = {
  name: "Sighting",
  primaryKey: "_id",
  properties: {
    _id: "int",
    date: "date",
    specimens: "int",
    wind: "string?",
    sea: "string?",
    notes: "string?",
    latitude: "double",
    longitude: "double",
    userId: "int",
    animalId: "int",
    speciesId: "int?",
    deleted: { type: "bool", default: false },
    createdAt: "date",
    updatedAt: "date",
    dirty: { type: "bool", default: false }, // per sync
  },
};
