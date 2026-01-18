export default function ConfidenceBar({ value }) {
  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-1">
        Confidence: {value}%
      </p>
    </div>
  );
}
