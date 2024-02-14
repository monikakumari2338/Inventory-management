import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Footer1 from '../components/Footer1';

import Header from '../components/Header';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

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
import CycleCount from './CycleCount';
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

import PurchaseMenu from '../components/PurchaseMenu';
import ViewInv from './ViewInv';
import Viewrtv from './Viewrtv';

const DS = ({route}) => {
  const {data} = route.params;

  const urll =
    'http://172.20.10.9:8083/product/addproducts' + '/' + `${receivedQty}`;

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
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

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showModal, setshowmodal] = useState(false);

  const [isPopupVisiblev, setPopupVisiblev] = useState(false);
  const [showModalv, setshowmodalv] = useState(false);
  const [errors, setError] = useState(Array(data.length).fill(''));

  const openModal = () => {
    setPopupVisible(false);
    setshowmodal(true);
    handlesavedata();
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
      setError(Array(data.length).fill(''));
      setPopupVisible(true);
    }
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

  const openModalv = () => {
    setPopupVisible(false);
    setshowmodal(true);
    handleReturnData();
  };
  const closeModalv = () => {
    setshowmodalv(false);
    navigation.navigate('Dashboard');
  };

  const openPopupv = () => {
    const hasInvalidInput = inputValues.some(
      value => value.trim() === '' || !/^[0-9]+$/.test(value),
    );

    if (hasInvalidInput) {
      // Handle validation error by updating the errors state
      const newError = inputValues.map(value =>
        value.trim() === '' || !/^[0-9]+$/.test(value) ? 'Required' : '',
      );
      setError(newError);
    } else {
      // Clear errors and open the modal
      setError(Array(data.length).fill(''));
      setPopupVisiblev(true);
    }
  };

  const closePopupv = () => {
    setPopupVisiblev(false);
  };

  const handleYesClickv = () => {
    closePopupv();
  };

  const handleNoClickv = () => {
    closePopupv();
  };

  const navigateToScreen = SizeMatrix => {
    navigation.navigate(SizeMatrix);
  };

  const [inputValues, setInputValues] = useState(Array(data.length).fill(''));
  const [receivedQty, setReceivedQty] = useState(0);
  const calculateTotalStock = () => {
    let totalStock = 0;
    inputValues.forEach(quantity => {
      totalStock += parseInt(quantity) || 0;
    });
    setReceivedQty(totalStock);
  };
  const handleInputChange = (text, index) => {
    const isvalid = text.trim() !== '';

    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    const newError = [...errors];
    newError[index] = isvalid ? ' ' : 'Required';
    setError(newError);
  };
  const handlesavedata = () => {
    // Check if any quantity input is empty
    if (inputValues.some(value => value.trim() === '')) {
      // Handle validation error, e.g., display red text or show an alert
      // For now, let's log an error message
      console.log('Validation Error: Please fill all quantity fields');
      return; // Do not proceed with saving if there are validation errors
    }
    const savearr = [];

    // let totalrcv = 0;

    for (let i = 0; i < data.length; i++) {
      const enterqty = parseInt(inputValues[i]) || 0;
      const totalrcv = enterqty;

      savearr.push({
        productdto: {
          itemNumber: data[i].items.itemNumber,
          itemName: data[i].items.itemName,
          categoryName: data[i].items.category,
        },
        productDetailsdto: {
          color: data[i].color,
          price: data[i].price,
          store: data[i].store,
          size: data[i].size,
          stock: enterqty,
          imageData: data[i].imageData,
          itemNumber: data[i].items.itemNumber,
          poNumber: data[i].items.purchaseOrder.poNumber,
          status: data[i].items.purchaseOrder.asn.status,
          received_qty: totalrcv,
        },
      });
    }
    console.log(savearr);
    axios({
      method: 'post',
      url:
        'http://172.20.10.9:8083/product/addproducts' + '/' + `${receivedQty}`,
      data: savearr,
    })
      .then(response => {
        console.log(response.data);

        console.log('Data Saved', data);
      })
      .catch(error => {
        console.log('Error ', error);
      });
    closePopup();
  };

  const handleReturnData = () => {
    if (inputValues.some(value => value.trim() === '')) {
      // Handle validation error, e.g., display red text or show an alert
      // For now, let's log an error message
      console.log('Validation Error: Please fill all quantity fields');
      return; // Do not proceed with saving if there are validation errors
    }
    // Filter products that don't meet the expected stock level
    const returnData = data.filter((product, index) => {
      return parseInt(inputValues[index]) < product.items.expectedQty;
    });

    if (returnData.length === 0) {
      // No products to return
      closePopupv();
      return;
    }

    // Prepare the data for the return post API
    const returnPostData = {
      rtvInfodto: {
        poNumber: data[0].items.purchaseOrder.poNumber,
        supplierId: data[0].items.purchaseOrder.supplierId.supplierId,
        supplierName: data[0].items.purchaseOrder.supplierId.supplierName,
        date: new Date().toISOString().split('T')[0],
      },
      rtvProductsdto: returnData.map((product, index) => {
        return {
          itemNumber: product.items.itemNumber,
          itemName: product.items.itemName,
          category: product.items.category,
          color: product.color,
          price: product.price,
          size: product.size,
          imageData: product.imageData,
          store: product.store,
          returnQty: inputValues[index],
          rtvId: null, // It will be auto-generated by the server
        };
      }),
    };

    // Send the data to your return post API
    axios({
      method: 'post',
      url: 'http://172.20.10.9:8083/returntovendor/addrtv/itemlist',
      data: returnPostData,
    })
      .then(response => {
        console.log('Data Saved', response.data);
      })
      .catch(error => {
        console.log('Error ', error);
      });
    console.log(returnPostData);
    closePopupv();
  };

  console.log('Product Quantities:', inputValues);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header showBackButton={true} />
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={handlepress}>
          <View style={{flex: 1}}>
            <View style={{top: 1, flex: 1}}>
              <TouchableOpacity onPress={toggleMenu}>
                <Icon name="menu" size={45} color="black" />
              </TouchableOpacity>
              <Text
                onPress={() => navigateToScreen('PoSearch')}
                style={{
                  top: -45,

                  left: 50,

                  fontSize: 30,

                  color: COLORS.black,
                }}>
                PO Receive
              </Text>

              <View style={{left: 158, marginTop: -70}}>
                <TouchableOpacity
                  style={styles.addQuantity}
                  onPress={() => {
                    calculateTotalStock(); // Calculate total stock before saving
                    openPopup();
                  }}>
                  {/* <TouchableOpacity style={styles.addQuantity} onPress={openPopup}> */}
                  <Text style={styles.addQuantityButtonText}>Save</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.addQuantity1}
                  onPress={openPopupv}>
                  <Text style={styles.addQuantityButtonText}>Return</Text>
                </TouchableOpacity> */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isPopupVisiblev}
                  onRequestClose={closePopupv}>
                  <View style={styles.modalContainer1}>
                    <View style={styles.modalsaveContent1}>
                      <Icon
                        style={{textAlign: 'center', marginBottom: 15}}
                        name="save-outline"
                        size={55}
                        color="#699BF7"
                      />
                      <Text style={styles.text1}>Return to vendor</Text>
                      <View style={styles.buttonContainer1}>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={openModalv}>
                          <Text style={styles.buttonText1}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={handleNoClickv}>
                          <Text style={styles.buttonText1}>No</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
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
                        Do you want to save this PO receiving?
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

              <ScrollView
                style={{flex: 1}}
                keyboardShouldPersistTaps="always"
                scrollEnabled={true}>
                <View style={{flex: 1}}>
                  <View style={{flex: 1, padding: 16}}>
                    {data.map((product, index) => (
                      <View key={product.id} style={styles.productCard}>
                        <Image
                          style={styles.productImage}
                          source={{uri: product.imageData}}
                        />

                        <View style={styles.productInfo}>
                          <Text style={{color: 'black'}}>
                            Product ID: {product.items.itemNumber}
                          </Text>

                          <Text style={styles.productDetails}>
                            {product.items.itemName} | {product.color}
                          </Text>
                          <Text style={styles.productDetails}>
                            Price: ${product.price}
                          </Text>

                          <Text style={styles.productDetails}>
                            Size: {product.size}
                          </Text>
                          {/* <Text style={styles.productDetails}>
                    Date: {product.items.purchaseOrder.asn.date}
                  </Text> */}

                          <View style={styles.quantityContainer}>
                            <TextInput
                              style={styles.quantityInput}
                              placeholder="Qty"
                              keyboardType="numeric"
                              value={inputValues[index]}
                              onChangeText={text =>
                                handleInputChange(text, index)
                              }
                            />
                            {errors[index] !== ' ' && (
                              <Text
                                style={{
                                  color: '#ED6B6B',
                                  fontSize: 14,
                                  top: 2,
                                  marginTop: -15,
                                }}>
                                {errors[index]}
                              </Text>
                            )}
                            <TouchableOpacity style={styles.addQuantityButton1}>
                              <Text style={styles.addQuantityButtonText}>
                                {inputValues[index]}/{product.items.expectedQty}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    top: -110,
    left: 90,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: -100,
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
    marginTop: -5,
    top: 10,

    borderRadius: 18,
  },
  addQuantity1: {
    backgroundColor: COLORS.primary,

    paddingVertical: 10,

    paddingHorizontal: 15,

    borderRadius: 10,

    marginHorizontal: 170,
    marginTop: -38,
    left: -85,
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
    marginBottom: 12,
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

export default DS;
