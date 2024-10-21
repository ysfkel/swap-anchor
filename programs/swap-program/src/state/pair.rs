use anchor_lang::prelude::*;

#[account(zero_copy(unsafe))]
#[repr(packed)]
#[derive(Default, Debug)]
pub struct Pair {
    /// Token mint for LP
    pub lp_mint: Pubkey,
    /// Token mint for token 0
    pub token_0_mint: Pubkey,
    /// Token mint for token 1
    pub token_1_mint: Pubkey,
    /// bump
    pub bump: u8,
    /// padding for future updates
    pub padding: [u64; 31],
}

impl Pair {
    pub const SPACE: usize = 8 + (3 * 32) + 1;
    pub fn initialize(
        &mut self,
        lp_mint: Pubkey,
        token_0_mint: Pubkey,
        token_1_mint: Pubkey,
        bump: u8,
    ) {
        self.lp_mint = lp_mint;
        self.token_0_mint = token_0_mint;
        self.token_1_mint = token_1_mint;
        self.bump = bump;
        self.padding = [0u64; 31];
    }
}
