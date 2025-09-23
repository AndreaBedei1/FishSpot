import * as SQLite from "expo-sqlite";

export const openDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("fishspot.db");
    console.log("✅ DB aperto:", db);

    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE,
      firstName TEXT,
      lastName TEXT,
      img TEXT,
      active INTEGER DEFAULT 1,
      createdAt TEXT
    )`);

    await db.runAsync(`CREATE TABLE IF NOT EXISTS animals (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE,
      colorHex TEXT
    )`);

    await db.runAsync(`CREATE TABLE IF NOT EXISTS species (
      id INTEGER PRIMARY KEY,
      name TEXT,
      scientificName TEXT,
      animalId INTEGER
    )`);

    await db.runAsync(`CREATE TABLE IF NOT EXISTS sightings (
      id INTEGER PRIMARY KEY,
      date TEXT,
      specimens INTEGER,
      wind TEXT,
      sea TEXT,
      notes TEXT,
      latitude REAL,
      longitude REAL,
      userId INTEGER,
      animalId INTEGER,
      speciesId INTEGER,
      deleted INTEGER DEFAULT 0,
      createdAt TEXT,
      updatedAt TEXT,
      dirty INTEGER DEFAULT 0
    )`);

    console.log("✅ Tabelle create correttamente");
    return db;
  } catch (err) {
    console.error("❌ Errore apertura DB:", err);
    throw err;
  }
};
