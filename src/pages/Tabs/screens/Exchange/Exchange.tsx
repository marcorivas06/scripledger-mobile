import React from 'react';
import {
  CircularButton,
} from "@components/atoms/CircularButton";
import { TabIcon } from "@components/atoms/TabIcon";
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { Text, VStack, HStack, Button, View, Box, Input,InputField, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { InputAmount } from '@components/molecules/InputAmount';
import { ExchangeBrandsInfoBox } from '@components/atoms/ExchangeBrandsInfoBox';

const emojisWithIcons = [
  { title: 'happy', icon: 'emoticon-happy-outline' },
  { title: 'cool', icon: 'emoticon-cool-outline' },
  { title: 'lol', icon: 'emoticon-lol-outline' },
  { title: 'sad', icon: 'emoticon-sad-outline' },
  { title: 'cry', icon: 'emoticon-cry-outline' },
  { title: 'angry', icon: 'emoticon-angry-outline' },
  { title: 'confused', icon: 'emoticon-confused-outline' },
  { title: 'excited', icon: 'emoticon-excited-outline' },
  { title: 'kiss', icon: 'emoticon-kiss-outline' },
  { title: 'devil', icon: 'emoticon-devil-outline' },
  { title: 'dead', icon: 'emoticon-dead-outline' },
  { title: 'wink', icon: 'emoticon-wink-outline' },
  { title: 'sick', icon: 'emoticon-sick-outline' },
  { title: 'frown', icon: 'emoticon-frown-outline' },
];

const mockData = [
  { icon: 'apple', name: 'Apple', dollar: 1.2, percentRate: -1.3 },
  { icon: 'microsoft', name: 'Microsoft', dollar: 0.9, percentRate: -3.7 },
  { icon: 'google', name: 'Google', dollar: 0.8, percentRate: 2.5 },
];

export function Exchange() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Page fullWidth>
        
        <MyHeader
          title="Exchange"
          isHomePage={false}
          rightHeaderComponent={<CircularButton name="settings" as="Feather" radius="$full" />}
        />
        <Section isHigherOpacity={true}>
          <VStack alignItems='center'>
            <InputAmount typeOfInput="Sell" data={emojisWithIcons}/>
            <TabIcon size="sm" as="Ionicons" name="arrow-down" />
            <InputAmount typeOfInput="Buy" data={emojisWithIcons}/>
          </VStack>
        </Section>
        <Section isHigherOpacity={false}>
          <Button width={358} margin={17} borderRadius='$full' size="lg" variant="solid" bgColor='black' action="primary">
            <ButtonText>Swap</ButtonText>
            <ButtonIcon><TabIcon as="AntDesign" name='swap' color='white' /></ButtonIcon>
          </Button>
          {
          mockData.map((e,index) => (
          <ExchangeBrandsInfoBox key={`${e.name}-${index}`} icon={e.icon} name={e.name} dollar={e.dollar} percentRate={e.percentRate} />
          ))
          }
        </Section>
      </Page>
    </ScrollView>
  );
}

