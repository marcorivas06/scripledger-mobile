import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { Page } from '@components/molecules/Page';
import ScreenBrightness from 'react-native-screen-brightness';

export function Receive({ route }) {
  const qrValue = [
    { data: 'ABCDEFG', mode: 'alphanumeric' },
    { data: '0123456', mode: 'numeric' },
    { data: [253, 254, 255], mode: 'byte' },
  ];
  let logoFromFile = require('@assets/appstore.png');

  useEffect(() => {
    let previousBrightness = 0.5; // Default value

    // Get current brightness level
    ScreenBrightness.getBrightness().then((brightness) => {
      previousBrightness = brightness;
      // Set brightness to maximum
      ScreenBrightness.setBrightness(1.0);
    });

    // Reset brightness when component unmounts
    return () => {
      ScreenBrightness.setBrightness(previousBrightness);
    };
  }, []);

  return (
    <Page fullWidth>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.header}>Receive Payment</Text>
          <Text style={styles.subHeader}>
            Receive a certain amount by letting another user scan your QR code.
          </Text>
          <QRCode
            value={qrValue}
            size={200}
            color="black"
            logo={logoFromFile}
            backgroundColor="transparent"
            logoBorderRadius={30}
          />
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
