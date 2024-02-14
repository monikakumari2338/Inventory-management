import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Footer1 from '../components/Footer1';

import Header from '../components/Header';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import CycleCount from './CycleCount';
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
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import COLORS from './colors';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Rtvdisplay = ({route}) => {
  const {apiData} = route.params;

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showModal, setshowmodal] = useState(false);

  //const [selectedReason, setSelectedReason] = useState(null);
  const [reason, setReason] = useState(''); // State to store the selected reason
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isReasonSelected, setIsReasonSelected] = useState(false);
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

  // List of reasons
  const reasons = ['Wrong', 'Excess', 'Damage'];

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    setIsReasonSelected(true);
  };

  // Function to select a reason
  const selectReason = selectedReason => {
    setReason(selectedReason);
    setDropdownVisible(false);
    setIsReasonSelected(true);
  };
  const openModal = () => {
    setPopupVisible(false);
    setshowmodal(true);
  };
  const closeModal = () => {
    setshowmodal(false);
    navigation.navigate('Dashboard');
  };

  const openPopup = () => {
    if (isReasonSelected) {
      setPopupVisible(true);
    }
    console.log('Reason is not selected');
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleYesClick = () => {
    closePopup();
  };

  const handleNoClick = () => {
    closePopup();
  };
  const navigation = useNavigation();

  const navigateToScreen = SizeMatrix => {
    navigation.navigate(SizeMatrix);
  };
  const uurl = 'http://172.20.10.9:8083/returntovendor/addrtvitems';

  const handlesaveddata = async () => {
    setIsReasonSelected(true);
    if (!reason) {
      setIsReasonSelected(false);
      openPopup();

      return;
    }
    if (apiData && apiData.rtvInfodto && apiData.rtvProductsdto) {
      const rtvId = apiData.rtvProductsdto[0].rtvId;
      const posturl = `http://172.20.10.9:8083/returntovendor/addrtvitems/${rtvId}`;
      const currentDate = new Date().toISOString().split('T')[0];
      const saveData = {
        rtvProcessInfo: {
          poNumber: apiData.rtvInfodto.poNumber,
          supplierId: apiData.rtvInfodto.supplierId,
          supplierName: apiData.rtvInfodto.supplierName,
          status: 'In-progress',
          reason: reason,
          date: currentDate,
        },
        rtvProcessProducts: apiData.rtvProductsdto.map(res => ({
          itemNumber: res.itemNumber,
          itemName: res.itemName,
          category: res.category,
          color: res.color,
          price: res.price,
          size: res.size,
          imageData: res.imageData,
          store: res.store,
          returnQty: res.returnQty,
        })),
      };
      console.log(posturl);
      //  console.log('data:', saveData);

      try {
        const response = await axios.post(posturl, saveData);
        console.log('Data Saved', response.data);
        openModal(); // Show success modal or navigate to another screen here
      } catch (error) {
        console.log('Error:', error);
        // Handle the error as needed (e.g., show an error message).
      }
    } else {
      console.log('apiData is undefined or missing necessary properties.');
      // Handle the case where data is missing or invalid.
    }
    setIsReasonSelected(true);
  };
  console.log(apiData);
  return (
    <View style={{flex: 1}}>
       <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <View style={{top: 1, marginBottom: -75}}>
            <TouchableOpacity onPress={toggleMenu}>
              <Icon name="menu" size={45} color="black" />
            </TouchableOpacity>

            <Text
              onPress={() => navigateToScreen('Rtvsearch')}
              style={{
                top: -45,

                left: 50,

                fontSize: 30,

                color: COLORS.black,
              }}>
              Return to vendor
            </Text>
          </View>

          <View>
            {/* Display selected reason */}
            <TouchableOpacity style={styles.addreason} onPress={toggleDropdown}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {!!reason ? reason : 'Reason'}
                  <Text style={{color: isReasonSelected ? 'white' : '#ED6B6B'}}>
                    *
                  </Text>
                </Text>
                <Icon
                  style={{left: 3}}
                  name={
                    isDropdownVisible
                      ? 'caret-up-outline'
                      : 'caret-down-outline'
                  }
                  color={isReasonSelected ? 'black' : 'black'}
                  size={16}
                />
              </View>
            </TouchableOpacity>
            {!isReasonSelected && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  marginLeft: 235,
                  marginBottom: -20,
                  left: -3,
                  top: -10,
                }}>
                '.'
              </Text>
            )}

            {/* Dropdown modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isDropdownVisible}>
              <View style={styles.modalContainer}>
                {reasons.map(r => (
                  <TouchableOpacity
                    key={r}
                    style={styles.dropdownItem}
                    onPress={() => selectReason(r)}>
                    <Text style={styles.dropdownItemText}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </View>
          <View style={{left: 158, top: 5}}>
            <TouchableOpacity style={styles.addQuantity} onPress={openPopup}>
              <Text style={styles.addQuantityButtonText}>Save</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isPopupVisible}
              onRequestClose={closePopup}>
              <View style={styles.modalContainer1}>
                <View style={styles.modalsaveContent1}>
                  <Icon
                    style={{textAlign: 'center', marginBottom: 15}}
                    name="save-outline"
                    size={55}
                    color="#699BF7"
                  />
                  <Text style={styles.text1}>Do you want to save?</Text>
                  <View style={styles.buttonContainer1}>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={handlesaveddata}>
                      <Text style={styles.buttonText1}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={handleNoClick}>
                      <Text style={styles.buttonText1}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={closePopup}>
            <View style={styles.modalContainer1}>
              <View style={styles.modalContent1}>
                <Icon
                  style={{textAlign: 'center', marginBottom: 15}}
                  name="checkmark-circle-outline"
                  size={60}
                  color="#34A853"
                />
                <Text style={styles.text1}>Saved Succesfully!</Text>
                <View style={styles.buttonContainer1}>
                  <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={closeModal}>
                    <Text style={styles.buttonText1}>ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <ScrollView contentContainerStyle={styles.container}>
            {apiData && (
              <View>
                {apiData.rtvProductsdto.map(res => (
                  <View key={res.id} style={styles.productCard}>
                    <Image
                      style={styles.productImage}
                      source={{uri: res.imageData}}
                    />

                    <View style={styles.productInfo}>
                      <Text style={{color: 'black'}}>{res.itemNumber}</Text>

                      <Text style={styles.productDetails}>
                        {res.itemName}| {res.color}
                      </Text>
                      <Text style={styles.productDetails}>
                        Price: {res.price}
                      </Text>

                      <Text style={styles.productDetails}>
                        {' '}
                        Size: {res.size}
                      </Text>
                      <Text style={styles.productDetails}>
                        {' '}
                        Store: {res.store}
                      </Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.addQuantityButton1}>
                          <Text style={styles.addQuantityButtonText}>
                            {res.returnQty}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
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
    </View>
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
  addreason: {
    backgroundColor: 'white',
    top: 45,
    left: 60,
    textAlign: 'center',
    paddingVertical: 10,

    paddingHorizontal: 20,

    borderRadius: 10,

    marginHorizontal: 155,
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

  reasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 19,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 19,
  },
  modalContainer: {
    position: 'absolute',
    top: 168, // Adjust this to position the dropdown correctly
    right: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 110, // Adjust the width as needed
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 14,
  },
});

export default Rtvdisplay;
