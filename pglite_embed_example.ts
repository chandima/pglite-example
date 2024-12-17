/**
 * This script demonstrates how to use the Hugging Face Inference API to fetch 
 * embeddings for sentences and store them in a PGLite (PostgresQL) database using the pgvector extension.
 * @see https://pglite.dev/examples/vector.html
 */

import "https://deno.land/std@0.206.0/dotenv/load.ts";
import { PGlite } from "npm:@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import { FeatureExtractionOutput, HfInference } from "https://esm.sh/@huggingface/inference@2.7.0";

// Load the API token from the environment
const API_TOKEN = Deno.env.get("HUGGINGFACE_API_KEY");
if (!API_TOKEN) {
    throw new Error("HUGGINGFACE_API_KEY is not set in the environment variables.");
}

// Initialize the Hugging Face Inference Client
const client = new HfInference(API_TOKEN);

async function fetchEmbeddings(text: string) {
    try {
        // Call the embeddings endpoint
        const response = await client.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text,
        });

        return response; // Response contains embeddings
    } catch (error) {
        console.error("Error calling Hugging Face API:", error);
        throw error;
    }
}

// Format vector as PostgreSQL literal
function formatVectorForPg(vector: number[]): string {
    return `[${vector.join(",")}]`; // Convert array to PostgreSQL vector format
}

// Initialize the database
const db = new PGlite({
    database: "./example.db", // SQLite database path
    extensions: { vector }, // Enable pgvector extension
});

// Enable the pgvector extension
await db.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

// Delete the embeddings table if it exists
await db.query(`DROP TABLE IF EXISTS embeddings;`);

// Create the table
await db.query(`
    CREATE TABLE embeddings (
        id SERIAL PRIMARY KEY,
        text TEXT,
        embedding vector(384) -- Vector column with 384 dimensions
    );
`);


// Sample sentences
const sentences = [
    "A robot must not harm a human being.",
    "Artificial intelligence is transforming the world.",
    "Deno is a secure runtime for JavaScript and TypeScript."
];

// Process and store each sentence
for (const sentence of sentences) {

    const embedding = await fetchEmbeddings(sentence); // Fetch the embedding vector
    // console.log("Embedding for sentence:", sentence, embedding);

    // Format the embedding as a PostgreSQL-compatible vector string
    const formattedVector = formatVectorForPg(embedding);


    // Insert the data into the embeddings table
    await db.query(
        `INSERT INTO embeddings (text, embedding) VALUES ($1, $2);`,
        [sentence, formattedVector]
    );
}

console.log("Sample sentences and their embeddings have been stored.");

// Query and log the embeddings table
const embeddings = await db.query("SELECT * FROM embeddings;");
console.log("Embeddings Table:", embeddings.rows);

// Semantic search query
const query = "Node.js was created by Ryan Dahl.";
const queryEmbedding = await fetchEmbeddings(query);
const formattedQueryVector = formatVectorForPg(queryEmbedding);

// Query for similar embeddings
const result = await db.query(
    `SELECT text, embedding <-> $1 AS distance FROM embeddings ORDER BY embedding <-> $1 LIMIT 3;`,
    [formattedQueryVector]
);

// Log the results
console.log("Similar sentences to query:", result);

// Pick the most similar sentence and display with query
const mostSimilar = result.rows[0];
console.log("Query:", query);
console.log("Most similar sentence to query:", mostSimilar);

// Close the database connection
await db.close();