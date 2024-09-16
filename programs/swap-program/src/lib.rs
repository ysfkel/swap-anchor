pub mod instructions;
pub mod state;
pub mod error;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("8zqSfMnEpWih9EbDqGRrkG97o3NSX8ojwwoYh9sqdmn7");

#[program]
pub mod swap_program {
    use super::*;

    pub fn create_pool(ctx: Context<CreatePool>) -> Result<()> {
        Ok(())
    }
}
