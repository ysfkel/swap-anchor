import * as anchor from "@coral-xyz/anchor";
import { Keypair,  SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getSignerByCluster } from "../util/wallet";
import { getClusterFromRpcEndpoint } from "../util/provider";
 

async function  storageAccount(){
    // Step 1: Create a new connection to the Solana cluster
// const connection = new Connection(web3.clusterApiUrl('devnet'), 'confirmed');
const provider = anchor.AnchorProvider.env();
const { connection } = provider;
// Step 2: Generate a new Keypair for the storage account
const storageAccount = Keypair.generate();

// Step 3: Generate a Keypair for the payer (wallet or the one funding the transaction)
const payer =  getSignerByCluster(getClusterFromRpcEndpoint(provider.connection.rpcEndpoint));
       // Step 4: Get the minimum rent-exempt balance for the account
    const space = 512; // The amount of space (in bytes) you need for your storage account
    const lamports = await connection.getMinimumBalanceForRentExemption(space);

    // Step 5: Create an instruction to allocate and create the storage account
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,        // The account funding the storage account creation
        newAccountPubkey: storageAccount.publicKey, // The storage account's public key
        lamports: lamports,                // The amount of lamports to fund the account with (for rent exemption)
        space: space,                      // The amount of space allocated for the account
        programId: SystemProgram.programId // Program responsible for this account (SystemProgram in this case)
    });

    // Step 6: Create and send the transaction
    const transaction = new Transaction().add(createAccountInstruction);

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [payer, storageAccount]);

    console.log("Storage account created with signature:", signature);
    console.log("Storage account public key:", storageAccount.publicKey.toBase58());

}

(async () => {
    await storageAccount();
})()