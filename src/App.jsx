import useLocalStorage from "./hooks/useLocalStorage";
import { useAuth } from "./auth/AuthContext";
import CreateGroup from "./components/CreateGroup";
import MembersList from "./components/MembersList";
import PollSection from "./components/PollSection";
import History from "./components/History";
import Approvals from "./components/Approvals";
import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const { user, login, logout } = useAuth();
  const [theme, setTheme] = useState("gradient"); // gradient or light
  const [group, setGroup] = useLocalStorage("kisht-group", null);
  const [members, setMembers] = useLocalStorage("kisht-members", []);
  const [history, setHistory] = useLocalStorage("kisht-history", []);
  const [savedKishts, setSavedKishts] = useLocalStorage("kisht-saved", []);
  const [selectedKisht, setSelectedKisht] = useState(null);

  const kishtStarted = members.some((m) => m.paid);
  const kishtCompleted = members.length > 0 && members.every((m) => m.received);

  // ✅ Login Screen with WOW Effect
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-black text-white px-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold mb-4 drop-shadow-lg text-center"
        >
          Welcome to <span className="text-yellow-300">Kisht</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg mb-8 text-gray-200 text-center"
        >
          Your Digital Money Pooling App
        </motion.p>

        {/* Sign-In Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={login}
          className="flex items-center gap-3 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Sign in with Google
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-sm text-gray-300"
        >
          Secure & Easy | Trusted by Communities
        </motion.p>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8 flex mt-40 "
        >
          <a
            href="https://www.darkrisen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logo.png"
              alt="Darkrisen logo"
              className="w-44 mr-4 cursor-pointer rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
            />
          </a>
          <a
            href="https://www.Seattlepixels.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/SecondLogo.png"
              alt="Seattl Pixels logo"
              className="w-44  cursor-pointer bg-white rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    );
  }

  // ✅ Handlers
  const handleCreateGroup = (data) => {
    setGroup({ ...data, admin: user.uid });
    setMembers([]);
    setHistory([]);
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
      alert("Cannot add members until the current cycle ends!");
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
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "gradient"
          ? "bg-gradient-to-br from-blue-700 to-black text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <header className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-3xl font-bold">Kisht App</h1>
        <div className="flex gap-4">
          <button
            onClick={() =>
              setTheme(theme === "gradient" ? "light" : "gradient")
            }
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            {theme === "gradient" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ✅ Top Buttons */}
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

        {/* ✅ Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Previous Kishts */}
          <div
            className={`p-6 rounded-xl shadow-md ${
              theme === "gradient"
                ? "bg-black bg-opacity-40 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">📜 Previous Kishts</h2>
            {savedKishts.length === 0 ? (
              <p
                className={
                  theme === "gradient" ? "text-gray-400" : "text-gray-500"
                }
              >
                No saved kishts yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {savedKishts.map((k, i) => (
                  <li
                    key={i}
                    className={`flex justify-between items-center p-3 rounded ${
                      theme === "gradient"
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    <span>
                      Kisht {i + 1} - {k.date}
                    </span>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedKisht(k)}
                        className={`hover:underline ${
                          theme === "gradient"
                            ? "text-blue-400"
                            : "text-blue-500"
                        }`}
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
                        className={`hover:underline ${
                          theme === "gradient" ? "text-red-400" : "text-red-500"
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Current Kisht Details */}
          {/* ✅ Show selected Kisht details */}
          {selectedKisht && (
            <div
              className={`lg:col-span-2 p-6 rounded-xl shadow-md ${
                theme === "gradient"
                  ? "bg-black bg-opacity-40 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-400">
                📌 Kisht Details
              </h2>

              {/* ✅ Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div
                  className={`p-4 rounded-lg ${
                    theme === "gradient" ? "bg-gray-800" : "bg-blue-100"
                  }`}
                >
                  <p className="text-sm opacity-70">Date</p>
                  <p className="text-lg font-bold">{selectedKisht.date}</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    theme === "gradient" ? "bg-gray-800" : "bg-green-100"
                  }`}
                >
                  <p className="text-sm opacity-70">Total Collected</p>
                  <p className="text-lg font-bold text-green-400">
                    $
                    {selectedKisht.members.reduce(
                      (sum, m) => sum + (m.paidAmount || 0),
                      0
                    )}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    theme === "gradient" ? "bg-gray-800" : "bg-purple-100"
                  }`}
                >
                  <p className="text-sm opacity-70">Members</p>
                  <p className="text-lg font-bold">
                    {selectedKisht.members.length}
                  </p>
                </div>
              </div>

              {/* ✅ Members Table */}
              <h3 className="text-lg font-semibold mb-3">Members & Shares</h3>
              <div className="overflow-x-auto">
                <table className="w-full border rounded-lg">
                  <thead>
                    <tr
                      className={
                        theme === "gradient"
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
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
                        <tr
                          key={i}
                          className={
                            theme === "gradient"
                              ? "border-b border-gray-700"
                              : "border-b hover:bg-gray-50"
                          }
                        >
                          <td className="py-2 px-4">{m.name}</td>
                          <td className="py-2 px-4">${m.paidAmount}</td>
                          <td className="py-2 px-4">{m.paidDate || "—"}</td>
                          <td className="py-2 px-4 text-blue-400 font-semibold">
                            ${share.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ✅ Winners */}
              <h3 className="text-lg font-semibold mt-6 mb-3">🏆 Winners</h3>
              <ul className="space-y-2">
                {selectedKisht.history.map((h, i) => (
                  <li
                    key={i}
                    className={`flex justify-between p-2 rounded ${
                      theme === "gradient" ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <span>{h.name}</span>
                    <span className="opacity-70">{h.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Main Sections */}
        {!group ? (
          <CreateGroup theme={theme} onCreate={handleCreateGroup} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <MembersList theme={theme} members={members} />
            {user.uid === group.admin && (
              <>
                <Approvals
                  members={members}
                  theme={theme}
                  setMembers={setMembers}
                  handleRemoveMember={handleRemoveMember}
                />
                <PollSection
                  members={members}
                  theme={theme}
                  onWinnerSelected={(winner) => {
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

                    if (updatedMembers.every((m) => m.received)) {
                      alert("🎉 Kisht Completed!");
                      return;
                    }

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
            <History theme={theme} history={history} />
          </div>
        )}
      </div>
    </div>
  );
}
