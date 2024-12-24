use crate::{
    error::SwapProgramError::InvalidInputTokensMismatch,
    seeds::{AUTH_SEED, LP_SEED, POOL_SEED, POOL_VAULT_SEED},
    state::{Pool, PoolConfig},
};
use anchor_lang::{accounts::interface_account::InterfaceAccount, prelude::*};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{
        //TokenAccount,
        Token,
    },
    token_interface::{Mint, TokenAccount, TokenInterface},
};

pub fn create_pool(ctx: Context<CreatePool>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct CreatePool<'info> {
    /// the pool config to use
    pub config: Box<Account<'info, PoolConfig>>,

    /// CHECK: pool vault and lp mint authority
    #[account(
        seeds=[AUTH_SEED],
        bump
    )]
    pub authority: UncheckedAccount<'info>,

    #[account(
        init,
        seeds = [POOL_SEED, config.key().as_ref(),token_0_mint.key().as_ref(),token_1_mint.key().as_ref()],
        constraint = validate_token_order(token_0_mint.key(),token_1_mint.key()) @ InvalidInputTokensMismatch,
        bump,
        payer = signer,
        space = Pool::SPACE,
    )]
    pub pool: Box<Account<'info, Pool>>,
    /// token 0 mint account
    #[account(
        constraint = token_0_mint.key() < token_1_mint.key(),
        mint::token_program = token_0_program
    )]
    pub token_0_mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        mint::token_program = token_1_program,
    )]
    pub token_1_mint: Box<InterfaceAccount<'info, Mint>>,

    /// lp mint account
    #[account(
    init,
    seeds = [LP_SEED, pool.key().as_ref()],
    bump,
    payer = signer,
    mint::authority = authority,
    mint::decimals = 9,
    mint::token_program = token_program,
    )]
    pub lp_mint: Box<InterfaceAccount<'info, Mint>>,

    /// lp account
    #[account(
      init,
       associated_token::mint = lp_mint,
       associated_token::authority = signer,
       payer = signer,
       token::token_program = token_program,
    )]
    pub lp_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,token::mint = token_0_mint,token::authority = signer
    )]
    pub token_0_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = token_1_mint,
        token::authority = signer,
    )]
    pub token_1_account: Box<InterfaceAccount<'info, TokenAccount>>,

    ///CHECK: token_0_vault - due to stack/heap limitations, we have to create redundant new accounts ourselves.
    #[account(
        mut,
        seeds = [POOL_VAULT_SEED, pool.key().as_ref(), token_0_mint.key().as_ref()],
        bump,
    )]
    pub token_0_vault: UncheckedAccount<'info>,
     
    ///CHECK: token_1_vault - due to stack/heap limitations, we have to create redundant new accounts ourselves.
    #[account(mut, 
        seeds = [POOL_VAULT_SEED, pool.key().as_ref(),token_1_mint.key().as_ref()],
        bump
    )]
    pub token_1_vault: UncheckedAccount<'info>,

    /// pool pool treasury
    #[account(mut,
      address = crate::create_pool_tresury::id(),
    )]
    pub create_pool_tresury: Box<InterfaceAccount<'info, TokenAccount>>,

   // pub observation: 

    #[account(mut)]
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub token_0_program: Interface<'info, TokenInterface>,
    pub token_1_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

fn validate_token_order(token_0: Pubkey, token_1: Pubkey) -> bool {
    if token_0 > token_1 {
        false
    } else {
        true
    }
}
