import React, { useEffect, useRef } from 'react';
import { useState, useContext } from 'react';
import { NameContext } from "../context/NameContext";

export default ({ socket, message, setMessage }) => {
  const { username, setUserName } = useContext(NameContext);
  const [txt, setTxt] = useState('')
  const timer = useRef(null)

  useEffect(() => {
    if (txt) {
      socket.current.emit('typing', username);
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      socket.current.emit('stopTyping', username);
    }, 1000)

    return () => {
      clearTimeout(timer.current)
    }
  }, [txt, username])

  const handletextsubmit = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function sendMessage() {
    const t = txt.trim();
    if (!t) return;

    const msg = {
      id: Date.now(),
      sender: username,
      text: t,
      ts: Date.now()
    };
    setMessage((m) => [...m, msg]);
    socket.current.emit('chatMessage', msg)
    setTxt('')
  }

  return (
    // FOOTER CONTAINER
    //!showNamePopup &&
    <>
      <div className="w-full bg-[#f0f2f5] p-2 flex justify-center items-end min-h-[80px]">

        <div className="w-[80%] bg-white rounded-2xl flex items-end p-2 border border-gray-300 shadow-sm">

          {/* TEXTAREA (Badi height ke liye) */}
          <textarea
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm resize-none h-10 max-h-24 py-2"
            placeholder="Type a message..."
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            onKeyDown={handletextsubmit}
          />

          {/* SEND BUTTON (Andar hi chipka hua) */}
          <button
            className="mb-2 text-[#008069] font-bold text-sm ml-2"
            onClick={sendMessage}
          >
            SEND
          </button>

        </div>

      </div>
    </>
  )
}