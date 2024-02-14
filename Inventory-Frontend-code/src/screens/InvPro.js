import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CycleCount from './CycleCount';

import ImagePicker from 'react-native-image-picker';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from './colors';
import Footer1 from '../components/Footer1';
import Header from '../components/Header';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import Invproducts from './Invproducts';
import {executeNativeBackPress} from 'react-native-screens';

const API_URL = 'http://172.20.10.9:8083/inventoryadjustment/add/invadjlist';

const InvPro = ({navigation, route}) => {
  const {reason} = route.params;
  const [productList, setProductList] = useState([]);
  const [itemNumber, setItemNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [store, setStore] = useState('');
  const [adjQty, setAdjQty] = useState('');
  const [imageData, setimageData] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [savebuttonclick, setsavebuttonclick] = useState(false);
  const [itemNumberError, setItemNumberError] = useState('');
  const [itemNameError, setItemNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [colorError, setColorError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [storeError, setStoreError] = useState('');
  const [adjQtyError, setAdjQtyError] = useState('');
  const [imgerror, setimgerror] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const [productData, setProductData] = useState(null);

  const stores = [
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

  const addProduct = () => {
    const product = {
      itemNumber,
      itemName,
      category,
      color,
      price,
      size,
      store,
      adjQty,
      imageData,
    };

    setProductList([...productList, product]);

    setItemNumber('');
    setItemName('');
    setCategory('');
    setColor('');
    setPrice('');
    setSize('');
    setStore('');
    setAdjQty('');
    setimageData('');
  };

  // Validation functions for each input field
  const validateItemNumber = () => {
    if (!itemNumber) {
      setItemNumberError('Item Number is required');
    } else if (!/^\d+$/.test(itemNumber)) {
      setItemNumberError('Item Number must be numeric');
    } else {
      setItemNumberError('');
    }
  };

  const validateItemName = () => {
    if (!itemName) {
      setItemNameError('Item Name is required');
    } else {
      setItemNameError('');
    }
  };

  const validateCategory = () => {
    if (!category) {
      setCategoryError('Category is required');
    } else if (!/^[a-zA-Z0-9\s]+$/.test(category)) {
      setCategoryError('No Special Characters');
    } else {
      setCategoryError('');
    }
  };

  const validateColor = () => {
    if (!color) {
      setColorError('Color is required');
    } else if (!/^[a-zA-Z0-9\s]+$/.test(color)) {
      setColorError('No Special Characters');
    } else {
      setColorError('');
    }
  };

  const validatePrice = () => {
    if (!price) {
      setPriceError('Price is required');
    } else if (!/^\d+$/.test(price) || price <= 0) {
      setPriceError('Price must be numeric');
    } else {
      setPriceError('');
    }
  };

  const validateSize = () => {
    if (!size) {
      setSizeError('Size is required');
    } else if (!/^[a-zA-Z0-9\s]+$/.test(size)) {
      setSizeError('No Special Characters');
    } else {
      setSizeError('');
    }
  };

  const validateStore = () => {
    if (!store) {
      setStoreError('Store is required');
    } else {
      setStoreError('');
    }
  };

  const validateimg = () => {
    if (!imageData) {
      setimgerror('Image is required');
    } else {
      setimgerror('');
    }
  };

  const validateAdjQty = () => {
    if (!adjQty) {
      setAdjQtyError('Quantity is required');
    } else if (isNaN(adjQty) || adjQty <= 0) {
      setAdjQtyError('Quantity must be numeric');
    } else {
      setAdjQtyError('');
    }
  };
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showModal, setshowmodal] = useState(false);

  const openModal = () => {
    addProduct();
    saveDataToDatabase();
    setPopupVisible(false);
    setshowmodal(true);

    setItemNumber('');
    setItemName('');
    setCategory('');
    setColor('');
    setPrice('');
    setSize('');
    setStore('');
    setAdjQty('');
    setimageData('');
  };
  const closeModal = () => {
    setshowmodal(false);
    navigation.navigate('Dashboard');
  };

  const openPopup = () => {
    setItemNameError('');
    setItemNameError('');
    setCategoryError('');
    setColorError('');
    setPriceError('');
    setSizeError('');
    setStoreError('');
    setAdjQtyError('');
    setimgerror('');

    validateItemNumber();
    validateItemName();
    validateCategory();
    validateColor();
    validatePrice();
    validateSize();
    validateStore();
    validateAdjQty();
    validateimg();

    // If there are no validation errors, proceed to add the product
    const haserror =
      !itemNumber ||
      !itemName ||
      !category ||
      !color ||
      !size ||
      !store ||
      !price ||
      !adjQty ||
      !imageData ||
      itemNumberError ||
      itemNameError ||
      categoryError ||
      colorError ||
      priceError ||
      sizeError ||
      storeError ||
      adjQtyError ||
      imgerror;

    if (haserror) {
      alert('Please fill in all fields correctly');
      return;
    }

    addProduct();
    setPopupVisible(true);
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
  // console.log('reason from inv pro: ', reason);
  const saveDataToDatabase = () => {
    const requestData = {
      invCombined: {
        reason: route.params.reason,
        status: route.params.status,
        supplierId: route.params.supplierId,
        date: route.params.date,
      },
      productDto: productList,
    };

    axios
      .post(API_URL, requestData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        setProductList([]);
        console.log(productList);
        // navigation.goBack();
      })
      .catch(error => {
        console.log('Error saving data:', error);
      });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getProductByitemNumber/${itemNumber}`,
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        setProductData([]);
        setNoDataFound(true);
        setErrorMessage('No data Found');
      } else {
        setProductData(responseData);
        setNoDataFound(false);
        navigation.navigate('Invproducts', {
          productData: responseData,
          reason: reason,
        });
      }
    } catch (error) {
      console.log(error);
      setNoDataFound(true);
    }
    setItemNumber('');
    setSuggestions([]);
  };
  const handleSuggestionSelect = async selectedItemNumber => {
    setItemNumber(selectedItemNumber);
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getProductByitemNumber/${selectedItemNumber}`,
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        setProductData([]);
        setNoDataFound(true);
        setErrorMessage('No data Found');
      } else {
        setProductData(responseData);
        setNoDataFound(false);
        navigation.navigate('Invproducts', {
          productData: responseData,
          reason: reason,
        });
      }
    } catch (error) {
      console.log(error);
      setNoDataFound(true);
    }
    setItemNumber('');
    setSuggestions([]);
    closeMenu();
  };
  const handleInputChange = async input => {
    setItemNumber(input);
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/product/getMatched/products/itemnumber/${input}`,
      );
      setSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
    setNoDataFound(input.length > 0 && suggestions.length === 0);
  };

  return (
    <SafeAreaView style={styles.container}>
     <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <View style={{top: 1, marginBottom: -55}}>
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
              Inventory Adjustment
            </Text>
            <Text
              style={{
                top: 2,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#333333',
              }}></Text>
          </View>
          <View style={{padding: 16}}>
            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Item Number</Text>
                <TextInput
                  style={styles.input}
                  value={itemNumber}
                  placeholder="Enter Item Number"
                  onChangeText={handleInputChange}
                  onBlur={validateItemNumber}
                  keyboardType="numeric"
                />
                <Text style={styles.validationError}>{itemNumberError}</Text>

                <TouchableOpacity onPress={handleSearch}>
                  <Icon
                    name="search"
                    size={20}
                    color="#333"
                    style={{alignSelf: 'flex-end', top: '-244%', left: '-4%'}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  value={itemName}
                  placeholder="Enter Item Name"
                  onChangeText={text => {
                    setItemName(text);
                    validateItemName();
                  }}
                  onBlur={validateItemName}
                />
                <Text style={styles.validationError}>{itemNameError}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Category</Text>
                <TextInput
                  style={styles.inputsz}
                  value={category}
                  placeholder="Enter Category"
                  onChangeText={text => {
                    setCategory(text);
                    validateCategory();
                  }}
                  onBlur={validateCategory}
                />
                <Text style={styles.validationError}>{categoryError}</Text>

                <View style={styles.inputContainersize}>
                  <Text style={styles.EODText}>Quantity</Text>
                  <TextInput
                    style={styles.inputsz}
                    value={adjQty}
                    placeholder="Enter Quantity"
                    onChangeText={text => {
                      setAdjQty(text);
                      validateAdjQty();
                    }}
                    onBlur={validateAdjQty}
                    keyboardType="numeric"
                  />
                  <Text style={styles.validationqty}>{adjQtyError}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Color</Text>
                <TextInput
                  style={styles.inputsz}
                  value={color}
                  placeholder="Enter Color"
                  onChangeText={text => {
                    setColor(text);
                    validateColor();
                  }}
                  onBlur={validateColor}
                />
                <Text style={styles.validationError}>{colorError}</Text>

                <View style={styles.inputContainersize}>
                  <Text style={styles.EODText}>Size</Text>
                  <TextInput
                    style={styles.inputsz}
                    value={size}
                    placeholder="Enter Size"
                    onChangeText={text => {
                      setSize(text);
                      validateSize();
                    }}
                    onBlur={validateSize}
                  />
                  <Text style={styles.validationError}>{sizeError}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Price</Text>
                <TextInput
                  style={styles.inputsz}
                  value={price}
                  placeholder="Enter Price"
                  onChangeText={text => {
                    setPrice(text);
                    validatePrice();
                  }}
                  onBlur={validatePrice}
                  keyboardType="numeric"
                />
                <Text style={styles.validationError}>{priceError}</Text>

                <View style={styles.inputContainersize}>
                  <Text style={styles.EODText}>Store</Text>
                  <TextInput
                    style={styles.inputsz}
                    value={store}
                    placeholder="Enter Store"
                    onChangeText={text => {
                      setStore(text);
                      validateStore();
                    }}
                    onBlur={validateStore}
                  />
                  <Text style={styles.validationError}>{storeError}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.EODText}>Image</Text>
                <TextInput
                  style={styles.input}
                  value={imageData}
                  placeholder="Enter Image"
                  onChangeText={text => {
                    setimageData(text);
                    validateimg();
                  }}
                  onBlur={validateimg}
                />
                <Text style={styles.validationError}>{imgerror}</Text>
              </View> */}

            {/* {selectedImage && (
          <Image source={{uri: selectedImage.uri}} style={styles.image} />
        )}
        */}
            {/* <Pressable style={styles.savebutton} onPress={openPopup}>
              <Text style={styles.EODbtn}>Save</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={addProduct}>
              <Icon name="add" size={39} color="#00338D" />
            </Pressable> */}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ScrollView
                style={{
                  maxHeight: 150,
                  backgroundColor: 'white',
                  elevation: 7,
                  position: 'absolute',
                  top: '74%',
                  left: "7%",
                  borderRadius: 11,
                  zIndex: 1,
                  width: '94%',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  elevation: 4,
                }}>
                {suggestions.map(suggestion => (
                  <TouchableOpacity
                    key={suggestion.itemNumber}
                    style={styles.suggestionItem}
                    onPress={() =>
                      handleSuggestionSelect(suggestion.itemNumber)
                    }>
                    <Text>{suggestion.itemNumber}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {noDataFound && suggestions.length === 0 && (
              <ScrollView
                style={{
                  maxHeight: 150,
                  backgroundColor: 'white',
                  elevation: 7,
                  position: 'absolute',
                  top: '74%',
                  left: "7%",
                  borderRadius: 8,
                  zIndex: 1,
                  width: '94%',
                  paddingHorizontal: 27,
                  paddingVertical: 5,
                  elevation: 4,
                }}>
                <Text style={styles.noResultsText}>No Results Found</Text>
              </ScrollView>
            )}
            {/* <Modal
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
                  <TouchableOpacity style={styles.button1} onPress={openModal}>
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
          </Modal> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer1 />
      <SideMenu
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        items={stores}
        onItemClick={handleMenuItemClick}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A486F',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 9,
    marginBottom: 10,
    elevation: 3,
  },
  validationError: {
    color: '#ED6B6B',
    fontSize: 14,
    marginTop: -5,
    marginBottom: -7,
    marginLeft: 10,
  },
  validationqty: {
    color: '#ED6B6B',
    fontSize: 14,
    marginTop: -5,
    marginBottom: -7,
    marginLeft: 10,
  },
  inputsz: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 9,
    marginBottom: 10,
    width: 175,
    elevation: 3,
  },

  scroll: {
    padding: 16,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
  },
  EODText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A486F',
    fontWeight: '500',
  },
  button: {
    margin: 20,
    alignItems: 'center',
    left: 302,
    paddingVertical: 3,
    width: 55,
    elevation: 3,
    top: -80,
    borderWidth: 1,
    borderColor: '#f0f8ff',
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
  },
  savebutton: {
    margin: 10,
    fontSize: 24,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: 176,
    elevation: 3,
    backgroundColor: '#00338D',
  },
  EODbtn: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    borderWidth: 1,
    borderColor: '#f0f8ff',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: -5,
  },
  inputContainerprice: {
    top: 1,
  },
  inputContainersize: {
    marginLeft: 180,
    marginTop: -89,
  },
  inputContainerqty: {
    marginLeft: 210,
    marginTop: -82,
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
  suggestionItem: {
    padding: 10,
    
  },
  noResultsText: {
    textAlign: 'center',
    padding: 10,
    fontStyle: 'italic',
    fontWeight: '500',
  },
});

export default InvPro;
