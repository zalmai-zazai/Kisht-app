export default function Approvals({ members, setMembers, handleRemoveMember }) {
  const handleAddMember = () => {
    const name = prompt("Enter member name:");
    if (name) {
      setMembers([
        ...members,
        { name, paid: false, paidAmount: 0, paidDate: null, received: false },
      ]);
    }
  };

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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Approve Payments</h2>
      <p className="text-green-600 font-bold mb-3">
        Total Collected: ${totalPaid}
      </p>
      <ul>
        {members.length === 0 ? (
          <p className="text-gray-500">No members yet.</p>
        ) : (
          members.map((m, i) => (
            <li key={i} className="flex justify-between items-center mb-3">
              <div>
                <p>{m.name}</p>
                {m.paid && (
                  <small className="text-gray-500">
                    ${m.paidAmount} on {m.paidDate}
                  </small>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleTogglePaid(i)}
                  className={`px-4 py-2 rounded ${
                    m.paid ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {m.paid ? "Paid" : "Mark Paid"}
                </button>
                {/* ✅ Add Remove button here */}
                <button
                  onClick={() => handleRemoveMember(i)}
                  className="text-red-500 ml-3 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* <button
        onClick={handleAddMember}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Add Member
      </button> */}
    </div>
  );
}
