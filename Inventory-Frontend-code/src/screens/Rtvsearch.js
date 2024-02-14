import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from './SideMenu';

import Footer1 from '../components/Footer1';
import COLORS from './colors';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';

import Dashboard from './Dashboard';

import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import CycleCount from './CycleCount';
import {err} from 'react-native-svg/lib/typescript/xml';
const Rtvsearch = ({navigation}) => {
  const [asnNumber, setAsnNumber] = useState('');
  const [apiData, setApiData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const store = [
    'Dashboard',
    'StockCheck',
    'PO Recieve',
    'Transfer Recieve',
    'DSD Recieve',
    'Return to Vendor',
    'Inventory Adjustment',
    'Stock Count',
    'View DSD',
    'View Vendor Return',
    'View Inventory Adjusment',
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handlepress = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };

  const handleMenuItemClick = item => {
    setSelectedMenuItem(item);
    if (item == 'Dashboard') {
      navigation.navigate(Dashboard);
    } else if (item == 'StockCheck') {
      navigation.navigate(ItemScanner);
    } else if (item == 'PO Recieve') {
      navigation.navigate(PoSearch);
    } else if (item == 'Transfer Recieve') {
      navigation.navigate(TRsearch);
    } else if (item == 'DSD Recieve') {
      navigation.navigate(DsdSearch);
    } else if (item == 'Return to Vendor') {
      navigation.navigate(Rtvsearch);
    } else if (item == 'Inventory Adjustment') {
      navigation.navigate(InvAdj);
    } else if (item == 'Stock Count') {
      navigation.navigate(CycleCount);
    } else if (item == 'View DSD') {
      navigation.navigate(ViewDSD);
    } else if (item == 'View Vendor Return') {
      navigation.navigate(Viewrtv);
    } else if (item == 'View Inventory Adjusment') {
      navigation.navigate(ViewInv);
    }
    closeMenu();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/returntovendor/getrtvitems/${asnNumber}`,
      );
      const responseData = response.data;

      if (
        !responseData.rtvProductsdto ||
        responseData.rtvProductsdto.length === 0
      ) {
        setApiData(null);
        setNoDataFound(true);
        setErrorMessage('No Data Found');
      } else {
        setApiData(responseData);
        setNoDataFound(false);
        navigation.navigate('Rtvdisplay', {apiData: responseData});
      }
    } catch (error) {
      console.log(error);
      // Handle the server error
      if (error.response && error.response.status === 500) {
        // Display a user-friendly message for server error
        setApiData(null);
        setNoDataFound(true);
        setErrorMessage('No Data Found');
      }
    } finally {
      // Clear the textbox after the search is completed
      setAsnNumber('');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
     <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <View style={{top: 1}}>
            <TouchableOpacity onPress={toggleMenu}>
              <Icon name="menu" size={45} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                top: -45,
                left: 50,
                fontSize: 30,
                color: 'black',
              }}>
              Return to vendor
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 12,
              top: -12,
              paddingHorizontal: 10,
              marginHorizontal: 20,
              marginTop: 1,
              padding: 5,
              borderColor: '#C1C0B9',
              borderWidth: 1,
              borderColor: '#f0f8ff',
              backgroundColor: '#f0f8ff',
              elevation: 7,
            }}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                fontSize: 16,
                color: '#333',
                paddingLeft: 10,
              }}
              placeholder="Enter Return to Vendor ID"
              value={asnNumber}
              onChangeText={text => {
                setAsnNumber(text);
                setNoDataFound(false);
              }}
            />

            <TouchableOpacity onPress={handleSearch}>
              <Icon name="search" size={20} color="#333" style={{left: -10}} />
            </TouchableOpacity>
          </View>

          {noDataFound && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 7,
                paddingHorizontal: 30,
                marginHorizontal: 80,
                marginTop: 100,
                padding: -35,
                borderColor: '#f0f8ff',
                backgroundColor: 'white',
                elevation: 7,
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 18,
                  marginTop: 20,
                  top: -10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {errorMessage}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <SideMenu
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        items={store}
        onItemClick={handleMenuItemClick}
      />
      <Footer1 />
    </SafeAreaView>
  );
};

export default Rtvsearch;
