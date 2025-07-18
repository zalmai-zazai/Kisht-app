export default function History({ history }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Poll History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No winners yet.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i} className="border-b py-2">
              {h.name} - <span className="text-gray-500">{h.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
