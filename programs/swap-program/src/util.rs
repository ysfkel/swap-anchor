use anchor_lang::prelude::Pubkey;

pub fn order_keys(token_0_acount: Pubkey, token_1_acount: Pubkey) -> (Pubkey, Pubkey) {
    if token_0_acount > token_1_acount {
        (token_1_acount, token_0_acount)
    } else {
        (token_0_acount, token_1_acount)
    }
}

pub fn get_0_key(token_0_acount: Pubkey, token_1_acount: Pubkey) -> Pubkey {
    if token_0_acount > token_1_acount {
        token_1_acount
    } else {
        token_0_acount
    }
}

pub fn get_1_key(token_0_acount: Pubkey, token_1_acount: Pubkey) -> Pubkey {
    if token_0_acount > token_1_acount {
        token_0_acount
    } else {
        token_1_acount
    }
}
