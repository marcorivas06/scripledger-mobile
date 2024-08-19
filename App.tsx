import React, { useEffect } from "react";
import { GluestackUIProvider, Text, Box, VStack } from "@gluestack-ui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styled, StyledProvider } from "@gluestack-style/react";
import { StyleSheet } from "react-native";
import { RootNavigator } from './src/pages/root';
import { config } from "./config/gluestack-ui.config"
// import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from "@helper/loadFonts";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { TextEncoder, TextDecoder } from 'text-encoding';

import { Buffer } from 'buffer';

// import "./global.native"

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(loadFonts());

  global.Buffer = Buffer;
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;

  
  return (
    <StyledProvider config={config}>
      <AutocompleteDropdownContextProvider>
        <GestureHandlerRootView style={styles.AppWrapper}>
            <RootNavigator />
        </GestureHandlerRootView>
      </AutocompleteDropdownContextProvider>
    </StyledProvider>
  );
}

const styles = StyleSheet.create({
  AppWrapper: { flex: 1 },
});
