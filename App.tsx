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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'DarkerGrotesque-SemiBold': require("./assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Black.ttf"),
    'DarkerGrotesque-Bold': require("./assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  
  return (
    <StyledProvider config={config}>
      <GestureHandlerRootView style={styles.AppWrapper}>
          <RootNavigator />
      </GestureHandlerRootView>
    </StyledProvider>
  );
}

const styles = StyleSheet.create({
  AppWrapper: { flex: 1 },
});
