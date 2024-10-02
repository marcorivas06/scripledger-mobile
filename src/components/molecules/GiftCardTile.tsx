import { ScrollView, View, StyleSheet } from 'react-native';
import { VerticalGiftCard, HorizontalGiftCard } from "@components/molecules/GiftCard";
import { useAppSelector } from "@hooks/store";

const styles = StyleSheet.create({
  horizontalScroll: {
    flexDirection: "row", 
    marginTop: -15
  },
  verticalContainer: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: '50%',
    padding: 10,
  }
});

const GiftCardTile = ({ isHorizontal = false }) => {
  const userWallet = useAppSelector(state => state.user.userWallet);

  if (isHorizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {userWallet?.map((transaction, index) => (
          <HorizontalGiftCard
            key={`${index}-${transaction.brandName}`}
            balance={transaction.tokenBalance}
            token_id={transaction.brandName}
            token_name={transaction.brandName}
          />
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.verticalContainer}>
        {userWallet?.map((transaction, index) => (
          <View key={`${index}-${transaction.brandName}`} style={styles.cardContainer}>
            <VerticalGiftCard
              balance={transaction.tokenBalance}
              token_id={transaction.brandName}
              token_name={transaction.brandName}
            />
          </View>
        ))}
      </View>
    );
  }
};

export const HorizontalGiftCardTile = () => <GiftCardTile isHorizontal />;
export const VerticalGiftCardTile = () => <GiftCardTile />;
