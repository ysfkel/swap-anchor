use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct AmmAdmin {
    /// bump to identify the PDA
    pub bump: u8,
    /// admin key
    pub admin: Pubkey,
    /// padding
    pub padding: [u64; 16],
}

impl AmmAdmin {
    pub const SPACE: usize = 8 + 1 + 32 + (8 * 16);
}