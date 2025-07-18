export default function History({ history, theme }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md ${
        theme === "gradient"
          ? "bg-black bg-opacity-40 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Poll History</h2>

      {history.length === 0 ? (
        <p className={theme === "gradient" ? "text-gray-400" : "text-gray-500"}>
          No winners yet.
        </p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li
              key={i}
              className={`border-b py-2 flex justify-between ${
                theme === "gradient"
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-800"
              }`}
            >
              <span>{h.name}</span>
              <span
                className={
                  theme === "gradient" ? "text-gray-400" : "text-gray-500"
                }
              >
                {h.date}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
