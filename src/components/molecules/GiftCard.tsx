import { StyleSheet, View, Text } from 'react-native';
import { SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { Box, VStack, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import AppLoading from 'expo-app-loading';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';



export const GiftCard = ({ balance, token_id, token_name }) => {
  
  return (
  <TouchableOpacity>
    <Box style={styles.cardContainer}>
        <VStack>
          <HStack style={styles.header}>
            <SvgComponent id={token_id} style={styles.svgIcon} />
            <Text style={[styles.tokenName, {fontFamily:'DarkerGrotesque-Bold'}] }>{token_name}</Text>
          </HStack>
          <Text style={[styles.balance, {fontFamily:'DarkerGrotesque-SemiBold'}]}>
            $ {balance}
          </Text>
        </VStack>
      </Box>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 120,
    width: 150,  // Adjust width as needed
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