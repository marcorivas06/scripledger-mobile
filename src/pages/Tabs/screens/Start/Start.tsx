//Temp imports to get Data-------
import jsonForAccountData from "@src/mock/accountResponse.json";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
//------
import {
  CircularButton,
  CircularColoredButton,
} from "@components/atoms/CircularButton";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { IAccount, IBalance, IStartActionButton, ITransaction } from "@types/types";
import { GiftCard } from "@components/molecules/GiftCard";
import { StartActionButtons } from "@components/molecules/StartActionButtons";
import { GiftCardTile } from "@components/molecules/GiftCardTile";

import { StyleSheet } from "react-native";
import { GetBrandsTitleForId, SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
//[PH]
// Would come from a request
const actions: Array<IStartActionButton> = [
  {
    name: "Add",
    iconName: "line-scan", // Replace with the actual icon name or SVG path
    iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
    gradientColor: ["#2A864F", "#1BCE63"],
  },
  {
    name: "Pay",
    iconName: "wallet", // Replace with the actual icon name or SVG path
    iconAs: "AntDesign", // Replace with the actual icon name or SVG path
    gradientColor: ["#F45B89", "#FD8FB0"],
  },
  {
    name: "Send",
    iconName: "email-send", // Replace with the actual icon name or SVG path
    iconAs: "MaterialCommunityIcons", // Replace with the actual icon name or SVG path
    gradientColor: ["#B14FFF", "#CA8FF8"],
  },
  {
    name: "Receive",
    iconName: "hand-holding-dollar", // Replace with the actual icon name or SVG path
    iconAs: "FontAwesome6", // Replace with the actual icon name or SVG path
    gradientColor: ["#258CD6", "#6DC0FC"],
  },
];

export function Start({ navigation }) {
  // Mock Data for Balances
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  useEffect(() => {
    const { balances } = jsonForAccountData;
    const { transactions } = jsonForTransactions;

    setBalances(balances);
    setTransactions(transactions);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Page fullWidth>
        <MyHeader
          title="Welcome"
          userName="Marcos"
          isHomePage={true}
          rightHeaderComponent={<CircularButton name="settings" as="Feather" />}
        />
        <Section isHigherOpacity={true}>
          <MyHeader
            title="My Wallet"
            rightHeaderComponent={<Text>See all</Text>}
            isSubsectionHeader={true}
          />
          <GiftCardTile
          balances={balances}
          />
        </Section>
        <Section isHigherOpacity={false}>
          <StartActionButtons actionArray={actions} />
          <TransactionHistory transactions={transactions}/>
        </Section>
      </Page>
    </ScrollView>
  );
}

const TransactionHistory = ({transactions}) => {
  return(
    
      <VStack>
        <MyHeader
              title="Latest Transactions"
              rightHeaderComponent={<Text>Sort by</Text>}
              isSubsectionHeader={true}
            />
        <Box style={styles.cardContainer}>
          <VStack>
          {
            transactions.map((transaction,index) => {
              const name = GetBrandsTitleForId("0");
              console.log(transaction)
              return(
              <HStack key={`${transaction.token_id}-${index}` } style={styles.header}>
                <SvgComponent id={transaction.token_id} style={styles.svgIcon} />
                <Text style={[styles.tokenName, {fontFamily:'DarkerGrotesque-Bold'}] }>
                  {name}
                  </Text>
                <VStack>
                  <Text>Price</Text>
                  <Text>Date</Text>
                </VStack>
              </HStack>
              )
            })}
          </VStack>      
        </Box>
      </VStack>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    marginBottom:35,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgIcon: {
    marginRight: 10,
  },
  tokenName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'DarkerGrotesque-Black',
    color: '#51382F',
    padding:5,
  },
  balance: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Light',
    color: '#51382F',
    marginTop: 5,
    padding: 5,
  }
});
