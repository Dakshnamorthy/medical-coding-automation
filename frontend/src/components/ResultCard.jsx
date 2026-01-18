import ConfidenceBar from "./ConfidenceBar";

export default function ResultCard({ title, codes }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      {codes.length === 0 && (
        <p className="text-sm text-gray-500">
          No codes detected.
        </p>
      )}

      {codes.map((code, index) => (
        <div
          key={index}
          className="
            border 
            border-gray-200 
            p-4 
            mb-3 
            rounded-lg 
            bg-gray-50
          "
        >
          <p className="font-medium text-gray-800">
            {code.code} — {code.description}
          </p>

          <ConfidenceBar value={code.confidence} />
        </div>
      ))}
    </div>
  );
}
