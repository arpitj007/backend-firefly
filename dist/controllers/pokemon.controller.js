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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFav = exports.addFavorite = exports.getPokemonDetails = exports.getPokemonList = void 0;
const pokeapi_service_1 = require("../services/pokeapi.service");
const getPokemonList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 150 } = req.query;
    try {
        const data = yield (0, pokeapi_service_1.fetchPokemonList)(Number(offset), Number(limit));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch Pokémon list",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getPokemonList = getPokemonList;
const getPokemonDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOrName } = req.params;
    try {
        const data = yield (0, pokeapi_service_1.fetchPokemonDetails)(idOrName);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to fetch details for Pokémon: ${idOrName}`,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getPokemonDetails = getPokemonDetails;
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const data = yield (0, pokeapi_service_1.addFavoritePokemon)(name);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.addFavorite = addFavorite;
const removeFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const data = yield (0, pokeapi_service_1.removeFavoritePokemon)(name);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.removeFav = removeFav;
