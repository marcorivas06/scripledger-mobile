import { MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { GetBrandsTitleForId, SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";

export const TransactionHistory = ({transactions}) => {
  const types = {
    Pay: { color: 'red', sign: '-' },
    Send: { color: 'blue', sign: '-' },
    Receive: { color: 'green', sign: '+' }
  };

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
            transactions.map((transaction, index) => {
              const name = GetBrandsTitleForId(transaction.token_id);
              const { color, sign } = types[transaction.type] || { color: 'black', sign: '' };
              
              return(
              <HStack flex={3} key={`${transaction.token_id}-${index}`} style={styles.transaction}>
              
              <View flex={2} width={200}>
                <HStack  alignItems='center'>
                  <SvgComponent id={transaction.token_id} style={styles.svgIcon} />
                  <Text style={[styles.tokenName, { fontFamily: 'DarkerGrotesque-Bold' }]}>
                    {transaction.type} {name}
                  </Text>
                </HStack>
              </View>
                
                <VStack flex={1}>
                  <Text style={[styles.balance, { color: color }]}>
                    {sign}{parseFloat(transaction.balance).toFixed(2)}
                  </Text>
                  <Text style={styles.date}>{transaction.date}</Text>
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
  }
});
