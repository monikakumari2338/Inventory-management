import {useState, useEffect} from 'react';
import React from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';
import Footer1 from '../components/Footer1';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import CycleCount from './CycleCount';
import axios from 'axios';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import {storeContext} from '../StoreContext/LoggedStoreContext';

const ItemScanner = () => {
  const [itemNumber, setItemNumber] = useState('');
  const navigation = useNavigation();
  const [productData, setProductData] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
    setItemNumber('');
    setSuggestions([]);
    setNoDataFound(false);
  };
  useEffect(() => {
    setItemNumber('');
    setSuggestions([]);
    setNoDataFound(false);
  }, []);
  const handleMenuItemClick = item => {
    // Handle the click on menu item here

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
  const {value} = storeContext();
  const val = 'delhi103';
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getProductByitemNumber/${itemNumber}/${val}`,
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        setProductData([]);
        setNoDataFound(true);
        setErrorMessage('No data Found');
      } else {
        setProductData(responseData);
        setNoDataFound(false);
        navigation.navigate('StockCheck', {productData: responseData});
      }
    } catch (error) {
      console.log(error);
      setNoDataFound(true);
    }
    setItemNumber('');
    setSuggestions([]);
  };

  const handleSuggestionSelect = async selectedItemNumber => {
    setItemNumber(selectedItemNumber);
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getProductByitemNumber/${selectedItemNumber}/${val}`,
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        setProductData([]);
        setNoDataFound(true);
        setErrorMessage('No data Found');
      } else {
        setProductData(responseData);
        setNoDataFound(false);
        navigation.navigate('StockCheck', {productData: responseData});
      }
    } catch (error) {
      console.log(error);
      setNoDataFound(true);
    }
    setItemNumber('');
    setSuggestions([]);
    closeMenu();
  };

  const handleInputChange = async input => {
    setItemNumber(input);
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getMatched/products/itemnumber/${input}`,
      );
      const data = response.data;
      const filteredSuggestions = data.filter(
        item => item.store.storeName === val,
      );
      console.log('filteredSuggestions bsvxs', filteredSuggestions);
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.log(error);
    }
    setNoDataFound(input.length > 0 && suggestions.length === 0);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
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
                color: COLORS.black,
              }}>
              Stock Check
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 12,
              top: 5,
              paddingHorizontal: 10,
              marginHorizontal: 20,
              marginTop: -15,
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
              placeholder="Enter Item Number"
              value={itemNumber}
              onChangeText={handleInputChange}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Icon name="search" size={20} color="#333" style={{left: -10}} />
            </TouchableOpacity>
          </View>
          {/* {noDataFound && (
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
                No Data Found
              </Text>
            </View>
          )} */}
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ScrollView
              style={{
                maxHeight: 140,
                backgroundColor: 'white',
                elevation: 7,
                position: 'absolute',
                top: 124,
                left: 21,
                borderRadius: 11,
                zIndex: 1,
                width: '90%',
                paddingHorizontal: 27,
                paddingVertical: 5,
                elevation: 4,
              }}>
              {suggestions.map(suggestion => (
                <TouchableOpacity
                  key={suggestion.product.itemNumber}
                  style={styles.suggestionItem}
                  onPress={() =>
                    handleSuggestionSelect(suggestion.product.itemNumber)
                  }>
                  <Text>{suggestion.product.itemNumber}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {noDataFound && suggestions.length === 0 && (
            <ScrollView
              style={{
                maxHeight: 150,
                backgroundColor: 'white',
                elevation: 7,
                position: 'absolute',
                top: 124,
                left: 21,
                borderRadius: 11,
                zIndex: 1,
                width: '90%',
                paddingHorizontal: 27,
                paddingVertical: 5,
                elevation: 4,
              }}>
              <Text style={styles.noResultsText}>No Results Found</Text>
            </ScrollView>
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

const styles = StyleSheet.create({
  suggestionItem: {
    padding: 10,
  },
  noResultsText: {
    textAlign: 'center',
    padding: 10,
    fontStyle: 'italic',
    fontWeight: '500',
  },
});

export default ItemScanner;
