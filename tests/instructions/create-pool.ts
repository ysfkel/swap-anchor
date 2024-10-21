import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { SwapProgram } from '../../target/types/swap_program'

export async function createPool(
    program:  anchor.Program<SwapProgram>,
    payer: Keypair,
    poolAddress: PublicKey
) {
   
    try {
        const r =  await program.methods.createPool()
        .accounts({
            pool: poolAddress,
            payer: payer.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        })
        .signers([payer])
        .rpc()
    
        console.log('pool created ', r)
    } catch(e) {
        console.error(e)
    }
}