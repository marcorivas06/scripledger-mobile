import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { CircularButton } from "@components/atoms/CircularButton";
import { ToggleHistory } from "@components/atoms/ToggleHistory";
import {
  Box,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarBadge,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import jsonForTransactions from "@src/mock/accountResponseTransactions.json";
import { IBalance, IStartActionButton, ITransaction } from "@types/types";

export function History() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [filteredTransactions, setfilteredTransactions] = useState([]);

  const handleTabSelect = (tab) => {
    console.log({ tab });
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

  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <Section isHigherOpacity={false}>
          <MyHeader
            title="History"
            isHomePage={false}
            rightHeaderComponent={
              <CircularButton name="settings" as="Feather" radius="$full" />
            }
          />
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

const AvatarTransaction = ({ name, date, amount }) => {
  return (
    <Box borderBottomWidth={1} borderBottomColor="#CAC4D0" padding={10}>
      <HStack space="lg" justifyContent="space-between" alignItems="center">
        <View>
          <HStack space="md">
            <Avatar>
              <AvatarFallbackText>{name}</AvatarFallbackText>
              <AvatarBadge />
            </Avatar>
            <VStack>
              <Heading size="sm">{name}</Heading>
              <Text size="sm">{name}</Text>
            </VStack>
          </HStack>
        </View>
        <Text>{amount}</Text>
      </HStack>
    </Box>
  );
};
