import { useState } from "react";
import TextInput from "../components/TextInput";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeText = async () => {
    if (!text.trim()) {
      setError("Please enter clinical text.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Backend not reachable. Is FastAPI running?");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          🏥 Medical Coding Automation
        </h1>

        <TextInput text={text} setText={setText} />

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={analyzeText}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Clinical Text"}
        </button>

        {result && (
          <div className="mt-8">
            <ResultCard
              title="ICD-10 Diagnosis Codes"
              codes={result.analysis.icd_codes}
            />

            <ResultCard
              title="CPT Procedure Codes"
              codes={result.analysis.cpt_codes}
            />

            {result.warnings.length > 0 && (
              <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded">
                <h3 className="font-semibold mb-2 text-yellow-800">
                  ⚠️ Warnings
                </h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700">
                  {result.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
