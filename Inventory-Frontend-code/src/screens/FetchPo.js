import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import COLORS from './colors';
import axios from 'axios';
import Header from '../components/Header';
import StockCheck from './StockCheck';

import Footer1 from '../components/Footer1';
import PurchaseSearch from './PurchaseSearch';

export let ponum = '';

const FetchPo = ({navigation}) => {
  const [searchResults, setSearchResults] = useState([]);

  const [poNumber, setpoNumber] = useState('');
  ponum = poNumber;
  const url =
    'http://172.20.10.9:8083/purchaseOrder/findbyPO' + '/' + `${poNumber}`;
  const searchItem = async () => {
    try {
      const response = await axios.get(
        'http://172.20.10.9:8083/purchaseOrder/findbyPO' + '/' + `${poNumber}`,
      );

      console.log(response.data);
      setSearchResults(response.data);
      //navigation.navigate('DS', {searchResults});
    } catch (error) {
      console.log('Error searching for item:', error);
    }
  };
  console.log(url);

  return (
    <View>
      <PurchaseSearch onSearch={searchItem} />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PurchaseOrder product={item} />}
      />
    </View>
  );
};

export default FetchPo;
