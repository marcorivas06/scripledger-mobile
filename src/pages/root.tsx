import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { STACKS, RootStack } from '../types/routes';
import { Tabs } from './Tabs/tab';
import { ModalStack } from './Tabs/screens/Modal';

const Stack = createNativeStackNavigator<RootStack>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Tabs}
          name={STACKS.MAIN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ModalStack}
          name={STACKS.MODAL}
          options={{
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const RootNavigator = memo(Routes);