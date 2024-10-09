import './shim';
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyledProvider } from "@gluestack-style/react";
import { StyleSheet } from "react-native";
import { RootNavigator } from './src/pages/root';
import { config } from "./config/gluestack-ui.config";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from "@helper/loadFonts";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { store } from '@src/store'
import { Provider } from 'react-redux'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(loadFonts());
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <StyledProvider config={config}>
        <AutocompleteDropdownContextProvider>
          <GestureHandlerRootView style={styles.AppWrapper}>
              <RootNavigator />
          </GestureHandlerRootView>
        </AutocompleteDropdownContextProvider>
      </StyledProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  AppWrapper: { flex: 1 },
});
