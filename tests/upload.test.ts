
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createV1,  mplTokenMetadata, TokenStandard } from '@metaplex-foundation/mpl-token-metadata' 
import { createGenericFile, createSignerFromKeypair, generateSigner, KeypairSigner, percentAmount, publicKey, signerIdentity, Umi } from '@metaplex-foundation/umi';
import {irysUploader} from '@metaplex-foundation/umi-uploader-irys'
import { Connection , Keypair, LAMPORTS_PER_SOL, PublicKey as Web3PublicKey} from '@solana/web3.js';
import fs from 'fs' 
import path from 'path';
import * as anchor from "@coral-xyz/anchor";
import type { PublicKey } from '@metaplex-foundation/umi-public-keys';
import { assets } from './data';
import { secretKey } from './keys'

export function getSigner(umi: Umi): KeypairSigner{
  const k = Keypair.fromSecretKey(Uint8Array.from(secretKey))
  const solanaPublicKeyBase58 = k.publicKey.toBase58();
  const umiPKey: PublicKey = publicKey(solanaPublicKeyBase58);
  const kps = createSignerFromKeypair(umi, {
    publicKey: umiPKey,
    secretKey: k.secretKey
  });
  return kps
}

function usePlugins(umi:Umi, kps: KeypairSigner): Umi{
  umi.use(mplTokenMetadata())
  umi.use(irysUploader())
  umi.use(signerIdentity(kps));
  return umi
}

function _createUmi(): Umi {
  const provider = anchor.AnchorProvider.env();
  const connection = new Connection("https://api.devnet.solana.com");
  const umi = createUmi(connection);
   return umi
 }

 function initUmi(): Umi {
  let umi = _createUmi()
  const signer = getSigner(umi);
  umi = usePlugins(umi, signer)
   return umi
 }

 
 async function upload(filePath: string): Promise<Array<string>>  {
  const imagebuff = fs.readFileSync(filePath)
  const umi = initUmi()
  const genericFile = createGenericFile(imagebuff, filePath, { contentType: "image/png" });
  try {
    const imageUri = await umi.uploader.upload([genericFile]);
    return imageUri
  } catch (error) {
    console.error('Error during image upload:', error);
  }
 }

 async function uoloadMetadata() {
    const umi = initUmi() 
    for(let a of assets) {
      const image_uri =  await upload(a.imagePath) 
      const uri = await umi.uploader.uploadJson({
         name: a.name,
         symbol: a.symbol,
         describe: a.description,
         image: image_uri[0]
      })
      const mint = generateSigner(umi)
      const authority = getSigner(umi)
      const result = await createV1(umi, {
        mint,
        authority,
        uri,
        name: a.name,
        symbol: a.symbol,
        decimals: 9,
        sellerFeeBasisPoints: percentAmount(0),
        tokenStandard: TokenStandard.Fungible
      }).sendAndConfirm(umi)
      console.log(`mint secretKey ->>: ${mint.secretKey}`)
      console.log(`mint name: ${a.name} mint public key: ${mint.publicKey.toString()} `)
    }
 }
 
 
 (async () => {
  try {
    await uoloadMetadata();
    console.log('->> completed');
  } catch (error) {
    console.error('Error in test function:', error);
  }
})(); 


/*
uploaded tokens 
name: Cannon mint: 2yySMFSgMjqBLBkG3q4jqStuatpNSYW2zhmkA6EcVyqj
name: Cannon Ball mint: 3uJueG98BiWD1UtoF41keKP11YekfqU3a1pKF1uu527K
name: Compass mint: Fr9djZd3nfNWMfeZjv5esNqSEKskdikvAwqWChWaAxEm
name: Gold mint: 6pLSSw5Bqv4sD3zfbZJdv3oajwLoEPVF3z2gtTaf3LcA
*/