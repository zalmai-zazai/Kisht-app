export default function MembersList({ members }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Members</h2>
      {members.length === 0 ? (
        <p className="text-gray-500">No members added yet.</p>
      ) : (
        <ul>
          {members.map((m, i) => (
            <li
              key={i}
              className={`flex justify-between p-2 rounded mb-2 ${
                m.received
                  ? "bg-green-100"
                  : m.paid
                  ? "bg-yellow-100"
                  : "bg-gray-50"
              }`}
            >
              <span>{m.name}</span>
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
