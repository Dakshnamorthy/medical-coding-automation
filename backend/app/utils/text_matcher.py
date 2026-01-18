import re

def normalize_text(text: str):
    # Lowercase and remove punctuation
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text

def find_matching_codes(text, dataframe):
    text = normalize_text(text)
    text_words = set(text.split())
    matches = []

    for _, row in dataframe.iterrows():
        description = normalize_text(row["description"])
        desc_words = set(description.split())

        # Match if at least one meaningful word overlaps
        common_words = text_words.intersection(desc_words)

        if len(common_words) > 0:
            matches.append({
                "code": row["code"],
                "description": row["description"]
            })

    return matches
