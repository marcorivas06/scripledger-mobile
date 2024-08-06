import { VStack, Text } from "@gluestack-ui/themed";
import { VerticalGiftCardTile } from "@components/molecules/GiftCardTile";
import { Page } from "@components/molecules/Page";
import { ScrollView } from "react-native-gesture-handler";
import { TabIcon } from "@components/atoms/TabIcon";
import { StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useState } from "react";
import { formatBalanceForAutocomplete } from '@src/helper/utils'
import { VerticalGiftCard } from "@components/molecules/GiftCard";
import { SCREENS } from "@constants";

export function Send({route, navigation}){
  const balances = route.params?.balances; 
  const autoCompleteData = formatBalanceForAutocomplete(balances);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddress = (itemSelected) => {
    navigation.navigate(SCREENS.START_STACK.SEND_TO_ADDRESS, {
      item:itemSelected
    });
  }

  return (
    <Page fullWidth marginTop={50}>
      <ScrollView style={{ flex: 1 }}>
        <Text alignItems="center" style={styles.message}>Select assets to send</Text>
        <VStack width="100%" alignItems="flex-start" marginHorizontal={20} >
          <View>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={setSelectedItem}
              dataSet={autoCompleteData}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              suggestionListContainerStyle={styles.suggestionListContainerStyle}
              LeftComponent={
                <View justifyContent='center' >
                  <TabIcon name="search" as="FontAwesome5" size="sm" />
                </View>
            }
            textInputProps={{
              placeholder: "Search",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                borderRadius: 25,
                color: "#fff",
                paddingLeft: 18
              }
            }}
            />
          </View>
          <View marginTop={10}>
          {
            selectedItem && 
            <VerticalGiftCard
              balance={selectedItem.balance}
              token_id={selectedItem.id}
              token_name={selectedItem.title}
              onPress={() => handleAddress(selectedItem)}
              />
            }
          </View>
        </VStack>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'DarkerGrotesque-Medium',
    fontSize: 20,
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    width:350
  },
  inputStyle: {
    backgroundColor: 'white',
    color: 'black', // Ensure text is visible on white background
  },
  suggestionListContainerStyle: {
    backgroundColor: 'white',
  },
});