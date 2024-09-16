use anchor_lang::prelude::*;

use crate::state::*;

/// Initialize the program by creating the liquidity pool
pub fn create_pool(ctx: Context<CreatePool>) -> Result<()> {
    ctx.accounts
        .pool
        .set_inner(LiquidityPool::new(ctx.bumps.pool));

    Ok(())
}

#[derive(Accounts)]
pub struct CreatePool<'info> {
    /// Liquidity Pool
    #[account(
        init,
        space = LiquidityPool::SPACE,
        payer = payer,
        seeds = [LiquidityPool::SEED_PREFIX.as_bytes()],
        bump,
    )]
    pub pool: Account<'info, LiquidityPool>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
