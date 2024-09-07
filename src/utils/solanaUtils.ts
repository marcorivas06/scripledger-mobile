import { PublicKey, clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { decode } from "bs58";

export const createConnection = async() => {
  return new Connection(clusterApiUrl("devnet"), "confirmed");
};

export async function splGetAssociatedTokenAddress(mintPubKey, senderPublicKey): Promise<PublicKey>{
  let senderTokenAddress = await getAssociatedTokenAddress(mintPubKey, senderPublicKey); 
  return senderTokenAddress;
}

export async function getKeyPairFromSecretKeyString(stringSecretKey:string){
  return Keypair.fromSecretKey(decode(stringSecretKey));  
}