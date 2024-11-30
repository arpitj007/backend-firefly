import express from "express";
import {
  getPokemonList,
  getPokemonDetails,
  addFavorite,
  removeFav,
} from "../controllers/pokemon.controller";

const router = express.Router();

// Route to fetch the Pokémon list
router.get("/pokemon", getPokemonList);

// Route to fetch Pokémon details by ID or name
router.get("/pokemon/:idOrName", getPokemonDetails);

// Add favurite pokemon
router.post("/pokemon/fav", addFavorite);

// Remove favorite pokemon
router.delete("/pokemon/fav/:name", removeFav);

export default router;
