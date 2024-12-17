import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const response = await extractor(
  [
    "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
  ],
  { pooling: "mean", normalize: true }
);

console.log(Array.from(response.data));
// => [-0.004044221248477697,  0.026746056973934174,   0.0071970801800489426, ... ]
