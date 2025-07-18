export default function SavedKishts({ savedKishts, onSelect, theme }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md ${
        theme === "gradient"
          ? "bg-black bg-opacity-40 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Saved Kishts</h2>

      {savedKishts.length === 0 ? (
        <p className={theme === "gradient" ? "text-gray-400" : "text-gray-500"}>
          No saved kishts yet.
        </p>
      ) : (
        <ul>
          {savedKishts.map((k, i) => (
            <li
              key={i}
              className={`border-b py-2 flex justify-between items-center ${
                theme === "gradient"
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-800"
              }`}
            >
              <span>
                Kisht {i + 1} - {k.date}
              </span>
              <button
                onClick={() => onSelect(k)}
                className={`hover:underline ${
                  theme === "gradient" ? "text-blue-400" : "text-blue-500"
                }`}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
