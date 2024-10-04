
import { Connection, Keypair } from "@solana/web3.js"
import { AnchorProvider, Wallet } from "@coral-xyz/anchor"
 
export const getConnection = ():Connection => {
    return new Connection('https://api.devnet.solana.com', 'confirmed')
}

export const getProvider = (connection: Connection, wallet: Wallet): AnchorProvider => {
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'confirmed',
    })
    return provider
}