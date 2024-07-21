//Temp imports to get Data-------
import jsonForAccountData from "@src/mock/accountResponse.json";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
//------
import {
  CircularButton,
} from "@components/atoms/CircularButton";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { IBalance, IStartActionButton, ITransaction } from "@types/types";
import { StartActionButtons } from "@components/molecules/StartActionButtons";
import { GiftCardTile } from "@components/molecules/GiftCardTile";
import { TransactionHistory }  from '@components/molecules/TransactionHistory';

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
          rightHeaderComponent={<CircularButton name="settings" as="Feather" radius="$full" />}
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

