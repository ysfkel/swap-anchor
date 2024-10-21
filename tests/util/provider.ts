
import { Connection, Keypair } from "@solana/web3.js"
import { AnchorProvider, Wallet } from "@coral-xyz/anchor"
 import * as anchor from "@coral-xyz/anchor";

export const getConnection = ():Connection => {
    const provider = anchor.AnchorProvider.env();
    return new Connection(provider.connection.rpcEndpoint, 'confirmed')
}

export const getProvider = (connection: Connection, wallet: Wallet): AnchorProvider => {
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'confirmed',
    })
    return provider
}

export const getClusterFromRpcEndpoint = (rpcEndpoint: string): string => {

    if (rpcEndpoint.includes("localhost") || rpcEndpoint.includes("127.0.0.1")) { 
        return 'localnet'
    } else if (rpcEndpoint.includes("devnet")) {
        return 'devnet'
    }
}