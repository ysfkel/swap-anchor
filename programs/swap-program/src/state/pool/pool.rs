use super::constants::*;
use super::traits::*;
use super::types::*;
use crate::error::SwapProgramError;
use anchor_lang::prelude::*;
use anchor_spl::token_interface::Mint;
use std::ops::{BitAnd, BitOr, BitXor};
/// Seed to derive account address and signature

#[account]
#[derive(Default, Debug)]
pub struct Pool {
    pub auth_bump: u8,
    /// Bitwise representation of the state of the pool
    /// bit0, 1: disable deposit(vaule is 1), 0: normal
    /// bit1, 1: disable withdraw(vaule is 2), 0: normal
    /// bit2, 1: disable swap(vaule is 4), 0: normal
    pub status: u8,

    pub lp_mint_decimals: u8,

    pub token_0_mint_decimals: u8,

    pub token_1_mint_decimals: u8,

    /// True circulating supply without burns and lock ups
    pub lp_supply: u64,

    pub protocol_fees_token_0: u64,
    pub protocol_fees_token_1: u64,

    pub fund_fees_token_0: u64,
    pub fund_fees_token_1: u64,

    pub open_time: u64,

    pub recent_epoch: u64,

    pub amm_config: Pubkey,

    pub pool_creator: Pubkey,

    pub token_0_vault: Pubkey,

    pub token_1_vault: Pubkey,

    pub lp_mint: Pubkey,

    pub token_0_mint: Pubkey,

    pub token_1_mint: Pubkey,

    pub token_0_program: Pubkey,

    pub token_1_program: Pubkey,

    pub observation_key: Pubkey,

    pub padding: [u64; 31],
}
impl Pool {
    fn new(
        &mut self,
        auth_bump: u8,
        lp_supply: u64,
        open_time: u64,
        pool_creator: Pubkey,
        amm_config: Pubkey,
        token_0_vault: Pubkey,
        token_1_vault: Pubkey,
        token_0_mint: &InterfaceAccount<Mint>,
        token_1_mint: &InterfaceAccount<Mint>,
        lp_mint: &InterfaceAccount<Mint>,
        observation_key: Pubkey,
    ) {
        self.amm_config = amm_config.key();
        self.pool_creator = pool_creator.key();
        self.token_0_vault = token_0_vault;
        self.token_1_vault = token_1_vault;
        self.lp_mint = lp_mint.key();
        self.token_0_mint = token_0_mint.key();
        self.token_1_mint = token_1_mint.key();
        self.token_0_program = *token_0_mint.to_account_info().owner;
        self.token_1_program = *token_1_mint.to_account_info().owner;
        self.observation_key = observation_key;
        self.auth_bump = auth_bump;
        self.lp_mint_decimals = lp_mint.decimals;
        self.token_0_mint_decimals = token_0_mint.decimals;
        self.token_1_mint_decimals = token_1_mint.decimals;
        self.lp_supply = lp_supply;
        self.protocol_fees_token_0 = 0;
        self.protocol_fees_token_1 = 0;
        self.fund_fees_token_0 = 0;
        self.fund_fees_token_1 = 0;
        self.open_time = open_time;
        self.recent_epoch = Clock::get().unwrap().epoch;
        self.padding = [0u64; 31];
    }

    pub fn get_operation_status(&self, pool_operation: PoolOperation) -> bool {
        let status = u8::from(1) << (pool_operation as u8);
        self.status.bitand(status) == 0
    }

    pub fn get_net_vault_amount(&self, vault_0: u64, vault_1: u64) -> Result<(u64, u64)> {
        let token_0_amount = vault_0
            .checked_sub(self.fund_fees_token_0 + self.fund_fees_token_0)
            .ok_or(SwapProgramError::InsufficientPoolBalance)?;

        let token_1_amount = vault_1
            .checked_sub(self.fund_fees_token_1 + self.fund_fees_token_1)
            .ok_or(SwapProgramError::InsufficientPoolBalance)?;

        Ok((token_0_amount, token_1_amount))
    }

    /// calculates the current pool price
    pub fn get_pool_price(&self, vault_0: u64, vault_1: u64) -> Result<(u128, u128)> {
        let (token_0_amount, token_1_amount) = self.get_net_vault_amount(vault_0, vault_1)?;

        if token_0_amount == 0 {
            return Err(SwapProgramError::InsufficientPoolBalance.into());
        }

        if token_1_amount == 0 {
            return Err(SwapProgramError::InsufficientPoolBalance.into());
        }

        Ok((
            token_1_amount as u128 * Q32 as u128 / token_0_amount as u128,
            token_0_amount as u128 * Q32 as u128 / token_1_amount as u128,
        ))
    }
}

impl Pool {
    pub const SPACE: usize = 8 + (1 * 5) + (8 * 7) + (32 * 10) + (8 * 31);
}

impl IPoolAdmin for Pool {
    /// a sing bite is used to represent all pool operations for storage efficiency
    fn set_operation_statuses(&mut self, status: u8) {
        self.status = status;
    }

    fn set_operation_status(&mut self, pool_operation: PoolOperation, status: PoolOperationStatus) {
        let pool_operation_bit = u8::from(1) << (pool_operation as u8);

        match status {
            PoolOperationStatus::Disable => {
                self.status = self.status.bitor(pool_operation_bit);
            }
            PoolOperationStatus::Enable => {
                let mask = u8::from(255).bitxor(pool_operation_bit);
                self.status = self.status.bitand(mask);
            }
        }
    }
}
