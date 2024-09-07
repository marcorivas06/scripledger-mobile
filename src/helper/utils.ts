export function formatBalanceForAutocomplete(balances): {id:string, title:string}[]{
  const formattedBalances = balances.map(token => ({
    id: token.token_id,
    title: token.token_name,
    balance: token.balance
  }));
  return formattedBalances;
}


  export async function test() {
    try {
      console.log("----------")
      
      console.log("----------")
          
    } catch (error) {
      console.error("Error:", error);
    }
  }  

  
  //  export async function reedemGiftCard(
  //   connection,
  //   mintPubKey,
  //   senderKeypair,
  //   recipientPublicKey,
  //   masterPayerPubKey,
  //   amount,
  //   decimal){
    
  //   //Get this from populated data
  //   // const mintPubKey = new solanaWeb3.PublicKey('GAJjz8d5n7Gi4BNG3AD3684X7NPnyjuKmvjkbgyZpktf');
  //   //FingerPrint Authorizing Secret Key from local storage
  //   //const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("EXPO_SECURE_STORAGE"));
  //   // const senderKeypair = solanaWeb3.Keypair.fromSecretKey(bs58.decode("4PPA4dSZtZvd5LuWcToN9q5xvxbatx6Gt4kELhtbYV9LgzQ7UH4QcqCSCJL5MRFWZCtRY1PhNyfERMWj5F634STD"));
  //   let brandTokenAccountPublickKey = await getAssociatedTokenAddress(mintPubKey, senderKeypair.publicKey); 

  //   // recipient username fetch username from DB 
  //   // const recipientPublicKey  =  await generateKeyPair(); //Mock Data Purposes 
  //   // let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recepientKeyPair.publicKey);
  //   let recipientTokenAcctPubKey = await getAssociatedTokenAddress(mintPubKey, recipientPublicKey);

  //   let recentBlockhash = await connection.getLatestBlockhash(); 
  //   let tokenTransaction = new solanaWeb3.Transaction({
  //     recentBlockhash: recentBlockhash.blockhash,
  //     feePayer: masterPayerPubKey,
  //   });
  //   tokenTransaction.add(
  //     createTransferCheckedInstruction(                      //SPL Token function
  //       senderTokenAcctPubkey, // from
  //       mintPubKey, // mint
  //       recipientTokenAcctPubKey, // to
  //       senderKeypair.publicKey, // from's owner
  //       amount, // amount
  //       decimal// decimals
  //     )
  //   );
  //   tokenTransaction.partialSign(senderKeypair);
  //   const serializedTransactionB64 = Buffer.from(tokenTransaction.serialize({requireAllSignatures: false})).toString("base64");
  //   console.log(serializedTransactionB64)
  // }
