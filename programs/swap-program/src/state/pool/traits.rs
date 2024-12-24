use super::types::*;

pub trait IPoolAdmin {
    fn set_operation_statuses(&mut self, status: u8);

    fn set_operation_status(&mut self, pool_operation: PoolOperation, status: PoolOperationStatus);
}
