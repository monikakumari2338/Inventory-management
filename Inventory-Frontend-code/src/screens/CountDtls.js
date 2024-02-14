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
import ViewDSD from './ViewDSD';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';


const CountDtls = ({route}) => {
  const {countDetails} = route.params || {};
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
  const handlepress = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };
  const handleDetailsPress = () => {
    if (countDetails && countDetails.length > 0) {
      const countId = countDetails[0].stockcount.countId;
      axios
        .get(
          `http://172.20.10.9:8083/savestockcount/getstockproducts/${countId}`,
        )
        .then(response => {
          const countDetails = response.data;
          const keyToFilter = 'varianceQty';
          const filterData = countDetails.filter(item => item[keyToFilter]);
          navigation.navigate('Recount', {data: filterData});
          console.log('count details : ', countDetails);
          console.log('filterData details : ', filterData);
        })
        .catch(error => {
          console.log('Error fetching count details:', error);
        });
    } else {
      console.log('No count');
    }
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
              Count Details
            </Text>
            {countDetails[0]?.stockcount.status === 'complete' ? (
              <TouchableOpacity style={[styles.disabledButton]} disabled>
                <Text style={styles.DisText}>Recount</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleDetailsPress(countDetails[0]?.countId)}>
                <Text style={styles.addButtonText}>Recount</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{height: 600}}>
            <ScrollView horizontal>
              <ScrollView style={styles.container}>
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Item No</Text>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={[styles.headerText]}>Size</Text>
                    <Text style={[styles.headerText]}>Color</Text>
                    <Text style={[styles.headerText]}>Booked Qty</Text>
                    <Text style={[styles.headerText]}>First Counted Qty</Text>
                    <Text style={[styles.headerText]}>First Variance</Text>
                    <Text style={[styles.headerText]}>Recount Qty</Text>
                    <Text style={[styles.headerText]}>Recount Variance</Text>
                  </View>
                  <View style={{height: 600}}>
                    <ScrollView style={styles.container}>
                      {countDetails.map((item, index) => (
                        <TouchableOpacity key={index}>
                          <View style={styles.tableRow}>
                            <Text style={[styles.rowText]}>
                              {item.itemNumber}
                            </Text>
                            <Text style={[styles.rowText]}>
                              {item.itemName}
                            </Text>
                            <Text style={[styles.rowText]}>{item.size}</Text>
                            <Text style={[styles.rowText]}>{item.color}</Text>
                            <Text style={[styles.rowText]}>{item.bookQty}</Text>
                            <Text style={[styles.rowText]}>
                              {item.countedQty}
                            </Text>
                            <Text style={[styles.rowText]}>
                              {item.varianceQty}
                            </Text>
                            <Text style={[styles.rowText]}>
                              {item.reCountQty}
                            </Text>
                            <Text style={[styles.rowText]}>
                              {item.recountVarianceQty}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
          </View>
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
    padding: 2,
  },

  tableContainer: {
    marginTop: 54,
    marginBottom: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    marginTop: -38,
  },

  headerText: {
    color: 'white',
    paddingHorizontal: 9,
    fontSize: 16,
    textAlign: 'center',
    top: 10,
    flex: 1,
    width: 80,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },

  rowText: {
    color: '#333333',
    textAlign: 'center',
    flex: 1,
    marginStart: -5,
    width: 70,
  },
  addButton: {
    position: 'absolute',
    left: 290,
    elevation: 3,
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginHorizontal: 23,
    marginVertical: 35,
  },
  disabledButton: {
    position: 'absolute',
    left: 290,
    elevation: 3,
    backgroundColor: COLORS.grey,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginHorizontal: 23,
    marginVertical: 35,
  },

  addButtonText: {
    top: -2,
    fontSize: 16,
    color: 'white',
  },
  DisText: {
    top: -2,
    fontSize: 16,
    color: '#6f6f6f',
  },
});
export default CountDtls;
