import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { CircularButton } from "@components/atoms/CircularButton";
import { ToggleHistory } from "@components/atoms/ToggleHistory";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
import { AvatarTransaction } from "@components/molecules/AvatarTransactions";
import { SCREENS } from "@constants";
import { STACKS } from "@types/routes";

export function History({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [filteredTransactions, setfilteredTransactions] = useState([]);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  //TODO
  //event->selectedTab->fetch(selectedTab) 
  useEffect(() => {
    const { transactions } = jsonForTransactions;
    setTransactions(transactions);
  }, []);

  useEffect(() => {
    const liveTransactions = transactions.filter((transaction) => {
      switch (selectedTab) {
        case "Payment Sent":
          return transaction.type == "Sent";
        case "Received":          
          return transaction.type == "Receive";
        case "All":
          return transaction;
      }
    });

    setfilteredTransactions(liveTransactions);
  }, [selectedTab, transactions]);

  const handleSettings = () => {
    navigation.navigate(STACKS.MODAL, {
      screen: SCREENS.MODAL_STACK.SETTINGS
    });
  };

  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <MyHeader
          title="History"
          isHomePage={false}
          marginBottom={20}
          rightHeaderComponent={
            <CircularButton name="settings" as="Feather" radius="$full" onPress={handleSettings} />
          }
        />
        <Section isHigherOpacity={false}>
          <ToggleHistory
            handleTabSelect={handleTabSelect}
            selectedTab={selectedTab}
          />
          <View
            marginTop={10}
            width={350}
            borderRadius={10}
            padding={10}
            backgroundColor="rgba(103, 80, 164, 0.1)"
          >
            {filteredTransactions.map((transaction, index) => (
              <AvatarTransaction
                key={`${transaction.username}-${index}`}
                name={transaction.username}
                date={transaction.date}
                amount={transaction.balance}
              />
            ))}
          </View>
        </Section>
      </ScrollView>
    </Page>
  );
}

