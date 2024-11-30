import { Request, Response } from "express";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  addFavoritePokemon,
  removeFavoritePokemon,
} from "../services/pokeapi.service";

export const getPokemonList = async (req: Request, res: Response) => {
  const { offset = 0, limit = 150 } = req.query;

  try {
    const data = await fetchPokemonList(Number(offset), Number(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Pokémon list",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPokemonDetails = async (req: Request, res: Response) => {
  const { idOrName } = req.params;

  try {
    const data = await fetchPokemonDetails(idOrName);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch details for Pokémon: ${idOrName}`,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const data = await addFavoritePokemon(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const removeFav = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const data = await removeFavoritePokemon(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
