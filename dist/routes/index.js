"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemon_controller_1 = require("../controllers/pokemon.controller");
const router = express_1.default.Router();
// Route to fetch the Pokémon list
router.get("/pokemon", pokemon_controller_1.getPokemonList);
// Route to fetch Pokémon details by ID or name
router.get("/pokemon/:idOrName", pokemon_controller_1.getPokemonDetails);
// Add favurite pokemon
router.post("/pokemon/fav", pokemon_controller_1.addFavorite);
// Remove favorite pokemon
router.delete("/pokemon/fav/:name", pokemon_controller_1.removeFav);
exports.default = router;
