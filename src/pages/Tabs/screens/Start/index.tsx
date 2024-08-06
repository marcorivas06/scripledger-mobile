import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "./Start";
import { SCREENS } from "@constants";
import { AllGiftCards } from "./AllGiftCards";
import { View } from "@gluestack-ui/themed";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TabIcon } from "@components/atoms/TabIcon";
import { AddGiftCard } from "./AddGiftCard";
import { Pay } from "./Pay";
import { Receive } from "./Receive";
import { Send } from "./Send";
import { SendToAddress } from "./SendToAddress";
import { SubmitSend } from "./SubmitSend";

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
    headerShown: false,
    headerTintColor: "rgba(242, 257, 257, 0.8)"
};

const HeaderExitLeft = ({backgroundColor, onPress, color = '#1f2937'}) => (
  <View alignItems="flex-end" >
    <TouchableOpacity onPress={onPress}  style={[styles.goBackButton, {backgroundColor:backgroundColor}]}>
    <View alignItems="center" >
      <TabIcon as="MaterialCommunityIcons" name="arrow-left" size="md" color={color} />
    </View>
    </TouchableOpacity>
  </View>
)

export function StartTab() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShadowVisible: false,
        headerLeft: () => <HeaderExitLeft onPress={navigation.goBack}/>
      })}
    >
      <Stack.Screen
        name={SCREENS.START_STACK.START}
        component={Start}
        options={{ ...defaultScreenOptions }}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.ALL_GIFTCARDS}
        component={AllGiftCards}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
        }}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.ADD}
        component={AddGiftCard}
        options={({ navigation }) => ({
          ...defaultScreenOptions,
          presentation: "fullScreenModal",
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
          headerLeft: () => {
            return (
              <HeaderExitLeft
              backgroundColor="transparent"
              color='white'
              onPress={navigation.goBack}
            />
            );
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.PAY}
        component={Pay}
        options={({ navigation }) => ({
          ...defaultScreenOptions,
          presentation: "fullScreenModal",
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
          headerLeft: () => {
            return (
              <HeaderExitLeft
              backgroundColor="transparent"
              color='white'
              onPress={navigation.goBack}
            />
            );
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.SEND}
        component={Send}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
        }}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.SEND_TO_ADDRESS}
        component={SendToAddress}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
        }}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.SUBMIT_SEND}
        component={SubmitSend}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
        }}
      />
      <Stack.Screen
        name={SCREENS.START_STACK.RECEIVE}
        component={Receive}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTransparent:true,
          headerTitle:'',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  goBackButton: {
    backgroundColor: '#FFF1FF', // Change this to your desired background color
    borderRadius: 35,
    alignItems: 'center',
    padding:15,
  },
  goBackText: {
    fontFamily: 'DarkerGrotesque-Medium',
    fontSize: 15,
    color:'#51382F'
  },
  });