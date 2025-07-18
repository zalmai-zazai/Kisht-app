export default function SavedKishts({ savedKishts, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Saved Kishts</h2>
      {savedKishts.length === 0 ? (
        <p className="text-gray-500">No saved kishts yet.</p>
      ) : (
        <ul>
          {savedKishts.map((k, i) => (
            <li key={i} className="border-b py-2 flex justify-between">
              <span>
                Kisht {i + 1} - {k.date}
              </span>
              <button
                onClick={() => onSelect(k)}
                className="text-blue-500 hover:underline"
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
