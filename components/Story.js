import React from 'react';

function Story({ img, username }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          className="h-16 w-16 rounded-full border-4 border-gradient-to-r from-pink-400 via-red-500 to-yellow-500 object-cover"
          src={img}
          alt={username}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 border-4 border-transparent absolute"></div>
        </div>
      </div>
      <p className="text-sm font-semibold mt-2 text-center text-gray-800 truncate">{username}</p>
    </div>
  );
}

export default Story;


