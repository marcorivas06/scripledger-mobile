export interface IAccount{
  account_id: string;
  username_handle: string;
  account_public_key: string;
  first_txn_timestamp: string;
  kyc_status: string;
  alternate_account_id: number;
  customer_profile: string;
  balances: Array<IBalance>;
}
export interface ITransaction{
  tokenId: string
  senderPublicKey: string
  senderAccountId: string
  username: string
  recipientPublicKey: string
  accountId: string
  type: string
  balance: number
  note: string
  transactionLabel: string
}
export interface IBalance{
  token_id: string;
  token_name: string;
  balance: number;
}

export interface IStartActionButton{
  name: string,
  iconName: string, // Replace with the actual icon name or SVG path
  iconAs: string, // Replace with the actual icon name or SVG path
  gradientColor:Array<string>;
}