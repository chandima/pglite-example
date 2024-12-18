import { pipeline } from "npm:@huggingface/transformers";

const model = "onnx-community/Llama-3.2-1B-Instruct";
// const model = "HuggingFaceTB/SmolLM2-360M-Instruct"

// Create a text-generation pipeline
const generator = await pipeline(
    "text-generation",
    model,
);

// Define the list of messages
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Tell me a funny joke." },
];

// Generate a response
const output = await generator(messages, { max_new_tokens: 128 });
console.log(output);