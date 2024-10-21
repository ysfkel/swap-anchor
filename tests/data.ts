
import { PublicKey } from '@solana/web3.js';
import  assetsData from './data/token-data-local-validator.json';
// import  assetsData from './data/token-data-devnet.json';

interface Asset {
    name: string
    symbol: string
    description: string
    imagePath: string
    imageName: string,
    secret: Uint8Array
    decimals: number,
    quantity: number,
    address: PublicKey,
}

export const getAssets = () => {
  const _assets: Asset[] = assetsData.assets.map((item: any) => ({
    name: item.name,
    symbol: item.symbol,
    description: item.description,
    imagePath: item.imagePath,
    imageName: item.imageName,
    decimals: item.decimals as number,
    quantity: item.quantity as number,
    address: new PublicKey(item.address as string),
    secret:  new Uint8Array(item.secret)
  }));

  return _assets
}
