import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import Header from '../components/Header.js';
import Footer1 from '../components/Footer1.js';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors.js';
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
import CycleCount from './CycleCount.js';
import {useState} from 'react';
import Viewrtv from './Viewrtv.js';
import ViewInv from './ViewInv.js';
import {TextInput} from 'react-native-paper';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors.js';
import InvAdjSummary from './InvAdjSummary.js';

const Invproducts = ({route}) => {
  const {productData, reason} = route.params;
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showModal, setshowmodal] = useState(false);

  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [updateproductData, setUpdate] = useState([
    ...productData.productDetailsdto,
  ]);
  const [newData, setNewData] = useState();
  const handleQtyChange = (index, value) => {
    updateproductData[index] = {...updateproductData[index], qty: value};
    // console.log('updateproductData inside block :', updateproductData);
    setUpdate(updateproductData);

    const keyToInclude = 'qty';
    //const arr = JSON.stringify(summary[0].updateproductData);
    const filteredSummaryArray = updateproductData.filter(item =>
      item.hasOwnProperty(keyToInclude),
    );
    //console.log('filteredSummaryArray', filteredSummaryArray);
    setNewData([
      {
        categoryName: productData.categoryName,
        itemName: productData.itemName,
        itemNumber: productData.itemNumber,
        filteredSummaryArray,
      },
    ]);
  };

  // console.log('new data', JSON.stringify(newData));
  //console.log('data :', newData[0].filteredSummaryArray);

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
  const openPopup = () => {
    const savearr = {
      productdto: {
        categoryName: newData[0].categoryName,
        itemName: newData[0].itemName,
        itemNumber: newData[0].itemNumber,
      },
      productDetailsdto: newData[0].filteredSummaryArray.map(item => ({
        color: item.color,
        price: item.price,
        size: item.size,
        stock: item.stock,
        imageData: item.imageData,
        store: item.store,
        itemNumber: item.itemNumber,
        qty: item.qty,
      })),
    };

    console.log(' savearrdata:', savearr);

    axios({
      method: 'post',
      url: 'http://172.20.10.9:8083/product/update/inventory/adjustment',
      data: savearr,
    })
      .then(response => {
        console.log(response.data);
        console.log('saved');
      })
      .catch(error => {
        console.log('Error ', error);
        // console.log('Error Res:', error.response);
      });
    setPopupVisible(true);
  };

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
  const handleNoClick = () => {
    closePopup();
  };
  const closePopup = () => {
    setPopupVisible(false);
  };
  const openModal = () => {
    //saveDataToDatabase();
    setPopupVisible(false);
    navigation.navigate('InvAdjSummary', {
      summary: updateproductData,
      itemName: newData[0].itemName,
      reason: reason,
    });
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
  //console.log('reason from products ', reason);

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
              Inventory Adjustment
            </Text>
          </View>
          <Text style={{fontSize: 15, color: 'black', padding: 5}}>
            Product Details
          </Text>
          <View style={styles.productdetails}>
            <Image
              style={styles.productImage}
              contentFit="cover"
              source={{uri: productData.productDetailsdto[1].imageData}}
            />
            <Text style={{fontSize: 20, color: 'black', padding: 8}}>
              Item Name: {productData.itemName}
            </Text>
            <Text style={{fontSize: 20, color: 'black', padding: 8}}>
              Item Number: {productData.itemNumber}
            </Text>
            <Text style={{fontSize: 20, color: 'black', padding: 8}}>
              Category: {productData.categoryName}
            </Text>
          </View>

          <ScrollView style={styles.container}>
            {productData.productDetailsdto.map((item, index) => (
              <TouchableOpacity key={item.id}>
                <View style={styles.variant}>
                  <View>
                    <Text style={styles.variantstyles}>{item.size}</Text>
                  </View>
                  <View>
                    <Text style={styles.variantstyles}>{item.color}</Text>
                  </View>
                  <View>
                    <Text style={styles.variantstyles}>{item.stock}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TextInput
                      key={item.id}
                      style={{
                        backgroundColor: '#e1ebf5',
                        height: 20,
                        width: 55,
                        borderRadius: 10,
                        marginBottom: 45,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderColor: '#e1ebf5',
                        elevation: 8,
                        paddingHorizontal: -30,
                        paddingVertical: 8,
                        textAlign: 'center',
                        marginRight: 20,
                        justifyContent: 'space-evenly',
                        display: 'flex',
                      }}
                      value={item.qty}
                      onChangeText={text => handleQtyChange(index, text)}
                      keyboardType="numeric"
                      placeholder="Qty"
                      underlineColor="transparent"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <Pressable style={styles.savebutton} onPress={openPopup}>
              <Text style={styles.EODbtn}>Save</Text>
            </Pressable>
          </ScrollView>

          {/* <Pressable style={styles.button} onPress={addProduct}>
              <Icon name="add" size={39} color="#00338D" />
            </Pressable> */}

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
    flex: 1,
    padding: -5,
  },
  tableContainer: {
    marginTop: 45,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
    backgroundColor: COLORS.primary,
  },
  productdetails: {
    borderColor: 'black',
    borderWidth: 1,
    height: 150,
    width: 400,
    margin: 6,
    backgroundColor: '#F4F3F3',
  },
  headerText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    left: -14,
    padding: 2,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -20,
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
    marginTop: 30,
    fontSize: 24,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: 176,
    elevation: 3,
    backgroundColor: COLORS.primary,
    color: '#00338',
  },
  productImage: {
    top: 10,
    left: 270,
    width: 100,
    height: 130,
    position: 'absolute',
    padding: 2,
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
  quantityContainer: {
    top: 4,
    left: '80%',
    flexDirection: 'column',
    position: 'absolute',
    marginBottom: '20%',
  },
  quantityText: {
    fontSize: 16,
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
  EODbtn: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  variant: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 400,
    margin: 6,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  variantstyles: {
    color: 'black',
    padding: '3%',
    fontSize: 17,
    paddingHorizontal: '5%',
    // display: 'inline-block',
    // display: 'flex',
    position: 'relative',
    //width: '1%',
    justifyContent: 'space-evenly',
  },
  varientAlign: {
    display: 'flex',
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
});

export default Invproducts;
