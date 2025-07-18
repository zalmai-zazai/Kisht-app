import { useState } from "react";

export default function CreateGroup({ onCreate }) {
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
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Create Kisht Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <input
        type="number"
        placeholder="Number of Members"
        value={members}
        onChange={(e) => setMembers(Number(e.target.value))}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount per Person"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
        Create Group
      </button>
    </form>
  );
}
