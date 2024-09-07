
import { Buffer } from "@craftzdog/react-native-buffer";
import * as solanaWeb3 from "@solana/web3.js";
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { splGetAssociatedTokenAddress } from "@utils/solanaUtils";
import { MOCK_USERNAME } from '@constants/user.constants';
import { getValueFor } from "@utils/secureStore";
//Send serializedTransactionB64 post endpoint 
//case reedeming a giftCard sender is qrCode and recipient is user
//case userTransaction sender is user recipient is user B 
import { getKeyPairFromSecretKeyString } from "@utils/solanaUtils"

const enum TransactionType {
  REEDEM = 0,
  TRANSFER = 1,
  RECEIVE = 2
}

interface ITransaction {
  connection: solanaWeb3.Connection,
  mintPubKey: solanaWeb3.PublicKey ,
  sourcePubKey : solanaWeb3.Keypair,
  destinationPubKey : solanaWeb3.PublicKey,
  amount: number,
  decimal: number,
  transactionType: TransactionType
}

export async function useTransferToken(transactionInfo: ITransaction){
  const { connection, mintPubKey, sourcePubKey, destinationPubKey, amount, decimal, transactionType } = transactionInfo;
  const userSecretKey = await getValueFor(MOCK_USERNAME); //Secret Storage
  const userKeyPair =   await getKeyPairFromSecretKeyString(userSecretKey);

  //sender: [user ("EXPO_SECURE_STORAGE")], recipient [User B (query database)]    
  //send username, 
  // mapping brands and the mintPubKey
  switch (transactionType) {
    case TransactionType.TRANSFER: 
      let prepareTransactionData = {
        connection: connection ,
        mintPubKey: mintPubKey,
        senderKeypair: userKeyPair,
        recipientPublicKey: destinationPubKey,
        amount: amount,
        decimal : decimal
      }
      await handleTransfer(prepareTransactionData)
      break;
  
    // case TransactionType.RECEIVE:
    case TransactionType.REEDEM: //When recipient is user we fetch public key from Expo Secure Storage   
    
    //fetch source since it is giftcard or user 

    //fetch mintPubKey, amount and decimal.
    
    // const { amount, decimals } = getBalance();

    prepareTransactionData = {
        connection: connection ,
        mintPubKey: mintPubKey,
        senderKeypair: sourcePubKey,
        recipientPublicKey: userKeyPair.publicKey,
        amount: amount,
        decimal : decimal
      }
      await handleTransfer(transactionInfo)
      break;
    }
}

// after handleScan pass objet to getBalance
// {}
function getBalance(){
  // let tokenAcctPubkey = splToken.getAssociatedTokenAddressSync(mintPubKey, giftCardPubKey);
  // const info = await splToken.getAccount(connection, tokenAcctPubkey);
  // const amount = Number(info.amount);
  // const mint = await splToken.getMint(connection, info.mint);
  // return { amount: amount,  decimals: mint.decimals }
  return ""
}

async function handleTransfer(transactionInfo) {
  const { connection, mintPubKey, senderKeypair, recipientPublicKey, amount, decimal } = transactionInfo;
  
  try {
    //returns Promise<pubKey>
    let senderTokenAcctPubkey = await splGetAssociatedTokenAddress(mintPubKey, senderKeypair.publicKey); 
    let recipientTokenAcctPubKey = await splGetAssociatedTokenAddress(mintPubKey, recipientPublicKey);
    let recentBlockhash = await connection.getLatestBlockhash(); 
    
    let tokenTransaction = new solanaWeb3.Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: process.env.EXPO_PUBLIC_MASTERPAYER_PUBKEY,
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
  } catch (error) {
    console.error("Error when Handling Transaction " + error);
  }
}