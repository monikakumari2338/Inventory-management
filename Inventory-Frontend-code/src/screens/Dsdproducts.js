import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Footer1 from '../components/Footer1';
import CycleCount from './CycleCount';
import Header from '../components/Header';
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

import COLORS from './colors';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';

const Dsdproducts = ({route}) => {
  const {product, invoice} = route.params;

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showModal, setshowmodal] = useState(false);
  const [inputValues, setInputValues] = useState(
    Array(product.length).fill(''),
  );
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
  const [errors, setError] = useState(Array(product.length).fill(''));
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
  const openModal = () => {
    setPopupVisible(false);
    setshowmodal(true);
    handlesaveddata();
  };
  const closeModal = () => {
    setshowmodal(false);
    navigation.navigate('Dashboard');
  };

  const openPopup = () => {
    // Check if any quantity input is empty or invalid
    const hasInvalidInput = inputValues.some(
      value => value.trim() === '' || !/^[0-9]+$/.test(value),
    );

    if (hasInvalidInput) {
      // Handle validation error by updating the errors state
      const newError = inputValues.map(value =>
        value.trim() === '' || !/^[0-9]+$/.test(value) ? 'Invalid Input' : '',
      );
      setError(newError);
    } else {
      // Clear errors and open the modal
      setError(Array(product.length).fill(''));
      setPopupVisible(true);
    }
  };
  const handleInputChange = (text, index) => {
    const isvalid = text.trim() !== '';

    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    const newError = [...errors];
    newError[index] = isvalid ? ' ' : 'Invalid Input';
    setError(newError);
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
  const uurl =
    'http://172.20.10.9:8083/dsd/savedsdproduct' + '/' + `${invoice}`;

  const handlesaveddata = () => {
    const savearr = [];
    for (let i = 0; i < product.length; i++) {
      const enterqty = parseInt(inputValues[i]) || 0;
      savearr.push({
        productdto: {
          itemNumber: product[i].itemNumber,
          itemName: product[i].itemName,
          categoryName: product[i].category,
        },
        productDetailsdto: {
          color: product[i].color,
          price: product[i].price,
          store: product[i].store,
          size: product[i].size,
          stock: enterqty,
          imageData: product[i].imageData,
          itemNumber: product[i].itemNumber,
        },
      });
    }
    console.log('data:', savearr);
    console.log(uurl);

    axios({
      method: 'post',
      url: 'http://172.20.10.9:8083/dsd/savedsdproduct' + '/' + `${invoice}`,
      data: savearr,
    })
      .then(response => {
        console.log(response.data);

        console.log('Data Saved', product);
      })
      .catch(error => {
        console.log('Error ', error);
        // console.log('Error Res:', error.response);
      });
    closePopup();
  };
  console.log(uurl);
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
              onPress={() => navigateToScreen('DsdSearch')}
              style={{
                top: -45,

                left: 50,

                fontSize: 30,

                color: COLORS.black,
              }}>
              DSD Receive
            </Text>
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
                  <Text style={styles.text1}>
                    Do you want to save this DSD receiving?
                  </Text>
                  <View style={styles.buttonContainer1}>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={openModal}>
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
            {product &&
              product.map((res, index) => (
                <View key={res.invoiceId} style={styles.productCard}>
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

                    <Text style={styles.productDetails}> Size: {res.size}</Text>
                    {/* <View style={styles.quantityContainer}>
                      <TouchableOpacity style={styles.addQuantityButton1}>
                        <Text style={styles.addQuantityButtonText}>
                          {res.stock}
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                    <View style={styles.quantityContainer}>
                      <TextInput
                        style={styles.quantityInput}
                        placeholder="Qty"
                        keyboardType="numeric"
                        value={inputValues[index]}
                        onChangeText={text => handleInputChange(text, index)}
                      />
                      {errors[index] !== ' ' && (
                        <Text
                          style={{
                            color: '#ED6B6B',
                            fontSize: 14,
                            top: 6,
                            marginTop: -5,
                          }}>
                          {errors[index]}
                        </Text>
                      )}
                      <TouchableOpacity style={styles.addQuantityButton1}>
                        <Text style={styles.addQuantityButtonText}>
                          {inputValues[index]}/{res.stock}
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
    marginBottom: -40,
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
    marginTop: -35,
    top: 42,

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
    borderWidth: 2,
    padding: 12,
    marginTop: -26,
    backgroundColor: '#e1ebf5',
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#e1ebf5',
    elevation: 9,
    textAlign: 'center',
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
export default Dsdproducts;
