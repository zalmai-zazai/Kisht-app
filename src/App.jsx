import useLocalStorage from "./hooks/useLocalStorage";
import { useAuth } from "./auth/AuthContext";
import CreateGroup from "./components/CreateGroup";
import MembersList from "./components/MembersList";
import PollSection from "./components/PollSection";
import History from "./components/History";
import Approvals from "./components/Approvals";
import { useState } from "react";

export default function App() {
  const { user, login, logout } = useAuth();
  const [group, setGroup] = useLocalStorage("kisht-group", null);
  const [members, setMembers] = useLocalStorage("kisht-members", []);
  const [history, setHistory] = useLocalStorage("kisht-history", []);
  const [savedKishts, setSavedKishts] = useLocalStorage("kisht-saved", []);
  const [selectedKisht, setSelectedKisht] = useState(null);
  const kishtStarted = members.some((m) => m.paid);
  const kishtCompleted = members.length > 0 && members.every((m) => m.received);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Welcome to Kisht</h1>
        <button
          onClick={login}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  const handleCreateGroup = (data) => {
    setGroup({ ...data, admin: user.uid });
    setMembers([]);
    setHistory([]);
  };

  const handlePoll = () => {
    const allPaid = members.length > 0 && members.every((m) => m.paid);
    if (!allPaid) {
      alert("All members must pay before starting the poll!");
      return;
    }

    const eligible = members.filter((m) => !m.received);
    if (eligible.length === 0) return alert("No eligible members left!");

    const winner = eligible[Math.floor(Math.random() * eligible.length)];

    // Mark winner as received
    const updatedMembers = members.map((m) =>
      m.name === winner.name ? { ...m, received: true } : m
    );
    setMembers(updatedMembers);

    // Add winner to history
    setHistory((prev) => [
      ...prev,
      { name: winner.name, date: new Date().toLocaleDateString() },
    ]);

    // If Kisht completed, stop here
    if (updatedMembers.every((m) => m.received)) {
      alert("🎉 Entire Kisht Completed! Start a new Kisht now.");
      return;
    }

    // Reset for next cycle
    const resetMembers = updatedMembers.map((m) => ({
      ...m,
      paid: false,
      paidAmount: 0,
      paidDate: null,
    }));
    setMembers(resetMembers);
  };

  const handleStartNewKisht = () => {
    if (
      !confirm(
        "Are you sure? This will remove all current members and history."
      )
    )
      return;
    setMembers([]);
    setHistory([]);
    setSelectedKisht(null);
  };

  const handleSaveKisht = () => {
    if (members.length === 0) return alert("No members to save!");
    const kishtData = {
      date: new Date().toLocaleDateString(),
      members: [...members],
      history: [...history],
    };
    setSavedKishts([...savedKishts, kishtData]);
    alert("Kisht saved successfully!");
  };
  const handleAddMember = () => {
    if (kishtStarted && !kishtCompleted) {
      alert("Cannot add members until the entire Kisht ends!");
      return;
    }
    const name = prompt("Enter member name:");
    if (name) {
      setMembers([
        ...members,
        { name, paid: false, paidAmount: 0, paidDate: null, received: false },
      ]);
    }
  };

  const handleRemoveMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">💰 Kisht App</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{user.displayName}</span>
          <img
            src={user.photoURL}
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ✅ Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ✅ Top Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleSaveKisht}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 shadow"
          >
            💾 Save Current Kisht
          </button>
          <button
            onClick={handleStartNewKisht}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow"
          >
            🔄 Start New Kisht
          </button>
          {user.uid === group?.admin && (
            <button
              onClick={handleAddMember}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 shadow"
            >
              ➕ Add Member
            </button>
          )}
        </div>

        {/* ✅ Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ✅ Previous Kishts */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              📜 Previous Kishts
            </h2>
            {savedKishts.length === 0 ? (
              <p className="text-gray-500">No saved kishts yet.</p>
            ) : (
              <ul className="space-y-2">
                {savedKishts.map((k, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100"
                  >
                    <div>
                      <span className="font-medium">
                        Kisht {i + 1} - {k.date}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedKisht(k)}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Remove this kisht?")) {
                            const updated = savedKishts.filter(
                              (_, index) => index !== i
                            );
                            setSavedKishts(updated);
                          }
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ✅ Current Kisht Details */}
          {selectedKisht && (
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                📌 Kisht Details
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-bold">{selectedKisht.date}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Collected</p>
                  <p className="text-lg font-bold text-green-700">
                    $
                    {selectedKisht.members.reduce(
                      (sum, m) => sum + (m.paidAmount || 0),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="text-lg font-bold">
                    {selectedKisht.members.length}
                  </p>
                </div>
              </div>

              {/* Members Table */}
              <h3 className="text-lg font-semibold mb-3">Members & Shares</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Paid</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedKisht.members.map((m, i) => {
                      const total = selectedKisht.members.reduce(
                        (sum, m) => sum + (m.paidAmount || 0),
                        0
                      );
                      const share = total / selectedKisht.members.length;
                      return (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-4">{m.name}</td>
                          <td className="py-2 px-4">${m.paidAmount}</td>
                          <td className="py-2 px-4">{m.paidDate || "—"}</td>
                          <td className="py-2 px-4 text-blue-600 font-semibold">
                            ${share.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Winners */}
              <h3 className="text-lg font-semibold mt-6 mb-3">🏆 Winners</h3>
              <ul className="space-y-2">
                {selectedKisht.history.map((h, i) => (
                  <li
                    key={i}
                    className="flex justify-between p-2 bg-gray-50 rounded"
                  >
                    <span>{h.name}</span>
                    <span className="text-gray-500">{h.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Main Functional Sections */}
        {!group ? (
          <CreateGroup onCreate={handleCreateGroup} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <MembersList members={members} />
            {user.uid === group.admin && (
              <>
                <Approvals
                  members={members}
                  setMembers={setMembers}
                  handleRemoveMember={handleRemoveMember}
                />
                <PollSection
                  members={members}
                  onWinnerSelected={(winner) => {
                    // Mark winner as received
                    const updatedMembers = members.map((m) =>
                      m.name === winner.name ? { ...m, received: true } : m
                    );

                    setMembers(updatedMembers);
                    setHistory([
                      ...history,
                      {
                        name: winner.name,
                        date: new Date().toLocaleDateString(),
                      },
                    ]);

                    // ✅ Check if everyone has received
                    if (updatedMembers.every((m) => m.received)) {
                      alert(
                        "🎉 Entire Kisht Completed! Start a new Kisht or Save it."
                      );
                      return; // Don't reset yet because it's fully completed
                    }

                    // ✅ Reset only payment status for next cycle
                    const resetMembers = updatedMembers.map((m) => ({
                      ...m,
                      paid: false,
                      paidAmount: 0,
                      paidDate: null,
                    }));

                    setMembers(resetMembers);
                  }}
                />
              </>
            )}
            <History history={history} />
          </div>
        )}
      </div>
    </div>
  );
}
