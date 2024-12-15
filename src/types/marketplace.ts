import { UTxO } from 'lucid-cardano';

export type NFTCategory =
  | 'Pixel Art'
  | 'Game Assets'
  | 'Collectibles'
  | 'Virtual Land'
  | 'Avatars';

export interface NFTListing {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category:
    | '3D Models'
    | 'Animations'
    | 'Environments'
    | 'Characters'
    | 'Props';
  rarity: 'Standard' | 'Professional' | 'Premium';
  fileFormats: string[];
  polygonCount: string;
  software: string[];
  dimensions: string;
  textureResolution: string;
  rigged?: boolean;
  animated?: boolean;
  artist: string;
  utxo: any;
}
export interface TokenListing {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  seller: string;
  utxo: UTxO;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  category: NFTCategory;
  rarity: string;
}

export type ListingType = 'featured' | 'regular' | 'NFT';
