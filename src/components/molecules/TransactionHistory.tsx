import { MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { GetBrandsTitleForId, SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { TabIcon } from "@components/atoms/TabIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

export const TransactionHistory = ({transactions}) => {
  const types = {
    Sent: { color: 'red', sign: '$' },
    Received: { color: 'green', sign: '$+' },
    Unchanged: { color: 'grey', sign: '---' }
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
                  {/* <Text fontFamily="DarkerGrotesque-SemiBold" fontSize={18} color="#A5A2A1">Sort by</Text>
                  <TabIcon marginTop={5} as="Entypo" name="triangle-down" size="xs" color="#A5A2A1" />  */}
                </HStack>
              </TouchableOpacity>

              }
              isSubsectionHeader={true}
              style={{marginBottom:20}}
            />
        <Box style={styles.cardContainer}>
          <VStack alignItems='flex-start' marginHorizontal={15} >
          {
            transactions?.map(({brandsInTransaction}, index) => {              
              // console.log(brandsInTransaction.readableTimestamp)
              const name = GetBrandsTitleForId(brandsInTransaction.token_id);
              const { color, sign } = types[brandsInTransaction.transactionType] || { color: 'black', sign: '' };
              
              return(
              <HStack  key={`${brandsInTransaction.token_id}-${index}`} style={styles.transaction} >
                  <HStack justifyContent="space-between"  alignItems="center">
                    <SvgComponent id={brandsInTransaction.token_id} style={styles.svgIcon} />
                    <VStack alignItems="flex-start" >
                      <Text width={180} style={[styles.tokenName, { fontFamily: 'DarkerGrotesque-Medium' }]}>
                        {name}
                      </Text>
                      <Text width={120} style={styles.transactionType}>
                        {brandsInTransaction.transactionType}
                      </Text>
                    </VStack>
                  </HStack>
                
                  <VStack >
                    <Text style={[styles.balance, { color: color }]}>
                      {sign}{parseFloat(brandsInTransaction.balanceChange).toFixed(4)}
                    </Text>
                    <Text style={styles.date}>{brandsInTransaction.readableTimestamp}</Text>
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
    paddingHorizontal: 5,
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
  },
  transactionType: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-Medium',
    paddingHorizontal: 5,
  }
});
