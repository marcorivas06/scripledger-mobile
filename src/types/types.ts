export interface Account{
  account_id: string;
  username_handle: string;
  account_public_key: string;
  first_txn_timestamp: string;
  kyc_status: string;
  alternate_account_id: number;
  customer_profile: string;
  balances: Array<Balance>;
}
export interface Balance{
  token_id: string;
  token_name: string;
  balance: number;
}