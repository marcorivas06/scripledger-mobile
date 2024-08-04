import { CameraPage, MyHeader, Page } from '@components/molecules/Page';
import { VStack } from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export const AddGiftCard = ({route}) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Page fullWidth>
        <ScrollView alignItems='center' justifyContent='center' style={{ flex: 1 }}>
          <View style={styles.buttonContainer} >
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <TouchableOpacity style={styles.button} onPress={requestPermission}>
              <Text style={styles.text}>Request Permission</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Page>
    );
  }
  
  return (
    <CameraPage fullWidth>
        <Camera style={styles.camera} type={CameraType.back}>
        <View style={styles.overlay}>
          <VStack style={styles.buttonContainer}>
              <Text style={styles.text}>Scan QR code</Text>
              <Text style={styles.text}>Connect your web3 wallet to a GiftCard by scanning a QR code</Text>          
              <View style={styles.transparentCircle} />
          </VStack>
        </View>
        </Camera>
    </CameraPage>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'DarkerGrotesque-Regular',
    fontSize: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: { 
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop:100
  },
  button: {
    alignItems: 'center',
    fontSize: 35,
    fontFamily: 'DarkerGrotesque-Light',
    color: '#FFF',
    backgroundColor: '#4D9EFF',
    borderRadius:10
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentCircle: {
    width: 250,
    height: 250,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop:30
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'DarkerGrotesque-SemiBold',
    color: '#e7f5ff',
    padding: 10,
  },
});