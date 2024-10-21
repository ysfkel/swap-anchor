solana airdrop 10 5GUiAxkPsKNj4bCGK2TMYvxi3jGifrbU5TpUyvDU1B6M --url https://api.devnet.solana.com

solana balance  5GUiAxkPsKNj4bCGK2TMYvxi3jGifrbU5TpUyvDU1B6M --url https://api.devnet.solana.com


clone metaplex token matadata to solana-test-validator 
solana-test-validator --clone-upgradeable-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s --url https://api.mainnet-beta.solana.com


to force new programid 
1. generate new program keypair 
swap-program % solana-keygen new --outfile target/deploy/swap_program-keypair.json -f

2. anchor deploy 

