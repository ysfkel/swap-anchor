
import { Keypair } from "@solana/web3.js"
import { secretKey } from "../keys"
import { Wallet } from "@coral-xyz/anchor"
import { KeypairSigner } from "@metaplex-foundation/umi"
import * as anchor from "@coral-xyz/anchor";

export const getPayer = (): Keypair => {
    return Keypair.fromSecretKey(Uint8Array.from(secretKey))
}

export const getKeypair = (secret: Uint8Array): Keypair => {
    return Keypair.fromSecretKey(secret)
}

export const getWallet = (keypair: Keypair) => {
    return new Wallet(keypair)
}

export function getSignerByCluster(cluster: string): Keypair{

    if(cluster === 'devnet') {
        const k = Keypair.fromSecretKey(Uint8Array.from(secretKey))
        return k
    } else  {
        const provider = anchor.AnchorProvider.env();
         const payer = (provider.wallet as anchor.Wallet).payer;
         return payer
    } 
}