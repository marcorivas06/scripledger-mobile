global.Buffer = require('buffer').Buffer;
import { PublicKey, clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
// import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as splToken from '@solana/spl-token';
import { decode } from "bs58";
import { IUserWallet } from '@types/types';

export const createConnection = async() => {
  return new Connection(clusterApiUrl("devnet"), "confirmed");
};

export async function splGetAssociatedTokenAddress(mintPubKey, senderPublicKey): Promise<PublicKey>{
  let senderTokenAddress = await splToken.getAssociatedTokenAddress(mintPubKey, senderPublicKey); 
  return senderTokenAddress;
}

export async function getKeyPairFromSecretKeyString(stringSecretKey:string){
  return Keypair.fromSecretKey(decode(stringSecretKey));  
}

async function getTokenAccountsByOwner(connection, publicKey ) {
  try {
    const tokenProgramId = await splToken.TOKEN_PROGRAM_ID;
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: tokenProgramId,
      }
    );  
    return tokenAccounts.value;
  } catch (error) {
    console.error("Error: " + error)
  }
}

export async function getAllTokenBalances(connectionInfo):Promise<IUserWallet[]> {
  try {
    const { connection, publicKey} = connectionInfo;
    const publicKeyParsed = new PublicKey(publicKey);
    const tokenAccounts = await getTokenAccountsByOwner(connection, publicKeyParsed );

    const balances = tokenAccounts.map((tokenAccountInfo) => {
      const accountData = tokenAccountInfo.account.data.parsed.info;
  
      const mintAddress = accountData.mint;
      const tokenBalance = accountData.tokenAmount.uiAmount; // Adjust decimals if necessary

      const transaction: IUserWallet = {mintAddress: mintAddress, tokenBalance: tokenBalance}
      
      return transaction;
    });
    
    return balances;

  } catch (error) {
    console.error("Error: " + error);  
  }  
}

export async function getuserWallet(user):Promise<IUserWallet[]>{
  const connection = await createConnection();
  const connectionInfo = {connection: connection, publicKey: user.accountPublicKey};
  const transactions:IUserWallet[] = await getAllTokenBalances(connectionInfo);
  return transactions;
}