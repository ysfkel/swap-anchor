pub enum PoolOperation {
    Deposit,
    Withdraw, 
    Swap,
}

#[derive(PartialEq, Eq)]
pub enum PoolOperationStatus {
    Enable,
    Disable
}