import React, {useState} from 'react';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CycleCount from './CycleCount';
import Footer1 from '../components/Footer1';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TRdetails = ({route}) => {
  const {data} = route.params;
  const navigation = useNavigation();
  const [itemDetails, setItemDetails] = useState(null);

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

  const fetchDetails = async ({transfer_id}) => {
    try {
      const response = await axios.get(
        'http://172.20.10.9:8083/transferreceive/findby/transferid' +
          '/' +
          `${transfer_id}`,
      );
      const data = response.data;
      setItemDetails(data);
      console.log(itemDetails);

      navigation.navigate('TRproducts', {
        product: data,
        invoice: transfer_id,
      });
    } catch (error) {
      console.log('Error fetching item details:', error);
    }
  };
  console.log(itemDetails);

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
              Transfer Recieve
            </Text>
          </View>

          {/* <Text style={{color: 'black', fontSize: 18, marginLeft: 24}}>
            Transfer
          </Text> */}
          {data.map(result => (
            <View key={result.transfer_id}>
              <TouchableOpacity
                onPress={() => fetchDetails({transfer_id: result.transfer_id})}>
                <View
                  style={{
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#F4F3F3',
                    elevation: 3,
                    backgroundColor: '#e1ebf5',
                    borderRadius: 8,
                    marginVertical: 3,
                    marginHorizontal: 5,
                  }}>
                  <ScrollView>
                    <Text
                      style={{color: 'black', fontSize: 15, marginLeft: 15}}>
                      Transfer Id: {result.transfer_id}
                      {'    '} Store From:
                      {result.storeFrom}
                      {'    '} Store To: {result.storeTo}
                    </Text>
                  </ScrollView>
                  <Ionicons
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      right: -340,
                      marginTop: -21,
                    }}
                    name={'chevron-forward-sharp'}
                    size={23}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
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

export default TRdetails;
