import { PublicKey } from '@solana/web3.js';

//Redux 
export interface IUserPublic {
  id: string | null;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  accountPublicKey: string | null;          // Mapped from accountPublicKey
  kycStatus: string | null;
  customerProfile: string | null;
  actionType: string | null;
  category: string | null;
  note: string | null;
  userWallet: IUserWallet[] | null;
  userTransactions: IUserTransaction[] | null;
  // Add any additional fields you decide to include
}
export interface IBrand {
  brandName: string | null;
  id: string | null;
  ownerPublicKey: string | null;
  tokens: [] | null;          // Mapped from accountPublicKey
  url: string | null;
}
export interface IBrands {
  brands: Array<IBrand>;
}

//Setup later
export interface ITransaction{
  tokenId: string;
  senderPublicKey: string;
  senderAccountId: string;
  username: string;
  recipientPublicKey: string;
  accountId: string;
  type: string;
  balance: number;
  note: string;
  transactionLabel: string;
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
  action: () => void;
}

export interface IUserWallet{
  brandName: string;
  mintAddress: PublicKey;
  tokenBalance: number;
}
/*
"id": "66e51bf528a19d5f9479e572",
		"publicKey": "6uMqWFY4rZ5mc3nghX7DtRJG7nJSzv5nhQUkNa3Qfwqy",
		"timestamp": "2024-09-14T05:15:33.195+00:00",
		"transactionHash": "2THuAhtsasCyXKa5J9vb6qcBGq196K1hMcgoYzjxWKB7mLP84tnAJSrGnGpxZFh2RsmdxQKg49pYewkoBQM2WZfF",
		"transactionType": "transactionFromBusinessAccount"
*/
export interface IUserTransaction{
  id: string;
  publicKey: string;
  timestamp: Date;
  transactionHash: string;
  transactionType: string; 
}
