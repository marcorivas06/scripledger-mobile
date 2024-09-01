// function uint8ArrayToBase64(uint8) {
//     return btoa(String.fromCharCode.apply(null, uint8));
// }

// export async function fetchGetAssociatedTokenAccount(pubKey, masterPayerKeypair) {
//     const data = {
//         pubKey,
//         masterPayerKeypair: {
//             _keypair: {
//                 publicKey: uint8ArrayToBase64(masterPayerKeypair._keypair.publicKey),
//                 secretKey: uint8ArrayToBase64(masterPayerKeypair._keypair.secretKey)
//             }
//         }
//     };
    
//     try {
//         const request1 = new Request("https://example.org/post", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username: "example" }),
//           });

//         const response = await fetch("http://localhost:8000/api/v1/getAssociatedTokenAddress", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//     } 
//     catch (error) {
//         console.error("Error fetching Associated Token Account", error);
//     }
// }