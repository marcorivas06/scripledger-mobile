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
import { useCallback, useEffect, useRef, useState } from "react";
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
import { getPublicKeysFromTransaction } from "@utils/solanaUtils";
// import { getAllTokenBalances } from "@utils/solanaUtils";
//

export function Start({ navigation }) {
  //App State
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.user);
  const allBrands = useAppSelector((state) => state.brands );
  // Mock Data for Balances
  // const [balances, setBalances] = useState<IBalance[]>([]);
  
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
    const { transactions } = jsonForTransactions;
    // setBalances(balances);
    // setTransactions(transactions);
    fetchUserData();
  }, []);
  
  useEffect(() => {
    if(!isLoading && user.userWallet){
      const updateUserWalletWithBrandInfo = () => {
        const mintToBrandMap = new Map();

        allBrands.brands.forEach(({ brandName, tokens }) => {
          tokens.forEach((token) => {
            mintToBrandMap.set(token['mintPublicKey'], brandName);
          });
        });

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

  useEffect(() => {
    
    const filterTransactions = async () => {
      
      let arrayOfTransactionHash = [];
      let arrayofPublicKeys = [];
      
      if (user.userTransactions) {
        user.userTransactions.map(({transactionHash}) => {
          arrayOfTransactionHash.push(transactionHash);
        });
        for (const transactionHash of arrayOfTransactionHash.slice(0,5)) {
          try {
            console.log('===========================================')
            const transactionPublicKeys = await getPublicKeysFromTransaction(transactionHash);
            arrayofPublicKeys.push(transactionPublicKeys);
            
          } catch (error) {
            console.error(`Error processing transaction ${transactionHash}:`, error);
          }
          // Wait for 1 second before the next request
          // await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // const dataArrayForTransactions = await fetchFromTransactionHash(arrayofPublicKeys);
        // console.log(dataArrayForTransactions)
    }
  }
  
  if(!isLoading && user.userTransactions){
    filterTransactions();
  } 

  }, [user.userTransactions])


  // const fetchFromTransactionHashUI = useCallback(async (publicKey) => {
  //   try {
  //     const brands = await fetchFromTransactionHash(publicKey);
  //     return brands;
  //   } catch (error) {
  //     console.error("Error at fetchFromTransactionHash: " + error);
  //   }
  // }, []);
  // Iterate allBrands.brands
  // For allBrands.brands[i] look at tokens and see if token.mintPublicKey = mintPublicKey
  // brands user.Transactions 

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
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
      gradientColor: ["#2A864F", "#1BCE63"],
      action: () => {
        navigateToScreenHidingTabs(SCREENS.START_STACK.ADD);
      },
    },
    {
      name: "Pay",
      iconName: "wallet", // Replace with the actual icon name or SVG path
      iconAs: "AntDesign", // Replace with the actual icon name or SVG path
      gradientColor: ["#F45B89", "#FD8FB0"],
      action: () => navigateToScreen(SCREENS.START_STACK.PAY),
    },
    {
      name: "Send",
      iconName: "email-send", // Replace with the actual icon name or SVG path
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
      gradientColor: ["#B14FFF", "#CA8FF8"],
      action: () => handleSeeAllBalances(SCREENS.START_STACK.SEND),
    },
    {
      name: "Receive",
      iconName: "hand-holding-dollar", // Replace with the actual icon name or SVG path
      iconAs: "FontAwesome6", // Replace with the actual icon name or SVG path
      gradientColor: ["#6DC0FC", "#258CD6"],
      action: () => navigateToScreen(SCREENS.START_STACK.RECEIVE),
    },
  ];

  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <MyHeader
          title="Welcome"
          userName={user.username}
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
                <HStack alignItems="center">
                  <TabIcon as="MaterialCommunityIcons" name="eye" size="xs" />
                  <Text marginHorizontal={5} style={styles.goBackText}>
                    See All
                  </Text>
                </HStack>
              </TouchableOpacity>
            }
            isSubsectionHeader={true}
          />
          <HorizontalGiftCardTile />
        </Section>
        <Section isHigherOpacity={false}>
          <StartActionButtons actionArray={actions} />
          {/* <TransactionHistory transactions={transactions} /> */}
        </Section>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  goBackButton: {
    backgroundColor: "#FFF1FF", // Change this to your desired background color
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
    width: "30%",
  },
  goBackText: {
    fontFamily: "DarkerGrotesque-Medium",
    fontSize: 15,
    color: "#51382F",
  },
});
