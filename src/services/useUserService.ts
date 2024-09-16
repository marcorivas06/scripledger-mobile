import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { updateUser } from '@store/user';
import { getOrCreateUserSecureCredentials } from '@utils/secureStore';
import { IUserPublic, IUserTransaction } from '@types/types';
import { createConnection, getAllTokenBalances } from '@utils/solanaUtils';
import { useAppDispatch } from '@hooks/store';

export const useUserService = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    
    const { username } = await getOrCreateUserSecureCredentials();
    
    try {
      const response = await fetch(`https://scripledger.azurewebsites.net/accounts/username/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const user: IUserPublic = await response.json();    
      const connection = await createConnection();
      const connectionInfo = {connection: connection, publicKey: user.accountPublicKey};
      const transactions:IUserTransaction[] = await getAllTokenBalances(connectionInfo);
      user.userTransactions = transactions;

      dispatch(updateUser(user)); 
    } 
    catch (error) {
      console.error("Error when fetching the user: " + error);
    } 
    finally {
      setIsLoading(false);  // Always stop loading, whether success or failure
    }
  }, [dispatch]);
  
  return {
    fetchUser,
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
