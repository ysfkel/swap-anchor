import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SwapProgram } from "../../target/types/swap_program";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {getAssets} from '../data';
import { createPool } from "../instructions/create-pool";
import { getAccountInfo, getMintInfo, getTokenAccount, getTokenAccountBalance, mintTokens } from "../util/token";
import { getKeypair, getSignerByCluster } from "../util/wallet";
import { getClusterFromRpcEndpoint } from "../util/provider";
import { add_pair } from "../instructions/add_pair";
import { Account } from "@solana/spl-token";
describe("swap-program", () => {
  const LIQUIDITY_POOL_SEED_PREFIX = "liquidity_pool";
  const AUTH_SEED = "AUTH_SEED";
  const LP_SEED = "LP_SEED";
  // Configure the client to use the local cluster.
  const program = anchor.workspace.SwapProgram as Program<SwapProgram>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer =  getSignerByCluster(getClusterFromRpcEndpoint(provider.connection.rpcEndpoint));

  console.log('payer public ->>', payer.publicKey)
  const { connection } = provider;
  
  let poolAddress; 
  try {
    poolAddress = PublicKey.findProgramAddressSync(
      [Buffer.from(LIQUIDITY_POOL_SEED_PREFIX)],
       program.programId
    )[0];
  
    console.log('poolAddress ',poolAddress)
  } catch(e) {
      console.log('error pooladdress ', e)
  }

    
  let authority; 
  try {
   authority = PublicKey.findProgramAddressSync(
      [Buffer.from(AUTH_SEED)],
       program.programId
    )[0];
  
    console.log('authority ',authority)
  } catch(e) {
      console.log('error authority ', e)
  }
  
 
  const assets = getAssets();
   
   let  programInitialized = false
   before('Check if liquidity pool exists', async () => {
     try {
      let poolAccountInfo = await provider.connection.getAccountInfo(poolAddress, 'confirmed');
      console.log('poolAccountInfo ->> ',poolAccountInfo)
      
      console.log('poolAccountInfo ->> ',poolAccountInfo)
      if(poolAccountInfo!=undefined && poolAccountInfo.lamports !=0) {
         console.log('Pool already initialized!')
         console.log(`Address: ${poolAddress.toBase58()}`)
         programInitialized = true
      } else {
         console.log('->> pda does not exists ')
      }
     }catch(e) {
      console.error(e)
     }
   })

   it('test createPool', () => {
      if(!programInitialized) {
         console.log('Creating pool...')
        createPool(program, payer, poolAddress)
         programInitialized = true
      }
   })

   it('fund pool', async () => {
    for(let asset of assets) {
     
        const tokenAccount = await getTokenAccount(asset.address, payer, payer.publicKey, connection);
      
        await mintTokens(asset.address, payer, tokenAccount.address, payer.publicKey, 90000000000, connection)
        await getTokenAccountBalance(connection, tokenAccount.address)

        // !todo continue fund test
     }
 
   })

   it('add asset', async () => {
      const asset1 = assets[0]
      const tokenAccount1 =  await getTokenAccount(asset1.address, payer, payer.publicKey, connection);

      const asset2 = assets[1]
      const tokenAccount2 =  await getTokenAccount(asset2.address, payer, payer.publicKey, connection);

      const { token0, token1} = orderA(tokenAccount1, tokenAccount2 )

   let lp_mint: PublicKey; 
    try {
        lp_mint = PublicKey.findProgramAddressSync(
        [Buffer.from(LP_SEED), token0.mint.toBuffer(), token1.mint.toBuffer()],
        program.programId
        )[0];
    
        console.log('lp_mint ',lp_mint)
    } catch(e) {
        console.log('error pooladdress ', e)
    }

    let lp_account =  anchor.utils.token.associatedAddress({
        mint: lp_mint,
        owner: payer.publicKey
    })
 
      await add_pair(
         authority,
         payer,
         token0.mint,
         token1.mint,
          token0.address,
          token1.address,
         lp_mint,
         lp_account,
         program
      )

   })
});

function orderA(a: Account, b: Account) : {token0: Account,token1: Account} {
   if (a.mint > b.mint) {
      return {
          token0: b,
          token1: a
      }
   } else {
       return {
           token0: a,
           token1: b
       }
   }
}


function order(a: PublicKey, b: PublicKey) : {token0Mint: PublicKey,token1Mint: PublicKey} {
    if (a > b) {
       return {
           token0Mint: b,
           token1Mint: a
       }
    } else {
        return {
            token0Mint: a,
            token1Mint: b
        }
    }
}