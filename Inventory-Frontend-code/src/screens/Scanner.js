import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {React} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useState} from 'react';
import {Await} from 'react-router-dom';
import axios from 'axios';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from './colors';

const Scanner = ({onScan}) => {
  const [result, setResult] = useState();
  const [productData, setProductData] = useState(null);
  const navigation = useNavigation();
  const onSuccess = e => {
    setResult(e.data);
    const code = e.data;
    //setScan(false);

    try {
      const response = axios.get(`http://172.20.10.9:8083/product/upc/${code}`);
      const data = response.data;
      console.log('data', data);
      navigation.navigate('StockCheck', {productData: data});
    } catch (error) {
      console.log(error);
      Alert.alert('Incorrect barcode');
    }
    console.log('e.data', e.data);
  };

  // const handleScan = async () => {
  //   const inputValue = 2424;
  //   const val = 'Ambience Mall';
  //   try {
  //     const response = await axios.get(
  //       `http://172.20.10.9:8083/product/getProductByitemNumber/${inputValue}/${val}`,
  //     );
  //     const responseData = response.data;
  //     //console.log('responseData val ', responseData);
  //     setProductData(responseData);
  //     navigation.navigate('StockCheck', {productData: responseData});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleScanButton = () => {
    onScan();
  };
  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<Text style={styles.centerText}>Scan Bar code</Text>}
        bottomContent={
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={handleScanButton}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 28,
    padding: 32,
    color: 'black',
    fontWeight: '500',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    top: '150%',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    borderWidth: '1%',
    left: '20%',
    borderRadius: 15,
    width: '58%',
    paddingHorizontal: '11%',
    paddingVertical: '5%',
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;
