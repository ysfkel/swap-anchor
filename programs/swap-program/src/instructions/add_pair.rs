use crate::{
    seeds::{LP_SEED, PAIR_SEED},
    error::SwapProgramError::InvalidInputTokensMismatch,
    seeds::AUTH_SEED,
};
use anchor_lang::prelude::*;
use anchor_spl::{
    token_interface::{Mint,
        TokenAccount
    },
    token::{
    //TokenAccount,
    Token,
    
}};

pub fn add_pair(ctx: Context<AddPair>) -> Result<()> {


 

    Ok(())
}


#[derive(Accounts)]
pub struct AddPair<'info> {

    /// CHECK: pool vault and lp mint authority
    #[account(
        seeds=[AUTH_SEED],
        bump
    )]
    pub authority: UncheckedAccount<'info>,

    #[account(
    init,
    seeds = [LP_SEED,token_0_mint.key().as_ref(),token_1_mint.key().as_ref()],
    constraint = validate_order(token_0_mint.key(),token_1_mint.key()) @ InvalidInputTokensMismatch,
    bump,
    payer = signer,
    mint::authority = authority,
    mint::decimals = 9,
    mint::token_program = token_program,
   )]
    pub lp_mint: Box<InterfaceAccount<'info, Mint>>,

    //    #[account(
    //        seeds = [
    //         PAIR_SEED,

    //        ],
    //        bump
    //    )]
    //    pub pair: UncheckedAccount<'info>,

    //    #[account(
    //       mut,
    //       token::mint = lp_mint::
    //    )]
    pub token_0_mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(mut)]
    pub token_1_mint: Box<InterfaceAccount<'info, Mint>>,

    pub token_0_account: Box<InterfaceAccount<'info, TokenAccount>>,

    pub token_1_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}


fn validate_order(token_0: Pubkey, token_1: Pubkey) ->  bool {
      if token_0 > token_1 { 
          false
      } else { 
        true
      }
}
