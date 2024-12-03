solana airdrop 10 5GUiAxkPsKNj4bCGK2TMYvxi3jGifrbU5TpUyvDU1B6M --url https://api.devnet.solana.com

solana balance  5GUiAxkPsKNj4bCGK2TMYvxi3jGifrbU5TpUyvDU1B6M --url https://api.devnet.solana.com


clone metaplex token matadata to solana-test-validator 
solana-test-validator --clone-upgradeable-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s --url https://api.mainnet-beta.solana.com


to force new programid 
1. generate new program keypair 
solana-keygen new --outfile target/deploy/swap_program-keypair.json -f

2. anchor deploy 



----
https://solana.com/docs/intro/installation

solana config set --url mainnet-beta
solana config set --url devnet
solana config set --url localhost
solana config set --url testnet

You can also use the following short options:

solana config set -um    # For mainnet-beta
solana config set -ud    # For devnet
solana config set -ul    # For localhost
solana config set -ut    # For testnet