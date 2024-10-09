import { StyleSheet, View, Text } from 'react-native';
import { SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { Box, VStack, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export const HorizontalGiftCard = ({ balance, token_id, token_name }) => {
  return (
  <TouchableOpacity>
    <Box style={horizontalStyles.cardContainer}>
        <VStack>
          <HStack style={horizontalStyles.header}>
            <SvgComponent id={token_id} />
            <Text style={horizontalStyles.tokenName}>{token_name}</Text>
          </HStack>
          <Text style={[horizontalStyles.balance, {fontFamily:'DarkerGrotesque-SemiBold', color:'#51382F'}]}>
            $ {balance}
          </Text>
        </VStack>
      </Box>
  </TouchableOpacity>
);
}

export const VerticalGiftCard = ({ balance, token_id, token_name, onPress }) => {
  return (
  <TouchableOpacity onPress={onPress} >
    <Box style={verticalStyles.cardContainer}>
        <HStack alignItems='center'>
            <SvgComponent id={token_id} />
            <VStack marginHorizontal={20} justifyContent='flex-end' >
              <Text style={verticalStyles.tokenName}>{token_name}</Text>
              <Text style={[verticalStyles.balance, {fontFamily:'DarkerGrotesque-SemiBold', color:'#51382F'}]}>
                $ {balance}
              </Text>
            </VStack>
        </HStack>
      </Box>
  </TouchableOpacity>
);
}

const horizontalStyles = StyleSheet.create({
  cardContainer: {
    height: 120,
    width: 150,  // Adjust width as needed
    backgroundColor: '#FFF',
    borderRadius: 6,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft:10,
    fontFamily:'DarkerGrotesque-SemiBold',
    color:'#51382F'
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

const verticalStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    alignItems:'center',
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily:'DarkerGrotesque-SemiBold',
    color:'#51382F'
  },
  balance: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Light',
    color: '#51382F',
    
  }
});