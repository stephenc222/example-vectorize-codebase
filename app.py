import os
import numpy as np
from torch import Tensor
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel


CODEBASE_DIR = "./example-codebase"
IGNORED_DIRECTORIES = ["node_modules", "public/build"]
IGNORED_FILES = ["package-lock.json", "yarn.lock"]
ALLOWED_EXTENSIONS = [".ts", ".tsx"]

IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".svg",
    ".ico",
]


def load_codebase(directory):
    snippets = []
    for filename in os.listdir(directory):
        # Skip hidden files and directories
        if filename.startswith('.'):
            continue

        filepath = os.path.join(directory, filename)

        if os.path.isdir(filepath):
            # If it's a directory, recursively load its contents
            snippets.extend(load_codebase(filepath))
        else:
            if any(ignored in filepath for ignored in IGNORED_DIRECTORIES):
                continue
            if filename in IGNORED_FILES:
                continue
            if not any(filepath.endswith(ext) for ext in ALLOWED_EXTENSIONS):
                continue

            with open(filepath, 'r') as file:
                content = file.read().strip()
                if content:  # Check if content is not empty
                    snippets.append(content)
    return snippets


def average_pool(last_hidden_states: Tensor,
                 attention_mask: Tensor) -> Tensor:
    last_hidden = last_hidden_states.masked_fill(
        ~attention_mask[..., None].bool(), 0.0)
    return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]


def generate_embeddings(snippets):
    prefix = "query: "  # Assuming all code snippets are queries
    input_texts = [prefix + snippet for snippet in snippets]

    tokenizer = AutoTokenizer.from_pretrained('thenlper/gte-base')
    model = AutoModel.from_pretrained('thenlper/gte-base')

    batch_dict = tokenizer(input_texts, max_length=512,
                           padding=True, truncation=True, return_tensors='pt')
    outputs = model(**batch_dict)
    embeddings = average_pool(
        outputs.last_hidden_state, batch_dict['attention_mask'])

    return F.normalize(embeddings, p=2, dim=1).detach().numpy()


def find_k_nearest_neighbors(query_embedding, embeddings, k=5):
    # Using cosine similarity as embeddings are normalized
    similarities = np.dot(embeddings, query_embedding.T)
    sorted_indices = similarities.argsort(axis=0)[-k:][::-1]
    return sorted_indices.squeeze()


if __name__ == "__main__":
    snippets = load_codebase(CODEBASE_DIR)
    embeddings = generate_embeddings(snippets)

    # example query
    query = "Where are the rules of sudoku defined?"
    query_embedding = generate_embeddings([query])
    nearest_neighbors = find_k_nearest_neighbors(query_embedding, embeddings)
    top_matches = nearest_neighbors[:2]
    print("Query:", query)
    print("Top Matches:")
    for index in top_matches:
        # print the first 500 characters to illustrate the found match
        print(f"- Matched Code:\n{snippets[index][:500]}...\n")
