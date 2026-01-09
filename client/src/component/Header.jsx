import React, { useContext } from 'react';
import { NameContext } from '../context/NameContext';

export default ({ typers }) => {
  const { username } = useContext(NameContext);
  
  return (
    // PARENT: WhatsApp Green Background
    <div className="w-full h-16 bg-[#008069] flex justify-between items-center rounded-xl px-4 text-white">

      {/* LEFT SIDE: Image + Text Block */}
      <div className="flex items-center gap-3">

        {/* Profile Image */}
        <img
          src="vite.svg"
          className="w-10 h-10 rounded-full bg-gray-300"
        />

        {/* Text Block (Flex-col to stack Name and Typing) */}
        <div className="flex flex-col">
          <h3 className="font-bold text-base leading-none">Group name</h3>

          {/* WAHA KA MISSING PART */}
          {typers.length ? 
            (<h5 className="text-xs text-green-100 mt-1 animate-pulse">
              {typers.join(',')} is typing...
            </h5>)
            : ''
          }

        </div>

      </div>

      {/* RIGHT SIDE: My Name */}
      <div className="text-sm text-gray-500 mr-8">
        Signed in as{' '}
        <span className="font-medium text-[#303030] capitalize">
          {username}
        </span>
      </div>

    </div>
  )
}

