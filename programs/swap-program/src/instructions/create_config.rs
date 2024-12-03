use std::ops::{Deref, DerefMut};

use anchor_lang::{prelude::*, solana_program::address_lookup_table::instruction};
use crate::state::AmmConfig;
use crate::error::*;
use crate::seeds::AMM_CONFIG_SEED;


pub fn create_config(ctx: Context<CreateAmmConfig>,
    index: u16,
    trade_fee_rate: u64,
    protocol_fee_rate: u64,
    fund_fee_rate: u64,
    create_pool_fee: u64,
) -> Result<()> {
   let config: &mut AmmConfig = ctx.accounts.amm_config.deref_mut();
   
   config.bump = ctx.bumps.amm_config;
   config.disable_create_pool = false;
   config.index = index;
   config.trade_fee_rate = trade_fee_rate;
   config.protocol_fee_rate = protocol_fee_rate;
   config.fund_fee_rate = fund_fee_rate;
   config.protocol_owner = ctx.accounts.owner.key();
   config.fund_owner = ctx.accounts.owner.key();
   config.create_pool_fee = create_pool_fee;

   Ok(())
}

#[derive(Accounts)]
#[instruction(index: u16)]
pub struct CreateAmmConfig<'info>  {
    #[account(
        mut,
       address = crate::admin::id() @ SwapProgramError::InvalidOwner
    )]
     pub owner: Signer<'info>,
    
     #[account(
        init,
        seeds = [
            AMM_CONFIG_SEED,
            &index.to_be_bytes()
        ],
        bump, 
        payer = owner,
        space = AmmConfig::SPACE
     )]
     pub amm_config: Account<'info, AmmConfig>,

     system_program: Program<'info, System>
   
}