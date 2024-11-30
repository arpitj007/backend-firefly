"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.Database = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__dirname, "../pokemon.db");
class Database {
    constructor() {
        // Private constructor to prevent direct instantiation
    }
    // Singleton to get the database instance
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new sqlite3_1.default.Database(dbPath, (err) => {
                if (err) {
                    console.error("Error opening database:", err.message);
                }
                else {
                    console.log("Connected to SQLite database.");
                }
            });
            Database.instance.serialize(() => {
                Database.instance.run(`CREATE TABLE IF NOT EXISTS favorite (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          )`, (err) => {
                    if (err) {
                        console.error("Error creating table:", err.message);
                    }
                    else {
                        console.log("Table 'favorite' is ready.");
                    }
                });
            });
        }
        return Database.instance;
    }
    static run(query, params = []) {
        return new Promise((resolve, reject) => {
            Database.getInstance().run(query, params, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static all(query, params = []) {
        return new Promise((resolve, reject) => {
            Database.getInstance().all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    // Fetch a single row from a SELECT query
    static get(query, params = []) {
        return new Promise((resolve, reject) => {
            Database.getInstance().get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
}
exports.Database = Database;
// Export the database instance
exports.db = Database.getInstance();
