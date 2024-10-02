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
// import { getAllTokenBalances } from "@utils/solanaUtils";
//

export function Start({ navigation }) {
  //App State
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.user);
  const allBrands = useAppSelector((state) => state.brands );
  // Mock Data for Balances
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const { fetchUser, fetchAllBrands } = useUserService();
  const [isLoading, setIsLoading] = useState(false)

  // ----
  useEffect(() => {
    const { balances } = jsonForAccountData;
    const { transactions } = jsonForTransactions;
    setBalances(balances);
    setTransactions(transactions);
    fetchUserData();
    
  }, []);
  
  useEffect(() => {
    // Step 1: Build a Map from mintPublicKey to brandName
    if(!isLoading && user.userWallet){
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

      dispatch(updateUserWallet(getAllTransactionInfo))
      
      console.log(user.userWallet)
      
    }    
  }, [isLoading]);
  
  useEffect(() => {
    console.log("----------CorrectValues----------")
    console.log(user.userTransactions)
    console.log("------------")
  },[user.userWallet])



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
      balances: balances,
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
          <TransactionHistory transactions={transactions} />
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
