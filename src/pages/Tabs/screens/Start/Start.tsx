//Temp imports to get Data-------
import jsonForAccountData from '@src/mock/accountResponse.json'
//------
import { RightHeaderHome } from "@components/atoms/RightHeaderStart";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { Account, Balance } from '@types/types'
import { GiftCard } from '@components/molecules/GiftCard';

//[PH]
// Would come from a request
export function Start({ navigation }) {
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    const { balances } = jsonForAccountData;
    setBalances(balances);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}> 
      <Page fullWidth>
        <MyHeader
          title="Welcome"
          userName="Marcos"
          isHomePage={true}
          rightHeaderComponent={RightHeaderHome}
        />
        <Section isHigherOpacity={true}>
          <MyHeader
            title="My Wallet"
            rightHeaderComponent={() => <Text>See all</Text>}
            isSubsectionHeader={true}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}> 
            {balances.map((balanceInfo, index) => (
              <GiftCard
                key={index}
                balance={balanceInfo.balance}
                token_id={balanceInfo.token_id}
                token_name={balanceInfo.token_name}
              />
            ))}
          </ScrollView>
        </Section>
      </Page>
    </ScrollView>
  );
}