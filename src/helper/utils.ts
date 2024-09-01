import * as crypto from "expo-crypto";
import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";
import * as ed25519 from "ed25519-hd-key";
import nacl from "tweetnacl";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  createMint,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getMint,
  createTransferCheckedInstruction
} from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { fetchGetAssociatedTokenAccount } from "@actions/fetchAssociatedAccount";
import { Buffer } from "@craftzdog/react-native-buffer";
import * as bs58 from "bs58";

export function formatBalanceForAutocomplete(balances): {id:string, title:string}[]{
  const formattedBalances = balances.map(token => ({
    id: token.token_id,
    title: token.token_name,
    balance: token.balance
  }));
  return formattedBalances;
}

// ---
  //Generate Mnemonic generates the phrase.
  // Step 1
  async function generateMnemonic() {
    try {
      const randomBytes = await crypto.getRandomBytesAsync(32);
      const mnemonic = ethers.Mnemonic.fromEntropy(randomBytes);
      return mnemonic.phrase;
    } catch (error) {
      console.error("Error generating mnemonic:", error);
      throw error; // Rethrow the error if you want the calling function to handle it
    }
  }

  // Step 2
  export async function mnemonicToSeed(mnemonic: string) {
    try {
      const bip39 = await import("bip39");
      const seed = await bip39.mnemonicToSeed(mnemonic);
      return Buffer.from(seed).toString("hex");
    } catch (error) {
      console.error("Error converting mnemonic to seed:", error);
      throw error;
    }
  }

  // Step 3
  export async function deriveSeed(seed: string, walletIndex: number) {
    try {
      const path44Change = `m/44'/501'/${walletIndex}'/0'`;
      var Buffer = require("buffer").Buffer;
      return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
    } catch (error) {
      console.error("Error deriving seed:", error);
      throw error;
    }
  }

  export async function accountFromSeed(seed: string, walletIndex: number) {
    try {
      const derivedSeed = await deriveSeed(seed, walletIndex);
      let acc = null;

      if (derivedSeed) {
        const keyPair = await nacl.sign.keyPair.fromSeed(derivedSeed);
        acc = new solanaWeb3.Keypair(keyPair);
      }
      return acc;
    } catch (error) {
      console.error("Error creating account from seed:", error);
      throw error; // Rethrow the error if you want the calling function to handle it
    }
  }

  export async function generateKeyPair() {
    const mnemonic = await generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    let keyPair = await accountFromSeed(seed, 0);
    if (keyPair == null) return undefined;
    return keyPair;
  }

//1. Creating a user transaction 500 airline miles to user B
// 


  export async function test() {
    try {
      
    
      // const masterPayerKeypair = solanaWeb3.Keypair.fromSecretKey(masterPayerSecretKey);
      // const payerPublicKey = masterPayerKeypair.publicKey;

      let connection = await createConnection();
      let qrcodeString = "solana:4PPA4dSZtZvd5LuWcToN9q5xvxbatx6Gt4kELhtbYV9LgzQ7UH4QcqCSCJL5MRFWZCtRY1PhNyfERMWj5F634STD?spl-token=GAJjz8d5n7Gi4BNG3AD3684X7NPnyjuKmvjkbgyZpktf&label=Scrip%20Ledger%20Gift%20Card%20Unlock%20Key";
      
      const url = new URL(qrcodeString, "https://dummy-base.com/");
      const protocol = url.protocol; // solana:
      const giftCardSecretKey = url.pathname.slice(0); // Removes the initial colon
      const mintPubKey = url.searchParams.get("spl-token");
      
      const label = decodeURIComponent(url.searchParams.get("label"));
      
      const giftCardKeyPair = solanaWeb3.Keypair.fromSecretKey(bs58.decode(giftCardSecretKey))
      /*
      connection,
      mintPubKey,
      senderKeypair,
      recipientPublicKey,
      masterPayerPubKey,
      amount,
      decimal 
      */
      const recipientKeyPair  =  await generateKeyPair();
      let masterPayerPubKey:solanaWeb3.PublicKey = new solanaWeb3.PublicKey("CXb8JftpUcCAyQrp2TaUzqC8xx7cdvfBvoNcD1nMgNkS"); 

      // get Balance on the GiftCard Addrress
      // get Balance 
      console.log(EXPO_PUBLIC_MASTER_PAYER_PUBKEY_STRING) 
      // reedemGiftCard(connection, mintPubKey, giftCardKeyPair, recipientKeyPair.PublicKey, masterPayerPubKey)
      
      // console.log(process.env.MASTER_PAYER_PUBKEY_STRING)
      
      // TODO Coming from env
      // let masterPayerPubKey:solanaWeb3.PublicKey = new solanaWeb3.PublicKey("CXb8JftpUcCAyQrp2TaUzqC8xx7cdvfBvoNcD1nMgNkS"); 
      
      // console.log(mintPubkey);
      console.log("----------")
    } catch (error) {
      console.error("Error:", error);
    }
  }  

  export const createConnection = async() => {
    return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
  };

  //Send serializedTransactionB64 post endpoint 
  export async function userSendToken(
    connection,
    mintPubKey,
    senderKeypair,
    recipientPublicKey,
    masterPayerPubKey,
    amount,
    decimal){
    //Get this from populated data
    // const mintPubKey = new solanaWeb3.PublicKey('GAJjz8d5n7Gi4BNG3AD3684X7NPnyjuKmvjkbgyZpktf');
    //FingerPrint Authorizing Secret Key from local storage
    //const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("EXPO_SECURE_STORAGE"));
    // const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("4PPA4dSZtZvd5LuWcToN9q5xvxbatx6Gt4kELhtbYV9LgzQ7UH4QcqCSCJL5MRFWZCtRY1PhNyfERMWj5F634STD"));
    let senderTokenAcctPubkey = await getAssociatedTokenAddress(mintPubKey, senderKeypair.publicKey); 

    // recipient username fetch username from DB 
    // const recipientPublicKey  =  await generateKeyPair(); //Mock Data Purposes 
    // let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recepientKeyPair.publicKey);
    let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recipientPublicKey);

    let recentBlockhash = await connection.getLatestBlockhash(); 
    let tokenTransaction = new solanaWeb3.Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: masterPayerPubKey,
    });
    tokenTransaction.add(
      createTransferCheckedInstruction(                      //SPL Token function
        senderTokenAcctPubkey, // from
        mintPubKey, // mint
        recipientTokenAcctPubKey, // to
        senderKeypair.publicKey, // from's owner
        amount, // amount
        decimal// decimals
      )
    );
    tokenTransaction.partialSign(senderKeypair);
    const serializedTransactionB64 = Buffer.from(tokenTransaction.serialize({requireAllSignatures: false})).toString("base64");
    console.log(serializedTransactionB64)
  }
  
   export async function reedemGiftCard(
    connection,
    mintPubKey,
    senderKeypair,
    recipientPublicKey,
    masterPayerPubKey,
    amount,
    decimal){
    
    //Get this from populated data
    // const mintPubKey = new solanaWeb3.PublicKey('GAJjz8d5n7Gi4BNG3AD3684X7NPnyjuKmvjkbgyZpktf');
    //FingerPrint Authorizing Secret Key from local storage
    //const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("EXPO_SECURE_STORAGE"));
    // const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("4PPA4dSZtZvd5LuWcToN9q5xvxbatx6Gt4kELhtbYV9LgzQ7UH4QcqCSCJL5MRFWZCtRY1PhNyfERMWj5F634STD"));
    let brandTokenAccountPublickKey = await getAssociatedTokenAddress(mintPubKey, senderKeypair.publicKey); 

    // recipient username fetch username from DB 
    // const recipientPublicKey  =  await generateKeyPair(); //Mock Data Purposes 
    // let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recepientKeyPair.publicKey);
    let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recipientPublicKey);

    let recentBlockhash = await connection.getLatestBlockhash(); 
    let tokenTransaction = new solanaWeb3.Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: masterPayerPubKey,
    });
    tokenTransaction.add(
      createTransferCheckedInstruction(                      //SPL Token function
        senderTokenAcctPubkey, // from
        mintPubKey, // mint
        recipientTokenAcctPubKey, // to
        senderKeypair.publicKey, // from's owner
        amount, // amount
        decimal// decimals
      )
    );
    tokenTransaction.partialSign(senderKeypair);
    const serializedTransactionB64 = Buffer.from(tokenTransaction.serialize({requireAllSignatures: false})).toString("base64");
    console.log(serializedTransactionB64)
  }
