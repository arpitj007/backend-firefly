import sqlite3, { Database as SQLiteDatabase } from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../pokemon.db");

export class Database {
  private static instance: SQLiteDatabase;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  // Singleton to get the database instance
  public static getInstance(): SQLiteDatabase {
    if (!Database.instance) {
      Database.instance = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error("Error opening database:", err.message);
        } else {
          console.log("Connected to SQLite database.");
        }
      });

      Database.instance.serialize(() => {
        Database.instance.run(
          `CREATE TABLE IF NOT EXISTS favorite (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          )`,
          (err) => {
            if (err) {
              console.error("Error creating table:", err.message);
            } else {
              console.log("Table 'favorite' is ready.");
            }
          }
        );
      });
    }

    return Database.instance;
  }

  public static run(query: string, params: any[] = []): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Database.getInstance().run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public static all<T>(query: string, params: any[] = []): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      Database.getInstance().all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  // Fetch a single row from a SELECT query
  public static get<T>(
    query: string,
    params: any[] = []
  ): Promise<T | undefined> {
    return new Promise<T | undefined>((resolve, reject) => {
      Database.getInstance().get(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });
  }
}

// Export the database instance
export const db = Database.getInstance();
