/**
 * This example demonstrates how to use the feature-extraction pipeline to generate embeddings for a given text.
 * @see https://github.com/huggingface/transformers.js-examples/tree/main/deno-embed
 */

import { pipeline } from "npm:@huggingface/transformers";

(async () => {
    // Load the feature-extraction pipeline
    const extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
        { dtype: 'fp32' }
    );

    // Use the extractor to generate embeddings
    const response = await extractor(
        [
            "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
        ],
        { pooling: "mean", normalize: true }
    );

    // Convert the result to an array and log it
    console.log(Array.from(response.data));
    // Example output: [-0.004044221248477697, 0.026746056973934174, 0.0071970801800489426, ... ]
})();