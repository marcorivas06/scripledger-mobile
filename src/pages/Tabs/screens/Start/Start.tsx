//Temp imports to get Data-------
import jsonForAccountData from "@src/mock/accountResponse.json";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
//------
import { CircularButton } from "@components/atoms/CircularButton";
import { Page, MyHeader, Section, AnimatedSection } from "@components/molecules/Page";
import { Button, HStack, Text, View, VStack } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { IBalance, IStartActionButton, ITransaction } from "@types/types";
import { StartActionButtons } from "@components/molecules/StartActionButtons";
import { HorizontalGiftCardTile, VerticalGiftCardTile } from "@components/molecules/GiftCardTile";
import { TransactionHistory } from "@components/molecules/TransactionHistory";
import { SCREENS } from "@constants";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TabIcon } from "@components/atoms/TabIcon";
import { STACKS } from "@types/routes";


import * as Crypto from 'expo-crypto';
import { ethers } from "ethers";
// 

// Would come from a request
export function Start({ navigation }) {
  // Mock Data for Balances
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  // ---
  //Generate Mnemonic generates the phrase. 
  async function generateMnemonic(){
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    const mnemonic = ethers.Mnemonic.fromEntropy(randomBytes)
    return mnemonic.phrase;
  };


async function mnemonicToSeed(mnemonic: string){
    const bip39 = await import("bip39");
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return Buffer.from(seed).toString("hex");
  };

  async function test() {
    try {
      
      const mnemonic = await generateMnemonic();
      const seed = await mnemonicToSeed(mnemonic);
      console.log(seed);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  test();

  // mnemonicToSeed(x);

  

  // useEffect(() => {
  //   (async () => {
  //     const x  = await generateMnemonic();
  //     console.log(x)
  //   })();
    
  // }, []);
  
  
  // ----
  useEffect(() => {
    const { balances } = jsonForAccountData;
    const { transactions } = jsonForTransactions;

    setBalances(balances);
    setTransactions(transactions);
  }, []);

  const navigateToScreenHidingTabs = (screen) => {
    navigation.navigate(screen, {
      hideTabs:true
    });
  };
  
  const navigateToScreen = (screen ) => {
    navigation.navigate(screen);
  };

  const handleSeeAllBalances = (screen) => {
    navigation.navigate(screen, { 
      balances: balances
    });
  };
  
  const handleSettings = () => {
    navigation.navigate(STACKS.MODAL, {
      screen: SCREENS.MODAL_STACK.SETTINGS
    });
  };

  const actions: Array<IStartActionButton> = [
    {
      name: "Add",
      iconName: "line-scan", // Replace with the actual icon name or SVG path
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
      gradientColor: ["#2A864F", "#1BCE63"],
      action: () => { navigateToScreenHidingTabs(SCREENS.START_STACK.ADD) }
    },
    {
      name: "Pay",
      iconName: "wallet", // Replace with the actual icon name or SVG path
      iconAs: "AntDesign", // Replace with the actual icon name or SVG path
      gradientColor: ["#F45B89", "#FD8FB0"],
      action: () =>  navigateToScreen(SCREENS.START_STACK.PAY)
    },
    {
      name: "Send",
      iconName: "email-send", // Replace with the actual icon name or SVG path
      iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
      gradientColor: ["#B14FFF", "#CA8FF8"],
      action: () =>  handleSeeAllBalances(SCREENS.START_STACK.SEND)
    },
    {
      name: "Receive",
      iconName: "hand-holding-dollar", // Replace with the actual icon name or SVG path
      iconAs: "FontAwesome6", // Replace with the actual icon name or SVG path
      gradientColor: ["#6DC0FC", "#258CD6"],
      action: () =>  navigateToScreen(SCREENS.START_STACK.RECEIVE)
    },
  ];

  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <MyHeader
          title="Welcome"
          userName="Marcos"
          isHomePage={true}
          rightHeaderComponent={
            <CircularButton name="settings" as="Feather" radius="$full" onPress={handleSettings} />
          }
        />
        <Section isHigherOpacity={true}>
          <MyHeader
            title="My Wallet"
            marginBottom={15}
            rightHeaderComponent={
              <TouchableOpacity onPress={() => handleSeeAllBalances(SCREENS.START_STACK.ALL_GIFTCARDS)} style={styles.goBackButton}>
                <HStack alignItems="center">
                  <TabIcon as="MaterialCommunityIcons" name="eye" size="xs" />
                  <Text marginHorizontal={5} style={styles.goBackText}>See All</Text>
                </HStack>
              </TouchableOpacity>
            }
            isSubsectionHeader={true}
          />
          <HorizontalGiftCardTile balances={balances} />
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
    backgroundColor: '#FFF1FF', // Change this to your desired background color
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
    width:'30%',
    
  },
  goBackText: {
    fontFamily: 'DarkerGrotesque-Medium',
    fontSize: 15,
    color:'#51382F'
  },
  });