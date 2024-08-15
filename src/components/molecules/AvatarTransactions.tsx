import React from "react";
import { View } from "react-native";
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

export const AvatarTransaction = ({ name, date, amount }) => {
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
