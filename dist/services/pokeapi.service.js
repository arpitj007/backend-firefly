"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoritePokemon = exports.isFavoritePokemon = exports.getFavoritePokemon = exports.addFavoritePokemon = exports.fetchPokemonDetails = exports.fetchPokemonList = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db");
const BASE_API = "https://pokeapi.co/api/v2";
const db = db_1.Database.getInstance();
const fetchPokemonList = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${BASE_API}/pokemon`, {
        params: { offset, limit },
    });
    return response.data;
});
exports.fetchPokemonList = fetchPokemonList;
const fetchPokemonDetails = (idOrName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${BASE_API}/pokemon/${idOrName}`);
    const isFav = yield (0, exports.isFavoritePokemon)(response.data.name);
    return Object.assign(Object.assign({}, response.data), { is_favorite: isFav });
});
exports.fetchPokemonDetails = fetchPokemonDetails;
// Add a Pokémon to the favorite list
const addFavoritePokemon = (name) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.run(`INSERT INTO favorite (name) VALUES (?)`, [name]);
});
exports.addFavoritePokemon = addFavoritePokemon;
// Get all favorite Pokémon
const getFavoritePokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.all(`SELECT * FROM favorite`);
});
exports.getFavoritePokemon = getFavoritePokemon;
// Get one favorite Pokémon
const isFavoritePokemon = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM favorite WHERE name = ?`, [name], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row !== undefined && row !== null); // Check for a matching row
        });
    });
});
exports.isFavoritePokemon = isFavoritePokemon;
// Remove a Pokémon from the favorite list
const removeFavoritePokemon = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.run(`DELETE FROM favorite WHERE name = ?`, [name]);
});
exports.removeFavoritePokemon = removeFavoritePokemon;
