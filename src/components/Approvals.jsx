export default function Approvals({
  members,
  setMembers,
  handleRemoveMember,
  theme,
}) {
  const handleTogglePaid = (index) => {
    const updated = [...members];
    if (!updated[index].paid) {
      const amount = prompt("Enter amount paid:");
      if (!amount || isNaN(amount)) return alert("Please enter a valid amount");
      updated[index].paid = true;
      updated[index].paidAmount = parseFloat(amount);
      updated[index].paidDate = new Date().toLocaleDateString();
    } else {
      updated[index].paid = false;
      updated[index].paidAmount = 0;
      updated[index].paidDate = null;
    }
    setMembers(updated);
  };

  const totalPaid = members.reduce((sum, m) => sum + (m.paidAmount || 0), 0);

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${
        theme === "gradient"
          ? "bg-black bg-opacity-40 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Approve Payments</h2>
      <p
        className={`${
          theme === "gradient" ? "text-green-400" : "text-green-600"
        } font-bold mb-3`}
      >
        Total Collected: ${totalPaid}
      </p>
      <ul>
        {members.length === 0 ? (
          <p
            className={`${
              theme === "gradient" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No members yet.
          </p>
        ) : (
          members.map((m, i) => (
            <li
              key={i}
              className={`flex justify-between items-center mb-3 ${
                theme === "gradient"
                  ? "border-b border-gray-700"
                  : "border-b border-gray-200"
              }`}
            >
              <div>
                <p>{m.name}</p>
                {m.paid && (
                  <small
                    className={`${
                      theme === "gradient" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    ${m.paidAmount} on {m.paidDate}
                  </small>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleTogglePaid(i)}
                  className={`px-4 py-2 rounded ${
                    m.paid
                      ? "bg-green-500 text-white"
                      : theme === "gradient"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {m.paid ? "Paid" : "Mark Paid"}
                </button>
                <button
                  onClick={() => handleRemoveMember(i)}
                  className={`${
                    theme === "gradient" ? "text-red-400" : "text-red-500"
                  } ml-3 hover:underline`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
