// Not using
// import 'react-native-get-random-values';
// import { Buffer } from 'buffer';
// global.Buffer = Buffer;
// import * as Random from "expo-random";
// import * as solanaWeb3 from '@solana/web3.js'


// import 'react-native-get-random-values';
// global.Buffer = require("buffer").Buffer;
// global.Buffer = Buffer;
// import * as bip39 from 'bip39';
// import * as solanaSPL from '@solana/spl-token'

// import { polyfill as polyfillCrypto } from 'react-native-crypto';
// import { polyfill as polyfillRandom } from 'react-native-randombytes';

// polyfillCrypto();
// polyfillRandom();

  //12 words mnemonic that users can use to import and export - seed to generate secret key 
  //123213ijsadkafjhjdh 
  
  // export function generateWalletKeyPair(){
  //   const mnemonic = bip39.generateMnemonic();
  //   console.log(mnemonic)
  //   // const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // takes the mnemonic to binary representation
  //   // const newWalletKeypair = solanaWeb3.Keypair.fromSeed(seed.slice(0, 32));  //generated keypair from seed
  //   // return newWalletKeypair;
  // }

  // generateWalletKeyPair();
  
  
  // generateWalletKeyPair()
  // const newWalletKeypair = generateWalletKeyPair();
  
  
  // const mintPubkey = 'AQ2D123UNQSZst2MV82zhiFt4d47x4LiSrevDbf3HRfp' ;
  
  //toBase58() to output
  //let walletPK = newWalletKeypair.publicKey.toBase58();

  // function getWalletSK(newWalletKeypair){
  //   return newWalletKeypair.secretKey
  // }
  // function getWalletPK(newWalletKeypair){
  //   return newWalletKeypair.publicKey
  // }

  // async function constructTokenTransaction(walletSecretKey, walletPubKey, mintPubKey, recipientPubKey){
  //   let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
  //   //TODO: Secret Storage logic
  //   //const fromWallet = solanaWeb3.Keypair.fromSecretKey(walletSecretKey);
    
  //   //static debugging way 
  //   const fromWalllet = walletSecretKey;
    
  //   // let senderTokenAcctPubkey = solanaSPL.getAssociatedTokenAddressSync(mintPubkey, walletPubKey); 
  //   // let recipientTokenAcctPubKey = solanaSPL.getAssociatedTokenAddressSync(mintPubkey, recipientPubKey);
    
  //   // let recentBlockhash = await connection.getLatestBlockhash();  
  //   // let tokenTransaction = new solanaWeb3.Transaction({
  //   //    recentBlockhash: recentBlockhash.blockhash,               //Solana blockhash expires after ~2 minutes, can use Nonce if that becomes an issue
  //   //    feePayer: backendSolanaPayerPK,                       //backend Solana account public key
  //   // });
  //   // tokenTransaction.add(
  //   // createTransferCheckedInstruction(                      //SPL Token function
  //   //   senderTokenAcctPubkey, // from
  //   //   mintPubkey, // mint
  //   //   recipientTokenAcctPubKey, // to
  //   //   walletPubKey, // from's owner
  //   //   1, // amount
  //   //   0 // decimals
  //   // )
  //   // );
  
  // }


  // constructTokenTransaction(newWalletKeypair.secretKey)


  // useEffect(() => {
  //   const sk = getWalletSK(newWalletKeypair);
  //   const pk = getWalletPK(newWalletKeypair);    
    
  // }, [])
  
  /* 
  return 
  const User = {
    username: userNameInput,
    email: emailInput,
    walletPublicKey: walletPK ,
  }
  */