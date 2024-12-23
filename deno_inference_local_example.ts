import { pipeline, env } from "npm:@huggingface/transformers";

// const modelName = "SmolLM2-135M-Instruct";
const modelName = "Llama-3.2-1B-Instruct";

// Specify a custom location for models (defaults to '/models/').
env.localModelPath = './models/';

// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;
env.allowLocalModels = true;

// Create a text-generation pipeline
const generator = await pipeline(
    "text-generation",
    modelName,
    {
        revision: 'onnx'
    }
);

// Define the list of messages
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Tell me a funny joke." },
];

// Generate a response
const output = await generator(messages, { max_new_tokens: 128 });
console.log(output);