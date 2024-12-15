// src/components/Marketplace.tsx
import { encode } from 'cbor-x';
import { fromText } from 'lucid-cardano';
import React, { useEffect, useState } from 'react';
import { useLucid } from '../context/LucidProvider';
import { mockListings } from '../mocks/3dArtListings';
import { NFTListing } from '../types/marketplace';
import { WalletConnect } from './WalletConnect';

const Marketplace: React.FC = () => {
  const { lucid, address } = useLucid();
  const [listings, setListings] = useState<NFTListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    NFTListing['category'] | 'all'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [qualityFilter, setQualityFilter] = useState<
    NFTListing['rarity'] | 'all'
  >('all');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Simulate API call with mock data
        setListings(mockListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesCategory =
      selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesQuality =
      qualityFilter === 'all' || listing.rarity === qualityFilter;
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesQuality && matchesSearch;
  });

  const mintNFT = async (listing: NFTListing) => {
    if (!lucid || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setMinting(true);

      // Tạo Policy Script an toàn hơn
      const mintingPolicy = lucid.utils.nativeScriptFromJson({
        type: 'all',
        scripts: [
          {
            type: 'sig',
            keyHash:
              lucid.utils.getAddressDetails(address).paymentCredential?.hash,
          },
        ],
      });

      const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

      // Chuyển đổi tên asset sang hex sử dụng Lucid
      const assetName = fromText(listing.name);
      const assetId = `${policyId}${assetName}`;

      // Metadata CIP-25
      const metadata = {
        [policyId]: {
          [assetName]: {
            name: listing.name,
            description: listing.description,
            image: listing.image,
            mediaType: 'image/jpg',
            files: listing.fileFormats,
            properties: {
              category: listing.category,
              rarity: listing.rarity,
              polygonCount: listing.polygonCount,
              software: listing.software,
              dimensions: listing.dimensions,
              textureResolution: listing.textureResolution,
              rigged: listing.rigged,
              animated: listing.animated,
              artist: listing.artist,
            },
          },
        },
      };

      // Build transaction
      const tx = await lucid
        .newTx()
        .attachMintingPolicy(mintingPolicy)
        .mintAssets({ [assetId]: 1n })
        .payToAddress(address, { [assetId]: 1n })
        .attachMetadata(721, encode(JSON.stringify(metadata)))
        .complete();

      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      console.log('Minted NFT:', txHash);
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Error details:', error);
      alert('Failed to mint NFT: ' + (error as Error).message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-2xl font-bold text-white">3D Art Marketplace</h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <input
                type="search"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white w-64"
              />
              {address && (
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  Upload Model
                </button>
              )}
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="pt-[100px] flex">
        {/* Sidebar */}
        <div className="fixed left-0 w-72 h-[calc(100vh-73px)] bg-gray-800 p-6 border-r border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="text-white mb-2 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value as NFTListing['category'] | 'all'
                )
              }
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            >
              <option value="all">All Categories</option>
              <option value="3D Models">3D Models</option>
              <option value="Animations">Animations</option>
              <option value="Environments">Environments</option>
              <option value="Characters">Characters</option>
              <option value="Props">Props</option>
            </select>
          </div>

          {/* Quality Filter */}
          <div className="mb-6">
            <label className="text-white mb-2 block">Quality</label>
            <select
              value={qualityFilter}
              onChange={(e) =>
                setQualityFilter(e.target.value as NFTListing['rarity'] | 'all')
              }
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            >
              <option value="all">All Qualities</option>
              <option value="Standard">Standard</option>
              <option value="Professional">Professional</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-72 w-full p-8">
          {/* Grid View */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-gray-800 rounded-xl p-4 hover:transform hover:scale-105 transition-all"
                >
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {listing.name}
                    </h3>
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {listing.rarity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {listing.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.fileFormats.map((format) => (
                      <span
                        key={format}
                        className="px-2 py-1 bg-gray-700 text-sm text-gray-300 rounded"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.software.map((sw) => (
                      <span
                        key={sw}
                        className="px-2 py-1 bg-gray-700 text-sm text-gray-300 rounded"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mb-4">
                    <p>Polygon Count: {listing.polygonCount}</p>
                    <p>Resolution: {listing.textureResolution}</p>
                    {listing.rigged && <p>✓ Rigged</p>}
                    {listing.animated && <p>✓ Animated</p>}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-bold">
                        {listing.price} ADA
                      </span>
                      <p className="text-sm text-gray-400">
                        Artist: {listing.artist}
                      </p>
                    </div>
                    <button
                      onClick={() => mintNFT(listing)}
                      disabled={minting || !address}
                      className={`px-4 py-2 rounded-lg ${
                        !address
                          ? 'bg-gray-600 cursor-not-allowed'
                          : minting
                          ? 'bg-blue-400 cursor-wait'
                          : 'bg-blue-600 hover:bg-blue-500'
                      } text-white`}
                    >
                      {minting ? 'Minting...' : 'Mint NFT'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
