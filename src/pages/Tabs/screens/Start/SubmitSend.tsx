import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { VerticalGiftCardTile } from "@components/molecules/GiftCardTile";
import { Page } from "@components/molecules/Page";
import { ScrollView } from "react-native-gesture-handler";
import { TabIcon } from "@components/atoms/TabIcon";
import { Pressable, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useState } from "react";
import { InputAmount } from "@components/molecules/InputAmount";
import { MailBoxContent } from "@components/atoms/ExchangeBrandsInfoBox";
import { SvgComponent } from "@assets/BrandsSvgs/BrandsSvgs";
import { ActionButton } from "@components/atoms/ActionButton";

export const SubmitSend = ({route, navigation}) => {
  const recipient = route.params.address;
  const asset = route.params.asset;
  
  console.log("Recipient " + recipient);
  


  return (
    <Page fullWidth marginTop={50}>
      <ScrollView style={{ flex: 1 }}>
        <VStack alignItems="center" justifyContent='space-between'>
          <InputAmount
            typeOfInput="Amount"
            isDropdown={false}
            borderColor='transparent'
            width={350}
            height={100}
            fontSize={60}
            // customRightComponent={      
            //   <Pressable 
            //     style={({ pressed }) => [
            //       styles.infoBox,
            //       { backgroundColor: pressed ? 'rgba(128, 128, 128, 0.5)' : '#000' }
            //     ]}
            //   >
            //     <View style={styles.innerShadowBox}>
            //       <Text>Max</Text>
            //     </View>
            //   </Pressable>
            // }
          />

          <HStack style={{ width: '100%', paddingHorizontal: 20 }} justifyContent="space-between">
            <VStack alignItems="flex-start" >
              <HStack alignItems="center">
                <SvgComponent id={asset.id} />
                <View>
                  <Text style={{ textAlign: 'left', marginLeft:10, fontFamily: "DarkerGrotesque-Medium", }}>Send</Text>
                  <Text style={{ textAlign: 'left', marginLeft:10, fontFamily: "DarkerGrotesque-Medium", }}>{asset.title}</Text>
                </View>
              </HStack>
              <TabIcon marginTop={5} as="Entypo" name='flow-line' size="xl" />
              <Text marginTop={5} style={{ textAlign: 'right',fontFamily: "DarkerGrotesque-Medium", }}>To</Text>
            </VStack>
            <Text style={{ textAlign: 'right', fontFamily: "DarkerGrotesque-Medium", }}>Available</Text>
          </HStack>
          <View width='90%' marginTop={10} borderRadius={10} backgroundColor='#000'>
            <MailBoxContent
            icon="mail"
            name={recipient}
            iconColor='#4D9EFF'
            fontColor='white'
            /> 
          </View>
          <ActionButton buttonName='Preview' width={350} bg='#4D9EFF' />
        </VStack>
      </ScrollView>
    </Page>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    borderRadius: 40,
  },
  innerShadowBox: {
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
