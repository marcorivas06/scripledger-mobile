import useSWR from 'swr'

// const metaData = {
//   account_id: '7459204508234895',
//   username_handle: "@belligerent_bret123",
//   account_public_key: "YM7DVJVUCHAU6W2DIPU6ZNOEYTZ6Z2HISPLOA",
//   first_txn_timestamp: "1718834977",
//   kyc_status: "Verified", 
//   alternate_account_id: null,
//   customer_profile: null,
//   balances: [
//     {
//       token_id: "0",
//       token_name: "Steam",
//       balance: 13.46,
//     },
//     {
//       token_id: "1",
//       token_name: "Huwawei",
//       balance: 11.21,
//     },
//     {
//       token_id: "2",
//       token_name: "Google Play Store",
//       balance: 25.33,
//     },
//     {
//       token_id: "3",
//       token_name: "American Airlines",
//       balance: 29.84,
//     },
//   ]
// }



// Setting up the promise
// export async function useWalletData(filePath:string): Promise<IAccount>{
//   try {
//     const response = await fetch(filePath);
//     if(!response.ok){
//       throw new Error('Network response was not ok');
//     }
//     const jsonData = await response.json();
//     return jsonData;
//   } catch (error) {
//     console.error('There was a problem with the fetch operation', error);
//   }
// }
