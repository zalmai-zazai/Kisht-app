import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function PollSection({ members, onWinnerSelected }) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const allPaid = members.length > 0 && members.every((m) => m.paid);

  const handlePoll = () => {
    if (!members || members.length === 0) {
      alert("No members available for polling!");
      return;
    }

    const eligibleMembers = members.filter((m) => !m.received);
    if (eligibleMembers.length === 0) {
      alert("All members have received their share!");
      return;
    }

    setSpinning(true);
    setWinner(null);
    setShowConfetti(false);

    const randomWinner =
      eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];

    // Simulate spinning name change
    let spinIndex = 0;
    const spinInterval = setInterval(() => {
      const currentName =
        eligibleMembers[spinIndex % eligibleMembers.length].name;
      setDisplayName(currentName);
      spinIndex++;
    }, 150); // Speed of name change

    setTimeout(() => {
      clearInterval(spinInterval);
      setSpinning(false);
      setWinner(randomWinner);
      setShowConfetti(true);
      onWinnerSelected(randomWinner);

      // Hide confetti after 3 sec
      setTimeout(() => setShowConfetti(false), 3000);
    }, 4000); // Spin for 4 seconds
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">🎯 Run Poll</h2>

      <button
        onClick={handlePoll}
        disabled={spinning || !allPaid}
        className={`px-6 py-3 rounded-lg text-white font-semibold w-full ${
          spinning || !allPaid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {spinning ? "Spinning..." : "Pick Winner"}
      </button>
      <p className="text-sm text-gray-500 mt-2">
        {!allPaid && "All members must pay to start poll"}
      </p>

      <div className="relative mt-6 flex justify-center">
        <div
          className={`w-64 h-64 rounded-full border-4 border-green-400 shadow-inner flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 transition-all ${
            spinning ? "animate-spin-slow" : ""
          }`}
        >
          <div className="text-center">
            {winner ? (
              <p className="text-3xl font-bold text-green-700 animate-bounce">
                🎉 {winner.name} 🎉
              </p>
            ) : (
              <p className="text-xl text-gray-600">
                {spinning ? displayName : "Waiting..."}
              </p>
            )}
          </div>
        </div>
      </div>

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
