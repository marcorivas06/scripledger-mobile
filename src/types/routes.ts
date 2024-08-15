import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum STACKS {
  START = 'Start',
  EXCHANGE = 'Exchange',
  HISTORY = 'History',  
  MAIN = 'Main',
  MODAL = "ModalStack"
}
export enum SCREENS {}

export type BottomStack = {
  [STACKS.START]: undefined;
  [STACKS.EXCHANGE]: undefined;
  [STACKS.HISTORY]: undefined;
  [STACKS.MAIN]: undefined;
};

export type RootStack = {
  [STACKS.MAIN]: undefined;
  [STACKS.MODAL]: undefined;
};
