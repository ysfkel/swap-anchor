use anchor_lang::{prelude::*, system_program};
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};
use std::ops::{Add, Div, Mul};

use crate::error::SwapProgramError;

/// The `LiquidityPool` state - the inner data of the program-derived address
/// that will be our Liquidity Pool
///

#[account]
pub struct LiquidityPool {
    pub assets: Vec<Pubkey>, // each public key is  the mint our pool supports
    pub bump: u8,
}

impl LiquidityPool {
    /// The Liquidity Pool's seed prefix, and in this case the only seed used to
    /// derive it's program-derived address
    pub const SEED_PREFIX: &'static str = "liquidity_pool";

    /// Anchor discriminator + Vec (empty) + u8
    pub const SPACE: usize = 8 + 4 + 1;

    /// Creates a new `LiquidityPool1 state
    pub fn new(bump: u8) -> Self {
        Self {
            assets: vec![],
            bump,
        }
    }
}

/// Trait used to wrap functionality for the Liquidity Pool that can be called
/// on the Liquidity Pool account as it's pulled from an Anchor Context, ie.
/// `Account<'_, LiquidityPool>`
///
pub trait LiquidityPoolAccount<'info> {
    fn check_asset_key(&self, key: &Pubkey) -> Result<()>;
    fn add_asset(
        &mut self,
        key: Pubkey,
        payer: &Signer<'info>,
        system_program: &Program<'info, System>,
    ) -> Result<()>;
    fn realloc(
        &mut self,
        space_to_add: usize,
        payer: &Signer<'info>,
        system_program: &Program<'info, System>,
    ) -> Result<()>;

    fn fund(
        &mut self,
        deposit: &(
            Account<'info, Mint>,
            &Account<'info, TokenAccount>,
            &Account<'info, TokenAccount>,
            u64,
        ),
        authority: &Signer<'info>,
        system_program: &Program<'info, System>,
        token_program: &Program<'info, Token>,
    ) -> Result<()>;

    fn process_swap(
        &mut self,
        receice: (
            &Account<'info, Mint>,
            &Account<'info, TokenAccount>,
            &Account<'info, TokenAccount>,
            u64,
        ),
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
    ) -> Result<()>;
}

impl<'info> LiquidityPoolAccount<'info> for Account<'info, LiquidityPool> {
    
    /// Validates an asset's key is present in the Liquidity Pool's list of mint
    /// addresses, and throws an error if it is not

}
