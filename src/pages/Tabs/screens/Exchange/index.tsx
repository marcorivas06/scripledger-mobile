import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Exchange } from './Exchange';
import { SCREENS } from '@constants';

const Stack = createNativeStackNavigator();

export function ExchangeTab() {

  const defaultScreenOptions = {
    headerShown: false,
    headerTitle: '',
    headerTintColor: '#0F0',
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
      name={SCREENS.EXCHANGE_STACK.EXCHANGE} 
      component={Exchange}
      options={{...defaultScreenOptions}}
      />
    </Stack.Navigator>
  );
}
