import * as crypto from "expo-crypto";
import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";
import * as ed25519 from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Buffer } from "@craftzdog/react-native-buffer";
import * as bip39 from "bip39"

  //Generate Mnemonic generates the phrase.
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

  async function mnemonicToSeed(mnemonic: string) {
    try {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      return Buffer.from(seed).toString("hex");
    } catch (error) {
      console.error("Error converting mnemonic to seed:", error);
      throw error;
    }
  }

  async function deriveSeed(seed: string, walletIndex: number) {
    try {
      const path44Change = `m/44'/501'/${walletIndex}'/0'`;
      var Buffer = require("buffer").Buffer;
      return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
    } catch (error) {
      console.error("Error deriving seed:", error);
      throw error;
    }
  }

  async function accountFromSeed(seed: string, walletIndex: number) {
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

  export async function generateRandomNewKeyPair() {
    const mnemonic = await generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    let keyPair = await accountFromSeed(seed, 0);
    if (keyPair == null) return undefined;
    return keyPair;
  }

  