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

export interface ServerSpecimen {
  id: number;
  name: string | null;
}

// Annotazione rettangolo su immagine
export interface ServerAnnotation {
  id: number;
  tl_x: number;
  tl_y: number;
  br_x: number;
  br_y: number;
  specimenId: number | null;
  specimen?: ServerSpecimen | null;
}

// Immagine collegata a un avvistamento
export interface ServerImage {
  id: number;
  url: string;
  annotations?: ServerAnnotation[];
}
