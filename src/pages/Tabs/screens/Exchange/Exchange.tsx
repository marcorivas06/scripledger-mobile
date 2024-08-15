import React, { useEffect, useState } from "react";
import { CircularButton } from "@components/atoms/CircularButton";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import {
  Text,
  VStack,
  HStack,
  Button,
  View,
  Box,
  Input,
  InputField,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { InputAmount } from "@components/molecules/InputAmount";
import { ExchangeBrandsInfoBox } from "@components/atoms/ExchangeBrandsInfoBox";
import JsonForBrands  from "@src/mock/brands.json";
import { ActionButton } from "@components/atoms/ActionButton";
import { SCREENS } from "@constants";
import { STACKS } from "@types/routes";


const mockData = [
  { icon: "apple", name: "Apple", dollar: 1.2, percentRate: -1.3 },
  { icon: "microsoft", name: "Microsoft", dollar: 0.9, percentRate: -3.7 },
  { icon: "google", name: "Google", dollar: 0.8, percentRate: 2.5 },
];

export function Exchange({ navigation }) {
  const [brands, SetBrands] = useState([])
  
  
  useEffect(() => {
    const brandsData = JsonForBrands.brands.map((brand) => {
      return {
        id: brand.id,
        title: brand.title,
        icon: brand.icon
      }
    })  
    SetBrands(brandsData);
  }, [])  

  const handleSettings = () => {
    navigation.navigate(STACKS.MODAL, {
      screen: SCREENS.MODAL_STACK.SETTINGS
    });
  };

  return (
    <Page fullWidth>
      <ScrollView style={{ flex: 1 }}>
        <MyHeader
          title="Exchange"
          isHomePage={false}
          rightHeaderComponent={
            <CircularButton name="settings" as="Feather" radius="$full" onPress={handleSettings} />
          }
        />
        <Section isHigherOpacity={true}>
          <VStack alignItems="center">
            <InputAmount 
            typeOfInput="Sell"
            data={brands}
            isDropdown={true}
            />
            <TabIcon size="xs" color='$gray' as="Ionicons" name="arrow-down" />
            <InputAmount 
            typeOfInput="Buy"
             data={brands}
            isDropdown={true}
              />
          </VStack>
        </Section>
        <Section isHigherOpacity={false}>
        <ActionButton buttonName='Swap' width={350} />
          {mockData.map((e, index) => (
            <ExchangeBrandsInfoBox
              key={`${e.name}-${index}`}
              icon={e.icon}
              name={e.name}
              dollar={e.dollar}
              percentRate={e.percentRate}
            />
          ))}
        </Section>
      </ScrollView>
    </Page>
  );
}

