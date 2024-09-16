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
  userTransactions: IUserTransaction[] | null;
  // Add any additional fields you decide to include
}

//Setup later
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
  action: () => void;
}

export interface IUserTransaction{
  mintAddress: PublicKey
  tokenBalance: number  
}

export interface IUserTransactions{
  transactions:Array<IUserTransaction>
}
