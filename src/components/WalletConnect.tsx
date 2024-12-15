import React from 'react';
import { useLucid } from '../context/LucidProvider';

import { WalletIcon } from '@heroicons/react/24/solid';

export const WalletConnect: React.FC = () => {
  const { connectWallet, address } = useLucid();

  return (
    <div className="flex items-center justify-end p-4">
      {address ? (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-[2px] rounded-xl">
          <div className="bg-gray-900 px-6 py-3 rounded-xl flex items-center gap-2">
            <WalletIcon className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {address.slice(0, 8)}...{address.slice(-8)}
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="group relative inline-flex items-center gap-2 px-6 py-3 font-medium text-white"
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity"></span>
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></span>
          <span className="relative flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Connect Wallet
          </span>
        </button>
      )}
    </div>
  );
};
