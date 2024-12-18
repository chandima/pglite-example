import { pipeline, TextStreamer } from "npm:@huggingface/transformers";

// Create a text-generation pipeline
const generator = await pipeline(
    "text-generation",
    "onnx-community/Qwen2.5-Coder-0.5B-Instruct",
    { dtype: "q4" },
);


// Define the list of messages
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Write a quick sort algorithm in Javascript." },
];

// Create text streamer
const streamer = new TextStreamer(generator.tokenizer, {
    skip_prompt: true,
    // Optionally, do something with the text (e.g., write to a textbox)
    // callback_function: (text) => { /* Do something with text */ },
})

// Generate a streaming response
const _result = await generator(messages, { max_new_tokens: 512, do_sample: false, streamer });