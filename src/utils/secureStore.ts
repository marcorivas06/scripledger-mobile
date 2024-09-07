import * as SecureStore from 'expo-secure-store';
import { generateRandomNewKeyPair } from './cryptoUtils';

//Mocking UserName
import { MOCK_USERNAME } from '@constants/user.constants';

export async function getOrCreateUserSecretKey() {
  const userSecretKey = await getValueFor(MOCK_USERNAME);
  try {
    if ( userSecretKey === undefined) {
      const newKeyPair = await generateRandomNewKeyPair();
      const newSecretKey = JSON.stringify(newKeyPair.secretKey);
      save(MOCK_USERNAME, newSecretKey)
      alert(`New Secret Key Created ${userSecretKey}` )
    } 
    else {
      alert(`Secret Key Exists: ${userSecretKey}` )
      return userSecretKey
    }  
  } 
  catch (error) {
    console.log("Error creating Secret Key for SECURE STORAGE" + error);
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