import * as SecureStore from 'expo-secure-store';
import { generateRandomNewKeyPair } from './cryptoUtils';

//Mocking UserName
import { MOCK_USERNAME, USER_USERNAME, USER_SECRET } from '@constants/user.constants';

export async function getOrCreateUserSecureCredentials() {
  const userCredentials = await getUserCredentials();
  try {
    if ( userCredentials === undefined) {
      const newKeyPair = await generateRandomNewKeyPair();
      const newSecretKey = JSON.stringify(newKeyPair.secretKey);
      
      await save(USER_USERNAME, MOCK_USERNAME)
      await save(USER_SECRET, newSecretKey)
      
      const newUserCredentials = await getUserCredentials();
      return newUserCredentials;
    } 
    else {
      return userCredentials;
    }  
  } 
  catch (error) {
    console.log("Error creating Secret Key for SECURE STORAGE" + error);
  }
}

export async function getUserCredentials() {
  try {
    let username = await SecureStore.getItemAsync(USER_USERNAME);
    let secretKey = await SecureStore.getItemAsync(USER_SECRET);
    if (username && secretKey ) {
      return {username, secretKey};
    }
    else{
      console.log("No user info stored in secret storage")
      return undefined;
    }
  } 
  catch (error) {
    console.error("Error retrieving the value: " + error);
  }
}

export async function getValueFor(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } 
  } 
  catch (error) {
    console.error("Error retrieving the value: " + error);
  }
}

async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } 
  catch (error) {
    console.error("Error saving the value: " + error);
  }
}

// TODO: Remove function when login sign up implemented 
// Sets the secretKey from fetched mock username public key
