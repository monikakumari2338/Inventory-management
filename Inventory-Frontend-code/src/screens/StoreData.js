import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import CycleCount from './CycleCount';
import {Table, Row, Rows} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import COLORS from './colors';
import Footer1 from '../components/Footer1';
import Header from '../components/Header';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import {useNavigation} from '@react-navigation/native';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {storeContext} from '../StoreContext/LoggedStoreContext';

const Tile = ({
  storeName,
  storeAddress,
  storeStock,
  size,
  color,
  currentStore,
}) => (
  <View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
      }}>
      {storeName}
    </Text>
    <View
      style={{
        marginBottom: 5,
      }}>
      <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 16}}>
        Address
      </Text>
      <Text style={{color: 'grey', fontSize: 16}}>{storeAddress}</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 16}}>
        Size:
      </Text>
      <Text style={{color: 'grey', left: -10, fontSize: 16}}>{size}</Text>

      <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 16}}>
        Color:
      </Text>
      <Text style={{color: 'grey', left: -10, fontSize: 16}}>{color}</Text>
    </View>
    <View style={{marginTop: 5, marginBottom: -20}}>
      <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 16}}>
        Store Stock:
      </Text>
      <Text style={{color: 'grey', left: 92, fontSize: 16, top: -21}}>
        {storeStock}
      </Text>
    </View>
    {/* <View style={{marginTop: 5, marginBottom: -20}}>
      <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 16}}>
        Current Store:
      </Text>
      <Text style={{color: 'grey', left: 92, fontSize: 16, top: -21}}>
        {currentStore}
      </Text>
    </View> */}
  </View>
);

const StoreData = ({route}) => {
  const {itemName, itemNumber, color, size, category} = route.params;

  const [storeData, setStoreData] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedStore, setSelectedStore] = useState(' ');
  const navigation = useNavigation();
  //console.log('data ', data);
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

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.9:8083/store/buddystores/${itemNumber}/${color}/${size}`,
        );
        setStoreData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStoreData();
  }, [itemName, itemNumber, color, size]);

  const renderTiles = () => {
    if (!storeData) {
      return null;
    }

    return storeData.map((data, index) => (
      <Pressable
        style={styles.tile}
        onPress={() => handleTileClick(data.storeName)}>
        <Tile
          key={index}
          storeName={data.storeName}
          storeAddress={data.storeAddress}
          storeStock={data.storeStock}
          size={size}
          color={color}
        />
      </Pressable>
    ));
  };

  //console.log('storeData ', storeData);

  const {value} = storeContext();
  //console.log('store : ', value);

  const handleTileClick = storeName => {
    let store = [];
    store = storeData.find(item => item.storeName === storeName);
    //console.log('clickedStore', clickedStore);
    navigation.navigate('BuddyStoreDetails', {
      storedata: store,
      itemNumber: itemNumber,
      itemName: itemName,
      category: category,
      storeName: storeName,
    });
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
              Buddy Store Check
            </Text>
            <Text
              style={{
                top: -20,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#333333',
              }}>
              {itemName}
            </Text>
          </View>
          <ScrollView>
            <Pressable onPress={closeMenu}>
              <ScrollView vertical>
                <View style={styles.tilesContainer}>{renderTiles()}</View>
              </ScrollView>
            </Pressable>
          </ScrollView>

          <Footer1 />
        </View>
      </TouchableWithoutFeedback>
      <SideMenu
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        items={store}
        onItemClick={handleMenuItemClick}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7,
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
});

export default StoreData;
