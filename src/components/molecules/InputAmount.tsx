import React from 'react';
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
import { Text, VStack, HStack, Button, View, Box, Input,InputField,Select,
SelectTrigger,
SelectInput,
SelectIcon,
SelectPortal,
SelectBackdrop,
SelectContent,
SelectDragIndicatorWrapper,
SelectDragIndicator,
SelectItem,
 } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { DropDownExchange } from '@components/atoms/DropDownExchange';

export const InputAmount = ({typeOfInput, data, ...props}) => {
  return (
    <Box style={styles.transparentBox}>
    <HStack  flex={3}>
      <VStack flex={1}>
        <Text height={20} padding={4} fontSize={9}>
          {typeOfInput}
        </Text>
        <Input
          variant="outline"
          size="xl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          borderWidth={0}
          marginTop={-10}
          marginLeft={-5}
          style={styles.input} // Apply custom styles here
        >
          <InputField 
          placeholder="0"
          selectTextOnFocus={false}
          $focus-color='black'
          style={styles.inputField} />
        </Input>
        </VStack>
        <View flex={2} alignItems='center' justifyContent='center' >
          <DropDownExchange data={data}/>
        </View>
      </HStack>
  </Box>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    marginBottom: 35,
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
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // To align items vertically
    paddingVertical: 5,
  },
  svgIcon: {
    marginRight: 10,
  },
  tokenName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'DarkerGrotesque-Black',
    color: '#51382F',
    padding: 5,
    flex: 1, // To take up the remaining space
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Light',
    padding: 5,
  },
  date: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Light',
  },
  transparentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0)', // Same color as the parent with transparency
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderRadius:10,
    borderColor:'#9AC8C8',
    marginVertical:20,
    height:63,
    width:286
  },
  input: {
    fontFamily: 'Josefin Sans', // Ensure this font is loaded in your project
    fontWeight: 'bold',
    color:'black'
  },
  inputField: {
    fontFamily: 'Josefin Sans', // Ensure this font is loaded in your project
    fontWeight: 'bold',
  },
  inputFieldActive: {
    fontFamily: 'Josefin Sans', // Ensure this font is loaded in your project
    fontWeight: 'bold',
  },
});
