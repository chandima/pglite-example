import "https://deno.land/std@0.206.0/dotenv/load.ts";
import { HfInference } from "https://esm.sh/@huggingface/inference@2.7.0";

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

// Main function to demonstrate embedding generation
(async () => {
    try {
        const inputText = "A robot may not injure a human being or, through inaction, allow a human being to come to harm.";
        const embeddings = await fetchEmbeddings(inputText);

        console.log("Input Text:", inputText);
        console.log("Generated Embeddings:", embeddings);
    } catch (error) {
        console.error("Error generating embeddings:", error);
    }
})();