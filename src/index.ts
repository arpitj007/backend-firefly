import express from "express";
import cors from "cors";
import "dotenv";
import bodyParser from "body-parser";
import pokemonRoutes from "./routes";
import { Database } from "./db";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

Database.getInstance();

// Routes
app.use("/api", pokemonRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
