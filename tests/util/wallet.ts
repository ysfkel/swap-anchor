
import { Keypair } from "@solana/web3.js"
import { secretKey } from "../keys"
import { Wallet } from "@coral-xyz/anchor"

export const getPayer = (): Keypair => {
    return Keypair.fromSecretKey(Uint8Array.from(secretKey))
}

export const getKeypair = (secret: Uint8Array): Keypair => {
    return Keypair.fromSecretKey(secret)
}

export const getWallet = (keypair: Keypair) => {
    return new Wallet(keypair)
}