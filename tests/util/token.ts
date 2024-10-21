import * as anchor from '@coral-xyz/anchor'
import { Account, getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { Connection, PublicKey, Signer } from '@solana/web3.js'
import { getConnection } from './provider';
import { getKeypair, getPayer } from './wallet';
import { getAssets } from '../data';

export async function getTokenAccountBalance(connection: Connection, tokenAccount: PublicKey) {
   const r = await  connection.getTokenAccountBalance(tokenAccount)
   console.log('token account balance ', r)
}

export async function mintTokens(mint: PublicKey, payer: Signer , tokenAccount: PublicKey, authority: PublicKey, amount: number, connection: Connection): Promise<any> {
    const r =  await mintTo(connection, payer, mint, tokenAccount, authority, amount)
    return r
} 
export async function getTokenAccount(mint: PublicKey, payer: Signer ,owner: PublicKey,  connection: Connection): Promise<Account> {
    try {
        return await getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);
    } catch(e) {
        console.error(e)
    }
}

export async function getAccountInfo(tokenAccount: PublicKey,) {
    const r = await getAccount(getConnection(),tokenAccount)
    console.log('getAccountInfo ->> ', r)
}

export async function getMintInfo(mintAccount: PublicKey) {
    const r = await getMint(getConnection(),mintAccount)
    console.log('getMintInfo ->> ', r)
    return r
}


// (async () => {
//     try {
//         const connection = getConnection();
//         const mint = getKeypair(getAssets()[0].secret)
//         const signer =  getPayer();
//         const tokenAccount = getTokenAccount(mint.publicKey, signer, signer.publicKey, connection);
//         const tokenAccountAddress =  (await tokenAccount).address
//         const authority = signer.publicKey;
//         const signature = await mintTokens(mint.publicKey, signer, tokenAccountAddress , authority, 100000000000, connection)
//         await connection.confirmTransaction(signature, 'finalized');
//         await getMintInfo(mint.publicKey)
//         await getTokenAccountBalance(connection, tokenAccountAddress)
//         } catch(e) {
//             console.log(e)
//         }
// })();