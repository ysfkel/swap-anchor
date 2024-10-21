import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { SwapProgram } from '../../target/types/swap_program'


export async function add_pair(
    authority: PublicKey,
    payer: Keypair,
    token0Mint: PublicKey,
    token1Mint: PublicKey,
    token0Account: PublicKey,
    token1Account: PublicKey,
    lpMint: PublicKey,
    program: anchor.Program<SwapProgram>,
    
) {
    const context = {
        authority,
        token0Mint,
        token1Mint,
        token0Account,
        token1Account,
        lpMint,
        signer: payer.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        tokenProgra: anchor.utils.token.TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
    }
    const r = await program.methods.addPair()
    .accounts(context).rpc()

    console.log('pair added ', r)
}