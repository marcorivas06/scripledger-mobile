
import { ScrollView } from "react-native-gesture-handler";
import { VerticalGiftCard, HorizontalGiftCard } from "@components/molecules/GiftCard";
import { FlatList, View, StyleSheet } from 'react-native';

export const HorizontalGiftCardTile = ({balances}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: "row", marginTop:-15 }}
    >
      {balances.map((balanceInfo, index) => (
        <HorizontalGiftCard
          key={`${index}-${balanceInfo.token_id}`}
          balance={balanceInfo.balance}
          token_id={balanceInfo.token_id}
          token_name={balanceInfo.token_name}
        />
      ))}
    </ScrollView>
  );
};

export const VerticalGiftCardTile = ({ balances, ...props }) => {
  return (
    <View style={styles.container}>
      {balances.map((balance, index) => (
        <View key={`${index}-${balance.token_id}`} style={styles.cardContainer}>
          <VerticalGiftCard
            balance={balance.balance}
            token_id={balance.token_id}
            token_name={balance.token_name}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row', // Change to 'row' to allow items to line up side by side
    flexWrap: 'wrap', // Allow wrapping to next line
  },
  cardContainer: {
    width: '50%', // Set width to 50% to ensure two columns
    padding: 10, // Adjust padding as needed
  },
});