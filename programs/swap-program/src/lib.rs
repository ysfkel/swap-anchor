pub mod error;
pub mod instructions;
pub mod seeds;
pub mod state;
pub mod util;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("a1uJXdggmTJsbtLZBbTzoSNix7yD2uSaRULM2tqbCmH");

pub mod admin {
    use anchor_lang::prelude::declare_id;
    #[cfg(feature = "devnet")]
    declare_id!("a1uJXdggmTJsbtLZBbTzoSNix7yD2uSaRULM2tqbCmH");

    #[cfg(not(feature = "devnet"))]
    declare_id!("a1uJXdggmTJsbtLZBbTzoSNix7yD2uSaRULM2tqbCmH");
}


pub mod create_pool_tresury {
    use anchor_lang::prelude::declare_id;
    #[cfg(feature = "devnet")]
    declare_id!("G11FKBRaAkHAKuLCgLM6K6NUc9rTjPAznRCjZifrTQe2");
    #[cfg(not(feature = "devnet"))]
    declare_id!("DNXgeM9EiiaAbaWvwjHj9fQQLAX5ZsfHyvmYUNRAdNC8");
}

#[program]
pub mod swap_program {
    use super::*;

    /// Initialize the program by creating the liquidity pool
    pub fn create_pool(ctx: Context<CreatePool>) -> Result<()> {
        instructions::create_pool(ctx)
    }

    /// Provide liquidity to the pool by funding it with some asset
    pub fn fund_pool(ctx: Context<FundPool>, amount: u64) -> Result<()> {
        instructions::fund_pool(ctx, amount)
    }

    /// Swap assets using the DEX
    pub fn swap(ctx: Context<Swap>, amount_to_swap: u64) -> Result<()> {
        instructions::swap(ctx, amount_to_swap)
    }
}
