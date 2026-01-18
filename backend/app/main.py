from fastapi import FastAPI
from app.utils.csv_loader import load_icd_codes, load_cpt_codes
from app.models.medical_input import MedicalTextInput
from app.agents.analyzer_agent import AnalyzerAgent
from app.agents.validator_agent import ValidatorAgent
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Medical Coding Automation API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Medical Coding API is running"}

@app.post("/analyze-text")
def analyze_text(input: MedicalTextInput):
    icd_df = load_icd_codes()
    cpt_df = load_cpt_codes()

    analyzer = AnalyzerAgent()
    analysis_result = analyzer.analyze(input.text)

    validator = ValidatorAgent()
    warnings = validator.validate(analysis_result)

    return {
        "analysis": analysis_result,
        "warnings": warnings
    }
