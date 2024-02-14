import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Footer1 from '../components/Footer1';

import Header from '../components/Header';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import Viewrtv from './Viewrtv.js';
import InvAdj from './InvAdj.js';
import Dashboard from './Dashboard';
import SideMenu from './SideMenu';
import COLORS from './colors';
import CycleCount from './CycleCount';
import ViewInv from './ViewInv';
import ViewDSD from './ViewDSD';

const ViewInvPro = ({route}) => {
  const {adjId} = route.params;

  const [productData, setproductData] = useState(null);
  const navigation = useNavigation();

  const navigateToScreen = SizeMatrix => {
    navigation.navigate(SizeMatrix);
  };
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

  useEffect(() => {
    axios

      .get(
        `http://172.20.10.9:8083/inventoryadjustment/getinventoryadjustmentlist/id/${adjId}`,
      )
      .then(response => {
        setproductData(response.data);
      })
      .catch(error => {
        console.log('Error fetching invoice details:', error);
      });
  }, [adjId]);
  console.log(productData);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={toggleMenu}>
                <Icon name="menu" size={45} color="black" />
              </TouchableOpacity>
              <Text
                onPress={() => navigateToScreen('ViewInv')}
                style={{
                  top: 3,
                  fontSize: 30,
                  marginLeft: 2,
                  marginBottom: 10,
                  color: COLORS.black,
                }}>
                View Inv Adj
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <ScrollView contentContainerStyle={styles.container}>
            {productData &&
              productData.map((res, index) => (
                <View key={res.id} style={styles.productCard}>
                  <Image
                    style={styles.productImage}
                    source={{uri: res.imageData}}
                  />

                  <View style={styles.productInfo}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {res.itemNumber}
                    </Text>

                    <Text style={styles.productDetails}>
                      {res.itemName}| {res.color}
                    </Text>
                    <Text style={styles.productDetails}>
                      Price: {res.price}
                    </Text>

                    <Text style={styles.productDetails}> Size: {res.size}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity style={styles.addQuantityButton1}>
                        <Text style={styles.addQuantityButtonText}>
                          {res.adjQty}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
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
    padding: 16,
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',

    padding: 15,
    borderRadius: 5,
    paddingHorizontal: 7,
    margin: 2,

    marginHorizontal: -5,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,

      height: 4,
    },

    shadowOpacity: 0.3,

    shadowRadius: 4.65,

    elevation: 5,
  },

  productImage: {
    width: 65,

    height: 90,

    marginRight: 26,
  },

  productInfo: {
    flex: 2,
  },

  productId: {
    fontSize: 14,
    color: 'black',
  },
  qtydetails: {
    fontSize: 15,
    color: 'black',
    marginTop: 8,
  },
  productDetails: {
    fontSize: 16,
    color: 'grey',
    marginTop: 8,
  },
  quantityContainer: {
    top: -80,
    left: 90,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: -30,
  },
  quantityText: {
    fontSize: 16,
  },

  addQuantityButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    paddingHorizontal: 17,
    marginTop: -5,
    top: -10,

    borderRadius: 18,
  },
  addQuantityButton1: {
    backgroundColor: COLORS.primary,
    padding: 10,
    paddingHorizontal: 17,
    marginTop: -15,
    top: 10,

    borderRadius: 18,
  },
  addQuantity: {
    backgroundColor: COLORS.primary,

    paddingVertical: 10,

    paddingHorizontal: 20,

    borderRadius: 10,

    marginHorizontal: 170,
  },
  addQuantityButtonText: {
    color: 'white',
  },

  modalContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',

    padding: 16,

    borderRadius: 5,

    width: '80%',
  },

  modalTitle: {
    fontSize: 18,

    marginBottom: 16,
  },

  quantityInput: {
    borderWidth: 1,

    borderColor: 'gray',

    padding: 8,

    borderRadius: 2,

    marginBottom: 12,
  },

  confirmButton: {
    backgroundColor: COLORS.primary,

    padding: 12,

    borderRadius: 5,

    alignItems: 'center',
  },

  confirmButtonText: {
    color: 'white',
  },

  cancelButton: {
    backgroundColor: 'white',

    padding: 12,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 8,

    alignItems: 'center',
  },

  cancelButtonText: {
    color: COLORS.primary,
  },
  text1: {
    fontSize: 18,

    color: '#484848',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: COLORS.primary,

    paddingVertical: 10,

    paddingHorizontal: 28,

    borderRadius: 20,

    marginHorizontal: 30,
  },
  buttonsave: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 38,
    borderRadius: 20,
    marginHorizontal: 30,
  },

  buttonText1: {
    color: 'white',

    fontSize: 16,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    paddingVertical: 15,
    paddingHorizontal: 68,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalsaveContent1: {
    paddingVertical: 40,

    paddingHorizontal: 28,
    backgroundColor: 'white',
    padding: 20,

    borderRadius: 10,
  },

  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 19,
  },
});

export default ViewInvPro;
