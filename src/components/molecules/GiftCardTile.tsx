
import { ScrollView } from "react-native-gesture-handler";
import { GiftCard } from "@components/molecules/GiftCard";

export const GiftCardTile = ({balances}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: "row" }}
    >
      {balances.map((balanceInfo, index) => (
        <GiftCard
          key={`${index}-${balanceInfo.token_id}`}
          balance={balanceInfo.balance}
          token_id={balanceInfo.token_id}
          token_name={balanceInfo.token_name}
        />
      ))}
    </ScrollView>
  );
};
