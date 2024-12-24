use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct PoolConfig {
    /// bump to identify the PDA
    pub bump: u8,
    /// enables / disables new pool creation
    pub disable_create_pool: bool,
    /// Config index
    pub index: u16,
    /// The trade fee, denominated in hundredths of a bip (10^-6)
    pub trade_fee_rate: u64,
    /// The protocol fee
    pub protocol_fee_rate: u64,
    /// Fee for create a new pool
    pub create_pool_fee: u64,
    /// The fund fee, denominated in hundredths of a bip (10^-6)
    pub fund_fee_rate: u64,
    /// Fee for create a new pool
    pub protocol_owner: Pubkey,
    /// Address of the fund fee owner
    pub fund_owner: Pubkey,
    /// padding
    pub padding: [u64; 16],
}

impl PoolConfig {
    pub const SPACE: usize = 8 + 1 + 1 + 2 + (8 * 4) + (32 * 2) + (8 * 16);
}
