from app.rag.vector_store import VectorStore

class AnalyzerAgent:
    def __init__(self, icd_df, cpt_df, threshold=70):
        self.icd_store = VectorStore(icd_df)
        self.cpt_store = VectorStore(cpt_df)
        self.threshold = threshold

    def analyze(self, text: str):
        icd_results = self.icd_store.search(text)
        cpt_results = self.cpt_store.search(text)

        icd_filtered = [
            code for code in icd_results
            if code["confidence"] >= self.threshold
        ]

        cpt_filtered = [
            code for code in cpt_results
            if code["confidence"] >= self.threshold
        ]

        return {
            "icd_codes": icd_filtered,
            "cpt_codes": cpt_filtered
        }
