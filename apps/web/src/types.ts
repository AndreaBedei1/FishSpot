export type Animal = { id: number; name: string; colorHex?: string | null };
export type Species = { id: number; name: string; animalId: number };
export type UserLite = { id: number; email: string };

export type Sighting = {
  id: number;
  date: string;
  specimens: number;
  wind?: string | null;
  sea?: string | null;
  notes?: string | null;
  latitude: number;
  longitude: number;
  animal: Animal;
  species?: Species | null;
  user: UserLite;
};
