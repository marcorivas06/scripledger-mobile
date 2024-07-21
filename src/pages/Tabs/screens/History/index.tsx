import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { History } from './History';
import { SCREENS } from '@constants';

const Stack = createNativeStackNavigator();

export function HistoryTab() {
  const defaultScreenOptions = {
    headerShown: false,
    headerTitle: '',
    headerShadowVisible: false,
  };

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
      name={SCREENS.HISTORY_STACK.HISTORY}
      component={History}
      options={{...defaultScreenOptions}}
      />
    </Stack.Navigator>
  );
}
