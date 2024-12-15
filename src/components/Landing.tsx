import React from 'react';
import { Logo } from './Logo';
import { WalletConnect } from './WalletConnect';

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useLucid } from '../context/LucidProvider';

interface LandingProps {
  onEnterMarketplace: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterMarketplace }) => {
  const { address } = useLucid();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="flex items-center justify-between px-8 py-4">
          <Logo />
          <WalletConnect />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-[140px]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to 3D Art Marketplace
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Discover, collect, and trade unique 3D art NFTs on Cardano
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <SparklesIcon className="w-12 h-12 text-blue-400" />,
                title: 'Premium 3D Models',
                description: 'High-quality 3D assets ready for your projects',
              },
              {
                icon: <SparklesIcon className="w-12 h-12 text-purple-400" />,
                title: 'Secure Trading',
                description: 'Built on Cardano blockchain',
              },
              {
                icon: <SparklesIcon className="w-12 h-12 text-pink-400" />,
                title: 'Creator Community',
                description: 'Join the 3D art revolution',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 
                                         transform hover:scale-105 transition-all duration-300
                                         hover:border-blue-500/50"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onEnterMarketplace}
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              Enter Marketplace
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {!address && (
            <p className="mt-4 text-gray-400 text-sm">
              Connect your wallet to start trading
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
