import {View, Text} from 'react-native';
import React from 'react';
import {Camera} from 'react-native-vision-camera';
import {NoCameraDeviceError} from 'react-native-vision-camera';
import {useCodeScanner} from 'react-native-vision-camera';
const Scanner = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  if (device == null) return <NoCameraDeviceError />;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      {...props}
      codeScanner={codeScanner}
      device={device}
      isActive={true}
    />
  );
};

export default Scanner;
