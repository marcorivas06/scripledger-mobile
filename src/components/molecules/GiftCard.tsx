import { StyleSheet, View, Text } from 'react-native';
import { SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { Box, VStack, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export const GiftCard = ({ balance, token_id, token_name }) => (
  <TouchableOpacity>
    <Box style={styles.cardContainer}>
        <VStack>
          <HStack style={styles.header}>
            <SvgComponent id={token_id} style={styles.svgIcon} />
            <Text style={styles.tokenName}>{token_name}</Text>
          </HStack>
          <Text style={styles.balance}>
            $ {balance}
          </Text>
        </VStack>
      </Box>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    height: 120,
    width: 140,  // Adjust width as needed
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
    marginRight: 10,  // Adjust space between icon and text
  },
  tokenName: {
    fontSize: 15,
    fontWeight: '600',  // SemiBold equivalent
    fontFamily: 'DarkerGrotesque-SemiBold',  // Make sure font is correctly linked
    color: '#51382F',
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Bold',  // Make sure font is correctly linked
    color: '#51382F',
    marginTop: 5,
    padding: 15,
  }
});