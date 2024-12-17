import { Ollama } from "ollama";

const client = new Ollama({
  baseUrl: "http://localhost:11434", // Default Ollama API URL
});

async function fetchEmbeddings(text) {
  try {
    // Use the embedding-specific endpoint for `nomic-embed-text`
    const response = await client.embed({
      model: "nomic-embed-text",
      input: text,
    });

    return response.embeddings; // Extract embedding from the response
  } catch (error) {
    console.error("Error querying Ollama API:", error);
    throw error;
  }
}

// Main function to demonstrate embedding generation
(async () => {
  try {
    const inputText =
      "A robot may not injure a human being or, through inaction, allow a human being to come to harm.";
    const embeddings = await fetchEmbeddings(inputText);

    console.log("Input Text:", inputText);
    console.log("Generated Embeddings:", embeddings);
  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
})();
