import {View, Text} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import axios from 'axios';

const Test = () => {
  const poData = async () => {
    try {
      const upc = '10000012';
      const store = 'Ambience Mall';
      const response = await axios.get(
        `http://172.20.10.9:8083/product/upcs/${upc}/${store}`,
      );
      const responseData = response.data;
      console.log('test data : ', responseData);
    } catch (error) {
      console.log('Po Onload data Error fetching :', error);
    }
  };

  useEffect(() => {
    poData();
  }, []);
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default Test;
