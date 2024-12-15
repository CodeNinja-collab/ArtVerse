import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-45 animate-pulse-slow"></div>
        <div className="absolute inset-2 bg-gray-900 rounded-lg transform -rotate-45"></div>
        <div className="absolute inset-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">3D</span>
        </div>
      </div>
      <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        ArtVerse
      </span>
    </div>
  );
};
