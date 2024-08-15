import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "@constants";
import { View } from "@gluestack-ui/themed";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TabIcon } from "@components/atoms/TabIcon";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  headerTintColor: "rgba(242, 257, 257, 0.8)"
};

export function ModalStack() {
  return (
    <Stack.Navigator
      screenOptions={ ({navigation}) => ( {
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        component={Settings}
        name={SCREENS.STACKS.MODAL}
        options={{
          ...defaultScreenOptions,
          animation: 'slide_from_right',
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
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
    width:'30%',
    
  },
  goBackText: {
    fontFamily: 'DarkerGrotesque-Medium',
    fontSize: 15,
    color:'#51382F'
  },
  });