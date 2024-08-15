import { MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { GetBrandsTitleForId, SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { TabIcon } from "@components/atoms/TabIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

export const TransactionHistory = ({transactions}) => {
  const types = {
    Sent: { color: 'red', sign: '-' },
    Receive: { color: 'green', sign: '+' }
  };

  return(
      <VStack>
        <MyHeader
              title="Transactions"
              marginBottom={5}
              rightHeaderComponent=
              {
                <TouchableOpacity>
                <HStack style={{alignItems:'center', justifyContent:'center' }} >
                  <Text fontFamily="DarkerGrotesque-SemiBold" fontSize={18} color="#A5A2A1">Sort by</Text>
                  <TabIcon marginTop={5} as="Entypo" name="triangle-down" size="xs" color="#A5A2A1" /> 
                </HStack>
              </TouchableOpacity>

              }
              isSubsectionHeader={true}
              style={{marginBottom:20}}
            />
        <Box style={styles.cardContainer}>
          <VStack alignItems='flex-start' marginHorizontal={15} >
          {
            transactions.map((transaction, index) => {
              const name = GetBrandsTitleForId(transaction.token_id);
              const { color, sign } = types[transaction.type] || { color: 'black', sign: '' };
              
              return(
              <HStack  key={`${transaction.token_id}-${index}`} style={styles.transaction} >
                  <HStack justifyContent="space-between"  alignItems="center">
                    <SvgComponent id={transaction.token_id} style={styles.svgIcon} />
                    <Text width={180}  style={[styles.tokenName, { fontFamily: 'DarkerGrotesque-Medium' }]}>
                      {transaction.type} {name}
                    </Text>
                  </HStack>
                
                  <VStack >
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
    marginHorizontal: 10,
    justifyContent:'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    padding:10,
  },
  transaction: {
    alignItems: 'center', // To align items vertically
    marginVertical:5
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
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Medium',
  },
  date: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Medium',
  }
});
