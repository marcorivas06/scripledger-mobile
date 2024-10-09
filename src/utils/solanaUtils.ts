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

export async function getPublicKeysFromTransaction(txHash) {
  // Connect to the correct Solana cluster
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  try {
    // Fetch the transaction details
    const transaction = await connection.getTransaction(txHash, { commitment: 'confirmed' });

    if (transaction) {
      // Extract the transaction message
      const transactionMessage = transaction.transaction.message;
      
      console.log("===========Let me see transaction Message===========")
      console.log("Post Balance: ", transaction.meta.postBalances)
      console.log("Pre Balance: ", transaction.meta.preBalances)

      // Map account keys to PublicKey objects
      const accountKeys = transactionMessage.accountKeys.map(key => new PublicKey(key));
      // console.log("Let me see account Keys")
      // console.log(accountKeys)
      return accountKeys;
    } else {
      console.log(`Transaction ${txHash} not found or does not exist.`);
      return []; // Return an empty array if transaction not found
    }
  } catch (error) {
    console.error(`Error fetching transaction ${txHash}:`, error);
    return []; // Return an empty array in case of error
  }
}

export async function getMintPublicKeyFromTransaction(txHash) {
  // Connect to the correct Solana cluster
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Fetch the parsed transaction details
    const transaction = await connection.getParsedTransaction(txHash, 'confirmed');

    if (transaction) {
      // Initialize a set to store unique mint public keys
      const mintPublicKeys = new Set();

      // Loop through the transaction instructions
      const instructions = transaction.transaction.message.instructions;

      for (const instruction of instructions) {
        // Check if the instruction is parsed and involves the Token Program
        if (instruction.program === 'spl-token' && instruction.parsed) {
          const parsedInfo = instruction.parsed.info;

          // Depending on the instruction type, extract the mint address
          if (parsedInfo && parsedInfo.mint) {
            mintPublicKeys.add(parsedInfo.mint);
          } else if (parsedInfo && parsedInfo.tokenAmount && parsedInfo.tokenAmount.mint) {
            mintPublicKeys.add(parsedInfo.tokenAmount.mint);
          } else if (parsedInfo && parsedInfo.account) {
            // Fetch the account info to get the mint
            const accountInfo = await connection.getParsedAccountInfo(parsedInfo.account);
            if (accountInfo && accountInfo.value && accountInfo.value.data) {
              const accountData = accountInfo.value.data.parsed.info;
              if (accountData.mint) {
                mintPublicKeys.add(accountData.mint);
              }
            }
          }
        }
      }

      // Convert the set to an array and return
      const mintPublicKeysArray = Array.from(mintPublicKeys);
      // console.log('Mint Public Keys involved in the transaction:', mintPublicKeysArray);
      return mintPublicKeysArray;
    } else {
      console.log(`Transaction ${txHash} not found or does not exist.`);
      return []; // Return an empty array if transaction not found
    }
  } catch (error) {
    console.error(`Error fetching transaction ${txHash}:`, error);
    return []; // Return an empty array in case of error
  }
}

export async function getMintPublicKeyAndTransactionTypeFromTransaction(txHash) {
  // Connect to the correct Solana cluster
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Fetch the parsed transaction details
    const transaction = await connection.getParsedTransaction(txHash, 'confirmed');

    if (transaction) {
      // Initialize an array to store results
      const mintPublicKeysWithType = [];

      // Get account keys involved in the transaction
      const accountKeys = transaction.transaction.message.accountKeys.map(keyObj => keyObj.pubkey.toString());

      // Get pre and post token balances
      const preTokenBalances = transaction.meta.preTokenBalances || [];
      const postTokenBalances = transaction.meta.postTokenBalances || [];

      // Map balances by account index for easy lookup
      const preBalancesMap = {};
      preTokenBalances.forEach(balance => {
        preBalancesMap[balance.accountIndex] = balance;
      });

      const postBalancesMap = {};
      postTokenBalances.forEach(balance => {
        postBalancesMap[balance.accountIndex] = balance;
      });

      // Set of all token accounts involved
      const tokenAccountsInvolved = new Set([
        ...preTokenBalances.map(balance => balance.accountIndex),
        ...postTokenBalances.map(balance => balance.accountIndex),
      ]);

      for (const accountIndex of tokenAccountsInvolved) {
        const accountPubkey = accountKeys[accountIndex];
        const preBalanceInfo = preBalancesMap[accountIndex];
        const postBalanceInfo = postBalancesMap[accountIndex];

        const mintPublicKey = (preBalanceInfo || postBalanceInfo).mint;
        const preBalance = preBalanceInfo ? parseFloat(preBalanceInfo.uiTokenAmount.uiAmountString) : 0;
        const postBalance = postBalanceInfo ? parseFloat(postBalanceInfo.uiTokenAmount.uiAmountString) : 0;

        const balanceChange = postBalance - preBalance;

        let transactionType = '';
        if (balanceChange < 0) {
          transactionType = 'Sent';
        } else if (balanceChange > 0) {
          transactionType = 'Received';
        } else {
          transactionType = 'Unchanged';
        }

        mintPublicKeysWithType.push({
          mintPublicKey,
          transactionType,
          balanceChange
        });
        
      }

      return mintPublicKeysWithType;
    } else {
      console.log(`Transaction ${txHash} not found or does not exist.`);
      return []; // Return an empty array if transaction not found
    }
  } catch (error) {
    console.error(`Error fetching transaction ${txHash}:`, error);
    return []; // Return an empty array in case of error
  }
}