import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "./Start";
import { SCREENS } from "@constants";

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  headerTitle: "",
  headerShadowVisible: false,
};

export function StartTab() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        name={SCREENS.START_STACK.START}
        component={Start}
        options={{ ...defaultScreenOptions }}
      />
    </Stack.Navigator>
  );
}
