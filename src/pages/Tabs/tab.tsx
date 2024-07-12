import { tabBarIcon } from '@components/atoms/TabIcon';
import { BottomStack, STACKS } from '@src/types/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StartTab} from '@pages/Tabs/screens/Start';
import {ExchangeTab} from '@pages/Tabs/screens/Exchange';
import {HistoryTab} from '@pages/Tabs/screens/History';
import { StyleSheet } from "react-native";

const PageIcons = {
  start: tabBarIcon('home', 'Octicons'),
  Exchange: tabBarIcon('line-chart', 'FontAwesome'),
  history: tabBarIcon('history', 'FontAwesome'),
};

const Tab = createBottomTabNavigator<BottomStack>();
export function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          //tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        })}
      >
        <Tab.Screen
          name={STACKS.START}
          component={StartTab}
          options={{ tabBarIcon: PageIcons.start }}
        />
        <Tab.Screen
          name={STACKS.EXCHANGE}
          component={ExchangeTab }
          options={{ tabBarIcon: PageIcons.Exchange }}
        />
        <Tab.Screen
          name={STACKS.HISTORY}
          component={HistoryTab}
          options={{ tabBarIcon: PageIcons.history }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: { height: 80, backgroundColor:'rgba(238, 232, 244, 1)' },
});
