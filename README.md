# Code Search with Vector Embeddings

This repository contains a Python script that demonstrates how to use transformer models to convert code snippets into vector embeddings. These embeddings can then be used to perform code search using natural language queries.

## Overview

- **`load_codebase`**: Recursively navigates through a directory, filtering out unwanted files and directories, and loads the content of the allowed files into a list of code snippets.
- **`average_pool`**: Averages out the token embeddings to get a fixed-size vector for each code snippet.
- **`generate_embeddings`**: Converts code snippets into vector representations using a pre-trained transformer model.
- **`find_k_nearest_neighbors`**: Calculates the cosine similarity between a query embedding and all code snippet embeddings to find the most relevant pieces of code.

## Usage

1. Clone this repository.
2. Ensure you have the required libraries installed.
3. Run the script to see an example of how the code search works.

```bash
python app.py
```

## Detailed Explanation

For a step-by-step walkthrough of the code and the concepts behind it, check out the accompanying blog post: [Code Search with Vector Embeddings: A Transformer's Approach](https://stephencollins.tech/posts/code-search-with-vector-embeddings).
