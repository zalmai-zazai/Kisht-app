import { useState } from "react";

export default function CreateGroup({ onCreate, theme }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState(10);
  const [amount, setAmount] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ groupName, members, amount });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-xl shadow-md max-w-md mx-auto transition-all duration-300 ${
        theme === "gradient"
          ? "bg-black bg-opacity-40 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Create Kisht Group</h2>

      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className={`border p-2 w-full mb-3 rounded ${
          theme === "gradient"
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        required
      />

      <input
        type="number"
        placeholder="Number of Members"
        value={members}
        onChange={(e) => setMembers(Number(e.target.value))}
        className={`border p-2 w-full mb-3 rounded ${
          theme === "gradient"
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        required
      />

      <input
        type="number"
        placeholder="Amount per Person"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className={`border p-2 w-full mb-3 rounded ${
          theme === "gradient"
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        required
      />

      <button
        className={`px-4 py-2 rounded w-full transition-all ${
          theme === "gradient"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Create Group
      </button>
    </form>
  );
}
