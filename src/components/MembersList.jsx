export default function MembersList({ members, theme }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md ${
        theme === "gradient"
          ? "bg-black bg-opacity-40 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Members</h2>
      {members.length === 0 ? (
        <p className={theme === "gradient" ? "text-gray-400" : "text-gray-500"}>
          No members added yet.
        </p>
      ) : (
        <ul>
          {members.map((m, i) => (
            <li
              key={i}
              className={`flex justify-between p-3 rounded mb-2 ${
                theme === "gradient"
                  ? m.received
                    ? "bg-green-800 text-green-200"
                    : m.paid
                    ? "bg-yellow-700 text-yellow-200"
                    : "bg-gray-700 text-gray-200"
                  : m.received
                  ? "bg-green-100 text-green-700"
                  : m.paid
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-semibold">{m.name}</span>
              <span>
                {m.received
                  ? "✅ Received"
                  : m.paid
                  ? "💰 Paid"
                  : "⏳ Not Paid"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
