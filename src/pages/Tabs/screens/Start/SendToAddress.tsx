import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { Page } from "@components/molecules/Page";
import { ScrollView } from "react-native-gesture-handler";
import { TabIcon } from "@components/atoms/TabIcon";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useState } from "react";
import { MailBox } from "@components/atoms/ExchangeBrandsInfoBox";
import { SCREENS } from "@constants";

const friends = [
  { id: 1, title: "johndoe@gmail.com" },
  { id: 2, title: "janesmith@gmail.com" },
  { id: 3, title: "michaeljohnson@hotmail.com" },
  { id: 4, title: "emilydavis@zoho.com" },
  { id: 5, title: "davidwilson@gmail.com" },
];

const handleQRCodeForRecipientWallet = () => {
  console.log("Hello World");
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function SendToAddress({ route, navigation }) {
  const itemSelected = route.params?.item;
  // const autoCompleteData = formatBalanceForAutocomplete(balances);
  const [selectedItem, setSelectedItem] = useState(itemSelected);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  console.log(selectedItem);

  const handleAddress = (recipient, itemSelected) => {
    navigation.navigate(SCREENS.START_STACK.SUBMIT_SEND, {
      address: recipient,
      asset: itemSelected,
    });
  };

  return (
    <Page fullWidth marginTop={50}>
      <ScrollView style={{ flex: 1 }}>
      <Text alignItems="center" style={styles.message}>
        Send {itemSelected.title} to
      </Text>
        <VStack width="100%" alignItems="flex-start" marginHorizontal={20}>
          <View>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={setSelectedItem}
              dataSet={friends}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              suggestionListContainerStyle={styles.suggestionListContainerStyle}
              onRightIconComponentPress={handleQRCodeForRecipientWallet}
              LeftComponent={
                <View justifyContent="center">
                  <TabIcon name="search" as="FontAwesome5" size="sm" />
                </View>
              }
              showChevron={false}
              caseSensitive={false}
              onChangeText={setInputValue}
              textInputProps={{
                placeholder: "Wallet address, email, phone number",
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  borderRadius: 25,
                  color: "#000",
                  paddingLeft: 18,
                },
              }}
            />
          </View>
          <View width="100%" marginTop={10}>
          {!selectedItem ? (
              isValidEmail(inputValue) && (
                <VStack marginTop={100} alignItems="flex-start">
                  <MailBox
                    icon="mail"
                    name={inputValue}
                    onPress={() => handleAddress(inputValue, itemSelected)}
                  />
                </VStack>
              )
            ) : (
              <VStack marginTop={100} alignItems="flex-start">
                <MailBox
                  key={`${selectedItem.title}-${selectedItem.id}`}
                  icon="mail"
                  name={selectedItem.title}
                  onPress={() => handleAddress(selectedItem.title, itemSelected)}
                />
              </VStack>
            )}
          </View>
        </VStack>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontFamily: "DarkerGrotesque-Medium",
    fontSize: 20,
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 350,
  },
  inputStyle: {
    backgroundColor: "white",
    color: "black", // Ensure text is visible on white background
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  emailText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  suggestionListContainerStyle: {
    backgroundColor: "white",
  },
});
