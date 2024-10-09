import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { updateUser, updateUserTransactions } from '@store/user';
import { updateBrands } from '@store/brands';
import { getOrCreateUserSecureCredentials } from '@utils/secureStore';
import { IUserPublic, IUserWallet } from '@types/types';
import { getPublicKeysFromTransaction, getuserWallet } from '@utils/solanaUtils';
import { useAppDispatch } from '@hooks/store';

export const useUserService = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { username } = await getOrCreateUserSecureCredentials();
      
      const accountResponse = await fetch(`https://scripledger.azurewebsites.net/accounts/username/${username}`);
      if (!accountResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const user: IUserPublic = await accountResponse.json();    
      user.userWallet = await getuserWallet(user);
      
      const transactionsResponse = await fetch(`https://scripledger.azurewebsites.net/transaction/user/${user.accountPublicKey}`);
      if (!transactionsResponse.ok) {
        throw new Error('Failed to fetch user Transactions');
      }
      const transactionData = await transactionsResponse.json();

      user.userTransactions = transactionData;

      dispatch(updateUser(user)); 
    } 
    catch (error) {
      console.error("Error when fetching the user: " + error);
    }
    setIsLoading(false); 
  }, [dispatch]);
  
  const fetchAllBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://scripledger.azurewebsites.net/brands/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const brands = await response.json();
      dispatch(updateBrands(brands)); 
    } 
    catch (error) {
      console.error("Error when fetching the user: " + error);
    } 
    setIsLoading(false);
  }, [dispatch]);
  
  const fetchFromTransactionHash = useCallback(async (accountKeys) => {
    setIsLoading(true);
    try {
      const brands = [];
      console.log(accountKeys)
      // Log or return the public keys
      // for (const accountKey of accountKeys) {
      //   console.log("Fetching With Public Key")
      //   console.log(accountKey)
      //   const response = await fetch(`https://scripledger.azurewebsites.net/brands/publicKey/${accountKey}`);
        
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch brand data');
      //   }

      //   const brand = await response.json();     
      //   brands.push(brand);
      // }

      return brands;
    } catch (error) {
      console.error("Error when fetching the brand: " + error);
    }
    setIsLoading(false);
  }, [dispatch]);

  return {
    fetchUser,
    fetchAllBrands,
    fetchFromTransactionHash,
    isLoading
  }

  //fetchUser 
  // development 
    // 
    //Look into secure storage
      //  if username, look up username

  // production 
    //Look into secure storage,
      //  if username, look up username
      //  go back to login sign up  
}
