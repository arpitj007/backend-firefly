import axios from "axios";
import { Database } from "../db";

const BASE_API = "https://pokeapi.co/api/v2";
const db = Database.getInstance();

export const fetchPokemonList = async (offset: number, limit: number) => {
  const response = await axios.get(`${BASE_API}/pokemon`, {
    params: { offset, limit },
  });
  return response.data;
};

export const fetchPokemonDetails = async (idOrName: string) => {
  const response = await axios.get(`${BASE_API}/pokemon/${idOrName}`);
  const isFav = await isFavoritePokemon(response.data.name);
  return { ...response.data, is_favorite: isFav };
};

// Add a Pokémon to the favorite list
export const addFavoritePokemon = async (name: string) => {
  await db.run(`INSERT INTO favorite (name) VALUES (?)`, [name]);
};

// Get all favorite Pokémon
export const getFavoritePokemon = async () => {
  return await db.all<{ id: number; name: string }>(`SELECT * FROM favorite`);
};

// Get one favorite Pokémon
export const isFavoritePokemon = async (name: string) => {
  return new Promise((resolve, reject) => {
    db.get<string>(
      `SELECT * FROM favorite WHERE name = ?`,
      [name],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row !== undefined && row !== null); // Check for a matching row
      }
    );
  });
};

// Remove a Pokémon from the favorite list
export const removeFavoritePokemon = async (name: string) => {
  return await db.run(`DELETE FROM favorite WHERE name = ?`, [name]);
};
