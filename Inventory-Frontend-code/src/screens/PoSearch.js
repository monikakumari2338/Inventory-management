import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from './colors';
import axios from 'axios';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import SideMenu from './SideMenu.js';
import ItemScanner from './ItemScanner.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import Dashboard from './Dashboard';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import CycleCount from './CycleCount';
import {useNavigation} from '@react-navigation/native';

import {useFocusEffect} from '@react-navigation/native';

function PoSearch({}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [poNumber, setPoNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [purchaseOrderItemDetailsdto, setPurchaseOrderItemDetailsdto] =
    useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [onloaddata, setonloaddata] = useState([]);
  const navigation = useNavigation();

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
    setPoNumber('');
    setSuggestions([]);
    setNoDataFound(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setPoNumber('');
    }, []),
  );

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
  useEffect(() => {
    axios
      .get('http://172.20.10.9:8083/purchaseOrder/getall/po')
      .then(response => {
        setonloaddata(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const renderSearchResults = ({item}) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item.poNumber}</Text>
    </TouchableOpacity>
  );

  const handleItemClick = item => {
    setPoNumber(item.poNumber);
    searchItem(); // Perform the search when an item is clicked
  };

  const searchItem = async () => {
    const url = `http://172.20.10.9:8083/purchaseOrder/findbyPO/${poNumber}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (
        !data ||
        !data.purchaseOrderItemDetailsdto ||
        data.purchaseOrderItemDetailsdto.length === 0
      ) {
        setNoDataFound(true);
        setSearchResults([]);
        setPurchaseOrderItemDetailsdto([]);
        setSuggestions(['no data found']);
      } else {
        setNoDataFound(false);
        setSearchResults(data.purchaseOrders);
        setPurchaseOrderItemDetailsdto(data.purchaseOrderItemDetailsdto);
        navigation.navigate('DS', {data: data.purchaseOrderItemDetailsdto});
      }
    } catch (error) {
      console.log('Error searching for item:', error);
      setNoDataFound(true);
      setSearchResults([]);
      setPurchaseOrderItemDetailsdto([]);
      setSuggestions('No data Dound');
    }
    setSuggestions([]);
  };

  const handleInputChange = async input => {
    setPoNumber(input);
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/purchaseOrder/getall/po`,
      );
      const responseData = response.data;
      if (responseData.length > 0) {
        const matchingSuggestions = responseData
          .filter(item => item.poNumber.startsWith(input))
          .map(item => item.poNumber);
        setSuggestions(matchingSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.log(error);
    }
    setNoDataFound(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 90,
              marginTop: -90,
              paddingBottom: 50,
            }}>
            <View style={[styles.container]}>
              <View style={{top: 1, flex: 1}}>
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
                  PO Recieve
                </Text>

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
                    value={poNumber}
                    onChangeText={text => {
                      handleInputChange(text);
                      setNoDataFound(false);
                    }}
                    placeholder="Enter PO Number"
                  />
                  <TouchableOpacity onPress={searchItem}>
                    <Icon
                      name="search"
                      size={20}
                      color="#333"
                      style={{left: -10}}
                    />
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

                {suggestions.length > 0 && (
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
                    {noDataFound ? (
                      <Text
                        style={{
                          padding: 8,
                          fontStyle: 'italic',
                          fontWeight: '500',
                        }}>
                        No
                      </Text>
                    ) : (
                      suggestions.map(suggestion => (
                        <TouchableOpacity
                          key={suggestion}
                          style={styles.suggestionItem}
                          onPress={() =>
                            handleItemClick({poNumber: suggestion})
                          }>
                          <Text>{suggestion}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </ScrollView>
                )}
                {noDataFound && (
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
                <FlatList
                  data={searchResults}
                  renderItem={renderSearchResults}
                  keyExtractor={item => item.poNumber}
                />
                {/* <ScrollView style={styles.container}>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.headerText}>Po Number</Text>
                      <Text style={styles.headerText}>Status</Text>
                      <Text style={styles.headerText}>Supplier</Text>
                    </View>
                    {onloaddata.map(item => (
                      <TouchableOpacity key={item.poNumber}>
                        <View style={styles.tableRow}>
                          <Text style={styles.rowText}>{item.poNumber}</Text>
                          <Text style={styles.rowText}>{item.status}</Text>
                          <Text style={styles.rowText}>
                            {item.supplierName}
                          </Text>

                          <Ionicons
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              right: 1,
                              top: -1,
                              color: 'black',
                            }}
                            name={'chevron-forward-sharp'}
                            size={22}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView> */}
                <SideMenu
                  isOpen={isMenuOpen}
                  closeMenu={closeMenu}
                  items={store}
                  onItemClick={handleMenuItemClick}
                />
              </View>
            </View>
          </ScrollView>
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
}

export default PoSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 700,
    width: '100%',
    backgroundColor: 'white',
  },
  suggestionItem: {
    padding: 10,
  },
  noResultsText: {
    textAlign: 'center',
    padding: 10,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  tableContainer: {
    marginTop: -14,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.primary,
  },
  headerText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    left: -10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
});
