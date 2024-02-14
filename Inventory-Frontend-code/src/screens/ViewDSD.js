import React, {useState, useEffect} from 'react';
import COLORS from './colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import CycleCount from './CycleCount';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import axios from 'axios';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import ViewInv from './ViewInv';
import Viewrtv from './Viewrtv';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ViewDSD = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigation = useNavigation();
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
    setSearchInput('');
    setSuggestions([]);
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

  useEffect(() => {
    axios
      .get('http://172.20.10.9:8083/dsd/viewdsd')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleSearch = text => {
    setSearchInput(text);
    const filtered = data.filter(
      item =>
        // item.invoiceId.toString().includes(text.toLowerCase()) ||
        item.supplierId.supplierName
          .toLowerCase()
          .includes(text.toLowerCase()) || item.exp_date.includes(text),
    );
    setFilteredData(filtered);
    if (text.length > 0) {
      const uniqueSuggestions = [
        ...new Set([
          // ...data.map(item => item.invoiceId.toString()),
          ...data.map(item => item.supplierId.supplierName),
          ...data.map(item => item.exp_date),
        ]),
      ];
      setSuggestions(
        uniqueSuggestions.filter(suggestion =>
          suggestion.toLowerCase().startsWith(text.toLowerCase()),
        ),
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = suggestion => {
    setSearchInput(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
    // Trigger search with selected suggestion
  };

  const navigateToDetails = invoiceNumber => {
    navigation.navigate('ViewDetailsDsd', {invoiceNumber});
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
                marginBottom: -5,
                color: COLORS.black,
              }}>
              View DSD
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
              placeholder="Search by supplier name and date"
              value={searchInput}
              onChangeText={text => handleSearch(text)}
            />
          </View>
          {searchInput.length > 0 && (
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
              {suggestions.length === 0 ? (
                <Text
                  style={{
                    padding: 8,
                    fontStyle: 'italic',
                    fontWeight: '500',
                  }}>
                  No Results Found
                </Text>
              ) : (
                suggestions.map(suggestion => (
                  <TouchableOpacity
                    key={suggestion}
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionPress(suggestion)}>
                    <Text>{suggestion}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}
          <ScrollView style={styles.container}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Invoice Id</Text>
                <Text style={styles.headerText}>Status</Text>
                <Text style={styles.headerText}>Supplier</Text>
                <Text style={styles.headerText}>Date</Text>
              </View>
              {filteredData.map(item => (
                <TouchableOpacity
                  key={item.invoiceId}
                  onPress={() => navigateToDetails(item.invoiceNumber)}>
                  <View style={styles.tableRow}>
                    <Text style={styles.rowText}>{item.invoiceId}</Text>
                    <Text style={styles.rowText}>{item.status}</Text>
                    <Text style={styles.rowText}>
                      {item.supplierId.supplierName}
                    </Text>
                    <Text style={styles.rowText}>{item.exp_date}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: -5,
  },
  tableContainer: {
    marginTop: 44,
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
  suggestionItem: {
    padding: 10,
  },
});

export default ViewDSD;
