import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SideMenu from './SideMenu';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import COLORS from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './Dashboard';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import Viewrtv from './Viewrtv.js';
import InvAdj from './InvAdj.js';
import ViewInv from './ViewInv';

const CycleStart = ({route}) => {
  const {data} = route.params;
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupVisiblesave, setPopupVisiblesave] = useState(false);
  const [showModal, setshowmodal] = useState(false);
  const [showModalsave, setshowmodalsave] = useState(false);

  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState(Array(data?.length).fill(''));
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
    'View Inventory Adjustment',
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
    if (item === 'Dashboard') {
      navigation.navigate('Dashboard');
    } else if (item === 'StockCheck') {
      navigation.navigate('ItemScanner');
    } else if (item === 'PO Recieve') {
      navigation.navigate('PoSearch');
    } else if (item === 'Transfer Recieve') {
      navigation.navigate('TRsearch');
    } else if (item === 'DSD Recieve') {
      navigation.navigate('DsdSearch');
    } else if (item === 'Return to Vendor') {
      navigation.navigate('Rtvsearch');
    } else if (item === 'Inventory Adjustment') {
      navigation.navigate('InvAdj');
    } else if (item === 'Stock Count') {
      navigation.navigate('CycleCount');
    } else if (item === 'View DSD') {
      navigation.navigate('ViewDSD');
    } else if (item === 'View Vendor Return') {
      navigation.navigate('Viewrtv');
    } else if (item === 'View Inventory Adjustment') {
      navigation.navigate('ViewInv');
    }

    closeMenu();
  };

  const [countedqtys, setCountedqtys] = useState(Array(data?.length).fill(0));

  const openModal = () => {
    setPopupVisible(false);
    setshowmodal(true);
    handlesaveddata();
  };

  const closeModal = () => {
    setshowmodal(false);
    navigation.goBack();
  };
  const closeModalsave = () => {
    setshowmodalsave(false);
  };

  const openPopup = () => {
    // Validate quantities
    const newErrors = countedqtys.map(qty => {
      if (qty === 0 || qty === '' || isNaN(qty)) {
        return 'Invalid Input';
      }
      return '';
    });

    setFormErrors(newErrors);

    if (newErrors.some(error => error !== '')) {
      return;
    }

    setPopupVisible(true);
  };
  const openPopupsave = () => {
    // Validate quantities
    const newErrors = countedqtys.map(qty => {
      if (qty === 0 || qty === '' || isNaN(qty)) {
        return 'Invalid Input';
      }
      return '';
    });

    setFormErrors(newErrors);

    if (newErrors.some(error => error !== '')) {
      return;
    }
    saveDataLocally();

    setPopupVisiblesave(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  const closePopupsave = () => {
    setPopupVisiblesave(false);
  };

  const handleNoClick = () => {
    closePopup();
  };
  const handleNoClicksave = () => {
    closePopupsave();
  };

  const handlecountedqtychange = (index, value) => {
    const isNumeric = /^[0-9]*$/.test(value);
    const newCountedqtys = [...countedqtys];
    newCountedqtys[index] = isNumeric
      ? parseFloat(value) >= 0
        ? parseFloat(value)
        : 0
      : 0;
    setCountedqtys(newCountedqtys);
    console.log('updated countedqty:', newCountedqtys);
  };

  const handlesaveddata = () => {
    const countId = data[0]?.stockcount?.countId || '';
    const countDescription = data[0]?.stockcount?.countDescription || '';

    // Calculate totalBookQty and countedQty
    const totalBookQty = data.reduce(
      (sum, product) => sum + product.bookQty,
      0,
    );

    const countedQty = countedqtys.reduce(
      (sum, countedQty) => sum + parseFloat(countedQty),
      0,
    );

    const varianceQty = totalBookQty - countedQty;
    // Get current date and time for startedAt and completedAt
    const currentDate = new Date();
    const startedAt = currentDate.toISOString();
    const completedAt = startedAt; // Set completedAt to the same as startedAt
    const status = varianceQty !== 0 ? 'processing' : 'complete';
    const reCount = varianceQty !== 0 ? 'processing' : 'complete';

    const savearr = {
      saveStockCountInfo: {
        countId,
        countDescription,
        startedAt,
        completedAt,
        status,
        totalBookQty,
        countedQty,
        varianceQty: Math.abs(totalBookQty - countedQty),
        reCount,
      },
      saveStockCountProducts: data.map((product, index) => ({
        itemNumber: product.itemNumber,
        itemName: product.itemName,
        category: product.category,
        color: product.color,
        price: product.price,
        size: product.size,
        imageData: product.imageData,
        store: product.store,
        bookQty: product.bookQty,
        countedQty: parseFloat(countedqtys[index]),
        varianceQty: Math.abs(parseFloat(product.bookQty) - countedqtys[index]),
      })),
    };

    axios({
      method: 'post',
      url: 'http://172.20.10.9:8083/savestockcount/save',
      data: savearr,
    })
      .then(response => {
        console.log(response.data);
        console.log('Data Saved', data);
        navigation.navigate('CycleCount', {savearr});
        closePopup();
      })
      .catch(error => {
        console.log('Error ', error);
      });
  };

  const saveDataLocally = async () => {
    try {
      const existingSavedData = await AsyncStorage.getItem('savedData');
      const savedData = existingSavedData ? JSON.parse(existingSavedData) : [];
      const countId = data[0]?.stockcount?.countId || '';
      const countDescription = data[0]?.stockcount?.countDescription || '';

      // Calculate totalBookQty and countedQty
      const totalBookQty = data.reduce(
        (sum, product) => sum + product.bookQty,
        0,
      );

      const countedQty = countedqtys.reduce(
        (sum, countedQty) => sum + parseFloat(countedQty),
        0,
      );

      const varianceQty = totalBookQty - countedQty;
      // Get current date and time for startedAt and completedAt
      const currentDate = new Date();
      const startedAt = currentDate.toISOString();
      const completedAt = startedAt; // Set completedAt to the same as startedAt
      const status = varianceQty !== 0 ? 'processing' : 'complete';
      const reCount = varianceQty !== 0 ? 'processing' : 'complete';

      const newData = {
        saveStockCountInfo: {
          countId,
          countDescription,
          startedAt,
          completedAt,
          status,
          totalBookQty,
          countedQty,
          varianceQty: Math.abs(totalBookQty - countedQty),
          reCount,
        },
        saveStockCountProducts: data.map((product, index) => ({
          itemNumber: product.itemNumber,
          itemName: product.itemName,
          category: product.category,
          color: product.color,
          price: product.price,
          size: product.size,
          imageData: product.imageData,
          store: product.store,
          bookQty: product.bookQty,
          countedQty: parseFloat(countedqtys[index]),
          varianceQty: Math.abs(
            parseFloat(product.bookQty) - countedqtys[index],
          ),
        })),
      };
      savedData.push(newData);

      await AsyncStorage.setItem('savedData', JSON.stringify(savedData));

      console.log('Data Saved Locally:', newData);
    } catch (error) {
      console.error('Error saving data locally:', error);
    }
  };

  const renderProductCards = () =>
    data?.map((product, index) => (
      <Pressable key={`${product.itemNumber}-${index}`} onPress={closeMenu}>
        <View style={styles.productCard}>
          <Image
            style={styles.productImage}
            source={{uri: product.imageData}}
          />

          <View style={styles.productInfo}>
            <Text style={{color: 'black'}}>
              Item Number: {product.itemNumber}
            </Text>
            <Text
              style={
                styles.productDetails
              }>{`${product.itemName} | ${product.color}`}</Text>

            <Text style={styles.productDetails}>
              Price:{product.price} | Size: {product.size}
            </Text>
            <Text style={styles.productDetails}>Store: {product.store}</Text>
            <Text style={styles.productDetails}>
              Book Quantity: {product.bookQty}
            </Text>

            {product.stockcount && (
              <View style={styles.quantityContainer}>
                <TextInput
                  style={{
                    backgroundColor: '#e1ebf5',
                    height: 35,

                    width: 55,
                    borderRadius: 15,
                    marginBottom: 55,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderColor: '#e1ebf5',
                    elevation: 9,
                    paddingHorizontal: -33,
                    paddingVertical: 8,
                    textAlign: 'center',
                  }}
                  value={countedqtys[index].toString()}
                  onChangeText={value => {
                    handlecountedqtychange(index, value);
                    setFormErrors(prevError => {
                      const newErrors = [...prevError];
                      newErrors[index] = '';
                      return newErrors;
                    });
                  }}
                  keyboardType="numeric"
                  placeholder="Qty"
                  underlineColor="transparent"
                />
                <Text style={styles.errorText}>{formErrors[index]}</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    ));

  return (
    <View style={{flex: 1, flexGrow: 1}}>
       <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <View style={{flex: 1}}>
          <View style={{top: 1, marginBottom: -60}}>
            <TouchableOpacity onPress={toggleMenu}>
              <Icon name="menu" size={45} color="black" />
            </TouchableOpacity>
            <Text
              style={{top: -45, left: 50, fontSize: 30, color: COLORS.black}}>
              Stock Count
            </Text>
            <TouchableOpacity onPress={openPopup}>
              <View style={styles.addQuantity}>
                <Text style={styles.addQuantityButtonText}>Save Confirm</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addQuantitysave}
              onPress={openPopupsave}>
              <Text style={styles.addQuantityButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={{left: 158, top: 24}}>
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
                    Do you want to save this Cycle Count?
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
            visible={isPopupVisiblesave}
            onRequestClose={closePopupsave}>
            <View style={styles.modalContainer1}>
              <View style={styles.modalContent1}>
                <Icon
                  style={{textAlign: 'center', marginBottom: 15}}
                  name="checkmark-circle-outline"
                  size={60}
                  color="#34A853"
                />
                <Text style={styles.text1}>Count Saved</Text>
                <View style={styles.buttonContainer1}>
                  <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={handleNoClicksave}>
                    <Text style={styles.buttonText1}>Ok</Text>
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
                <Text style={styles.text1}>Saved Successfully!</Text>
                <View style={styles.buttonContainer1}>
                  <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={closeModal}>
                    <Text style={styles.buttonText1}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <ScrollView contentContainerStyle={styles.container}>
            {renderProductCards()}
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
  quantityContainer: {
    top: -110,
    marginLeft: 220,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: -90,
  },
  container: {
    padding: 16,
    top: -18,
    paddingTop: 25,
    flexGrow: 1,
    paddingBottom: 170,
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
    shadowOffset: {width: 0, height: 4},
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
  productDetails: {
    fontSize: 16,
    color: 'grey',
    marginTop: 8,
  },
  addQuantity: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: -20,
    borderRadius: 10,
    marginHorizontal: 160,
    left: 150,
    marginTop: -30,
    top: -25,
  },
  addQuantitysave: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: -20,
    borderRadius: 10,
    marginHorizontal: 160,
    left: 50,
    top: -64,
  },
  addQuantityButtonText: {
    color: 'white',
    textAlign: 'center',
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
  addQuantityButton1: {
    backgroundColor: COLORS.primary,
    padding: 10,
    paddingHorizontal: 17,
    marginTop: -5,
    top: 10,

    borderRadius: 18,
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: -45,
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

export default CycleStart;
