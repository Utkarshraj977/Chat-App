import React, { useState, useContext } from "react";
import { NameContext } from "../context/NameContext";

const MainComponent = ({ socket, message, setMessage }) => {

  const [showNamePopup, setShowNamePopup] = useState(true);
  const [inputName, setInputName] = useState("");
  const { username, setUserName } = useContext(NameContext);
  const [text, setText] = useState('');

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUserName(inputName);         // update context
    setShowNamePopup(false);        // close popup
    socket.current.emit('joinRoom', inputName)
  };

  function formatTime(ts) {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`;
  }

  return (
    // MAIN CONTAINER: Relative position to allow the popup to float over it
    <div className="relative w-full h-full flex flex-col">

      {/* 1. POPUP OVERLAY (Only visible when showNamePopup is true) */}
      {showNamePopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#00a884] rounded-xl shadow-2xl max-w-md p-6 w-full mx-4 border-t-4 border-green-600">
            <h1 className="text-xl font-semibold text-gray-800">Enter your name</h1>
            <form onSubmit={handleNameSubmit} className="mt-4">
              <input
                autoFocus
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-600"
                placeholder="Your Name..."
              />

              <button
                type="submit"
                className="block ml-auto mt-4 px-6 py-2 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white font-medium"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CHAT AREA WITH WHATSAPP BACKGROUND */}
      {!showNamePopup && (<div className="flex-1 overflow-y-auto p-4 space-y-2
        bg-[#efeae2] 
        bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] 
        bg-repeat opacity-100">

        {message.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-3 py-1 rounded-lg text-sm shadow-sm relative ${msg.sender === username
                ? "bg-[#d9fdd3] rounded-tr-none" // WhatsApp Green for me
                : "bg-white rounded-tl-none"     // White for others
                }`}
            >
              <p className="text-gray-900 font-semibold text-sm pb-1">
                {msg.text}
              </p>
              <p className="text-[10px] text-gray-500 text-right italic">
                by  {msg.sender===username ? 'you' : msg.sender}
              </p>
              <div className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                {formatTime(msg.ts)}
              </div>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default MainComponent;