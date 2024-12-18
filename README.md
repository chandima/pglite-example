# PGlite - Postgres in WASM

## Install

```bash
deno init
```

## PgLite Examples

PgLite example: ✅

```bash
deno run --allow-read --allow-write pglite_example.ts
```

PgLite embedding example: ✅

```bash
deno run --allow-read --allow-write --allow-env --allow-net pglite_embed_example.ts
```

## Embedding Examples

Embedding example (Node JavaScript). See [this blog post](https://www.datastax.com/blog/how-to-create-vector-embeddings-in-node-js).  ✅

```bash
node embedding_example.js
```

Embedding example (Using HuggingFace API). ✅

```bash
deno run --allow-net --allow-env --allow-read embedding_huggingface_example.ts
```

Embedding example (Using local Ollama installation). ✅

```bash
node embedding_ollama_example.js
```

Embedding example (Deno). ✅

```bash
deno install --allow-scripts npm:@huggingface/transformers
deno run --allow-net --allow-ffi --allow-env --allow-read --allow-write embedding_example.ts
```
