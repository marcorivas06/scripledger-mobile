import { getKeyPairFromSecretKeyString } from "./solanaUtils";
import { Keypair } from "@solana/web3.js";

function handleScan(data) {
  //Mocking Scan
  let qrcodeString = "solana:4PPA4dSZtZvd5LuWcToN9q5xvxbatx6Gt4kELhtbYV9LgzQ7UH4QcqCSCJL5MRFWZCtRY1PhNyfERMWj5F634STD?spl-token=GAJjz8d5n7Gi4BNG3AD3684X7NPnyjuKmvjkbgyZpktf&label=Scrip%20Ledger%20Gift%20Card%20Unlock%20Key";

  const url = new URL(qrcodeString, "https://dummy-base.com/");
  const protocol = url.protocol; // solana:
  const giftCardSecretKey = url.pathname.slice(0);
  const mintPubKey = url.searchParams.get("spl-token");
  const label = decodeURIComponent(url.searchParams.get("label"));

  const giftCardKeyPair: Keypair = await getKeyPairFromSecretKeyString(giftCardSecretKey);
  // TODO pass all parameters
  // Pass this two for transfer
  return {giftCardKeyPair.publicKey, mintPubKey };
}


