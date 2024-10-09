//Temp imports to get Data-------
import jsonForAccountData from "@src/mock/accountResponse.json";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
//------
import { CircularButton } from "@components/atoms/CircularButton";
import {
  Page,
  MyHeader,
  Section,
} from "@components/molecules/Page";
import { Button, HStack, Text, View, VStack } from "@gluestack-ui/themed";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { IBalance, IStartActionButton, ITransaction } from "@types/types";
import { StartActionButtons } from "@components/molecules/StartActionButtons";
import {
  HorizontalGiftCardTile,
  VerticalGiftCardTile,
} from "@components/molecules/GiftCardTile";
import { TransactionHistory } from "@components/molecules/TransactionHistory";
import { SCREENS } from "@constants";
import { TouchableOpacity, StyleSheet } from "react-native";
import { TabIcon } from "@components/atoms/TabIcon";
import { STACKS } from "@types/routes";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { useUserService } from "@services/useUserService";
import { updateUser, updateUserWallet } from "@store/user";
import { getPublicKeysFromTransaction, getMintPublicKeyFromTransaction, getMintPublicKeyAndTransactionTypeFromTransaction } from "@utils/solanaUtils";
// import { getAllTokenBalances } from "@utils/solanaUtils";
//

export function Start({ navigation }) {
  //App State
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.user);
  const allBrands = useAppSelector((state) => state.brands );
  // Mock Data for Balances
  // const [balances, setBalances] = useState<IBalance[]>([]);
  const [curatedTransactions, setCuratedTransactions] = useState<IBalance[]>([]);
  
  const [isLoading, setIsLoading] = useState(false)
  const { fetchUser, fetchAllBrands, fetchFromTransactionHash } = useUserService();
  
  // Need transactions to be in format 
    // transaction.token_id
    // transaction.type 
    // transaction.balance
    // transaction.date

  // ----
  useEffect(() => {
    // const { balances } = jsonForAccountData;
    // setBalances(balances);
    // setTransactions(transactions);
    fetchUserData();
  }, []);
  
  const mintToBrandMap = useMemo(() => {
    const mintToBrandMap = new Map();

    allBrands.brands.forEach(({ brandName, tokens }) => {
      tokens.forEach((token) => {
        mintToBrandMap.set(token['mintPublicKey'], brandName);
      });
    });
    return mintToBrandMap;
  }, [allBrands.brands])
  
  useEffect(() => {
    if(!isLoading && user.userWallet){
      const updateUserWalletWithBrandInfo = () => {
        // Step 2: Use the Map to get transaction info
        const getAllTransactionInfo = user.userWallet
          .map(({ mintAddress, tokenBalance }) => {
            const brandName = mintToBrandMap.get(mintAddress);
            if (brandName) {
              return { brandName, mintAddress, tokenBalance };
            }
            // Optionally handle cases where mintAddress is not found
            return null;
          })
          .filter((item) => item !== null); // Remove any null entries

        // Setting userWallet State to include brandName
        dispatch(updateUserWallet(getAllTransactionInfo));
      };

      updateUserWalletWithBrandInfo();
    } 
    
  }, [isLoading]);
  
  const fetchUserData = useCallback(
    async() => {
      setIsLoading(true);
      try {
        await fetchAllBrands(); 
        await fetchUser();
      } catch (error) {
        console.error("Error at fetchUserData: " + error);
      }
      setIsLoading(false);
    },
    [],
  )

  // useEffect(() => {
    
  //   const filterTransactions = async () => {
      
  //     let arrayOfTransactionHash = [];
  //     let arrayOfMintPublicKeys = [];
      
  //     if (user.userTransactions) {
  //       // Sorting transactions by date
  //       // Sort transactions by date
        
  //       user.userTransactions.map(({transactionHash}) => {
  //         arrayOfTransactionHash.push(transactionHash);
  //       });
  //       for (const transactionHash of arrayOfTransactionHash) {
  //         try {
  //           const transactionPublicKeys = await getMintPublicKeyFromTransaction(transactionHash);
  //           arrayOfMintPublicKeys.push(transactionPublicKeys);
  //         } catch (error) {
  //           console.error(`Error processing transaction ${transactionHash}:`, error);
  //         }
          
  //       }
  //   }
  // }
  
  // if(!isLoading && user.userTransactions){
  //   filterTransactions();
  // } 

  // }, [user.userTransactions])

  useEffect(() => {
    const filterTransactions = async () => {
      if (user.userTransactions) {
        console.log(Object.keys(user.userTransactions[0]))
        const arrayOfTransactionHash = user.userTransactions.map(({ transactionHash, readableTimestamp }) => {return {transactionHash, readableTimestamp}});
  
        const transactionsWithBrandNames = [];
  
        for (const { transactionHash, readableTimestamp} of arrayOfTransactionHash.slice(0,5)) {
          try {
            const mintPublicKeysInfo = await getMintPublicKeyAndTransactionTypeFromTransaction(transactionHash);
  
            const brandsInTransaction = mintPublicKeysInfo.map(({mintPublicKey, transactionType, balanceChange}) => {
              const token_id = mintToBrandMap.get(mintPublicKey) || 'Unknown';
              return { token_id, transactionType, readableTimestamp, mintPublicKey, balanceChange };
            });
  
            transactionsWithBrandNames.push({
              brandsInTransaction: brandsInTransaction[0],
            });
          } catch (error) {
            console.error(`Error processing transaction ${transactionHash}:`, error);
          }
        }
  
        // Dispatch an action or set state to store transactionsWithBrandNames
        setCuratedTransactions(transactionsWithBrandNames);
        // console.log(transactionsWithBrandNames[0].brandsInTransaction[0].readableTimestamp)
        // dispatch(updateUserTransactionsWithBrandNames(transactionsWithBrandNames));
      }
    };
  
    if (!isLoading && user.userTransactions) {
      filterTransactions();
    }
  }, [user.userTransactions, isLoading, mintToBrandMap]);


  const navigateToScreenHidingTabs = (screen) => {
    navigation.navigate(screen, {
      hideTabs: true,
    });
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const handleSeeAllBalances = (screen) => {
    navigation.navigate(screen, {
      balances: user.userWallet,
    });
  };

  const handleSettings = () => {
    navigation.navigate(STACKS.MODAL, {
      screen: SCREENS.MODAL_STACK.SETTINGS,
    });
  };

  const actions: Array<IStartActionButton> = [
    {
      name: "Add",
      iconName: "line-scan", // Replace with the actual icon name or SVG path
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon library
      gradientColor: ["#434343", "#1C1C1C"], // Dark gray to black gradient
      action: () => {
        navigateToScreenHidingTabs(SCREENS.START_STACK.ADD);
      },
    },
    {
      name: "Pay",
      iconName: "wallet", // Replace with the actual icon name or SVG path
      iconAs: "AntDesign", // Replace with the actual icon library
      gradientColor: ["#434343", "#1C1C1C"], // Dark gray to black gradient
      action: () => navigateToScreen(SCREENS.START_STACK.PAY),
    },
    {
      name: "Send",
      iconName: "email-send", // Replace with the actual icon name or SVG path
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon library
      gradientColor: ["#434343", "#1C1C1C"], // Dark gray to black gradient
      action: () => handleSeeAllBalances(SCREENS.START_STACK.SEND),
    },
    {
      name: "Receive",
      iconName: "hand-holding-dollar", // Replace with the actual icon name or SVG path
      iconAs: "FontAwesome6", // Replace with the actual icon library
      gradientColor: ["#434343", "#1C1C1C"], // Dark gray to black gradient
      action: () => navigateToScreen(SCREENS.START_STACK.RECEIVE),
    },
  ];


  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <MyHeader
          title="Welcome"
          userName={user.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : ''}
          isHomePage={true}
          rightHeaderComponent={
            <CircularButton
              name="settings"
              as="Feather"
              radius="$full"
              onPress={handleSettings}
            />
          }
        />
        <Section isHigherOpacity={true}>
          <MyHeader
            title="My Wallet"
            marginBottom={15}
            rightHeaderComponent={
              <TouchableOpacity
                onPress={() =>
                  handleSeeAllBalances(SCREENS.START_STACK.ALL_GIFTCARDS)
                }
                style={styles.goBackButton}
              >
                  <Text marginHorizontal={5} style={styles.goBackText}>
                    See All
                  </Text>
              </TouchableOpacity>
            }
            isSubsectionHeader={true}
          />
          <HorizontalGiftCardTile />
        </Section>
        <Section isHigherOpacity={false}>
          <StartActionButtons actionArray={actions} />
          <TransactionHistory transactions={curatedTransactions} />
        </Section>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  goBackButton: {
    backgroundColor: "#FFF1FF", // Change this to your desired background color
    padding: 8,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
    
  },
  goBackText: {
    fontFamily: "DarkerGrotesque-Medium",
    fontSize: 15,
    color: "#51382F",
  },
});
