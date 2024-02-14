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
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import CycleCount from './CycleCount';
import ViewInv from './ViewInv';
import Viewrtv from './Viewrtv';
const DsdInvoice = ({route}) => {
  const {data} = route.params;

  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // const navigateToProductsPage = () => {
  //   navigation.navigate('Dsdproducts');
  // };
  const [itemDetails, setItemDetails] = useState(null);

  const [itemNumber, setItemNumber] = useState('');

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

  const fetchDetails = async ({invoiceNumber}) => {
    try {
      const response = await axios.get(
        'http://172.20.10.9:8083/dsd/findby/invoicenumber' +
          '/' +
          `${invoiceNumber}`,
      );
      const data = response.data;
      setItemDetails(data);
      navigation.navigate('Dsdproducts', {
        product: data,
        invoice: invoiceNumber,
      });
    } catch (error) {
      console.log('Error fetching item details:', error);
    }
  };
  //console.log(itemDetails);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <View style={{top: 1}}>
            <TouchableOpacity onPress={toggleMenu}>
              <Icon name="menu" size={45} color="black" />
            </TouchableOpacity>
            <View style={{top: 1}}>
              <Text
                style={{
                  top: -45,
                  left: 50,
                  fontSize: 30,
                  color: COLORS.black,
                }}>
                DSD Recieve
              </Text>
            </View>
            <View style={{marginTop: -15}}>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 22,
                    marginLeft: 24,

                    fontWeight: 'bold',
                  }}>
                  Invoice Number
                </Text>
              </View>
              {data.map(result => (
                <View key={result.invoiceId}>
                  <TouchableOpacity
                    onPress={() =>
                      fetchDetails({invoiceNumber: result.invoiceNumber})
                    }>
                    <View
                      style={{
                        padding: 16,
                        borderWidth: 1,
                        borderColor: '#F4F3F3',
                        elevation: 3,
                        backgroundColor: '#F4F3F3',
                        borderRadius: 8,
                        marginVertical: 3,
                        marginHorizontal: 5,
                      }}>
                      <ScrollView>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            marginLeft: 15,
                          }}>
                          {result.invoiceNumber}
                        </Text>
                        <Ionicons
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            top: -20,
                            color: 'black',
                            marginBottom: -24,
                            left: 350,
                          }}
                          name={'chevron-forward-sharp'}
                          size={22}
                        />
                      </ScrollView>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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

export default DsdInvoice;
