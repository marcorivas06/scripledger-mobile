
import { VStack } from "@gluestack-ui/themed";
import { VerticalGiftCardTile } from "@components/molecules/GiftCardTile";
import { Page } from "@components/molecules/Page";
import { ScrollView } from "react-native-gesture-handler";

export function AllGiftCards({ route }){
  const balances = route.params?.balances;
  return (
    <Page fullWidth marginTop={50} >
      <ScrollView style={{ flex: 1 }} >
        <VStack width='100%' >
          <VerticalGiftCardTile balances={balances}/>
        </VStack>
      </ScrollView>
    </Page>
  )
}

