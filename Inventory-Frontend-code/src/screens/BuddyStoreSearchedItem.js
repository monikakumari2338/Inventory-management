import React from 'react';
import {
  FontSize,
  Color,
  FontFamily,
  Border,
} from '../components/GlobalStyles.js';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

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
import {storeContext} from '../StoreContext/LoggedStoreContext';

const BuddyStoreSearchedItem = ({route}) => {
  const {productData} = route.params;
  const {value} = storeContext();
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // const match = productData.productDetailsdto.find(
  //   item => item.store === value,
  // );
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

  console.log('product data ', productData);

  const [selectedColor, setSelectedColor] = useState(
    productData.productDetailsdto[0].color,
  );

  const [selectedSize, setSelectedSize] = useState(
    productData.productDetailsdto[0].size,
  );
  const colors = [
    ...new Set(productData.productDetailsdto.map(product => product.color)),
  ];
  const sizes = [
    ...new Set(productData.productDetailsdto.map(product => product.size)),
  ];

  const selectedProduct = productData.productDetailsdto.find(
    product => product.color === selectedColor && product.size === selectedSize,
  );

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
     <Header showBackButton={true} />
      <TouchableWithoutFeedback onPress={handlepress}>
        <ScrollView>
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
                Buddy Store Stock Check
              </Text>
            </View>
            <ScrollView>
              <View style={[styles.iphone14ProMax1]}>
                <View>
                  <View
                    style={[styles.iphone14ProMax1Child, styles.childBorder1]}>
                    <View style={styles.textContainer}>
                      <Text style={styles.verticalText}>Price</Text>

                      <Text style={styles.verticalText}>Size</Text>

                      <Text style={[styles.verticalText, {left: 7}]}>
                        Color
                      </Text>
                    </View>
                    <View style={styles.textContainer1}>
                      <Text style={styles.verticalText1}>
                        {'\u20B9'}
                        {selectedProduct.price}
                      </Text>

                      <Text style={styles.verticalText2}>
                        {selectedProduct.size}
                      </Text>

                      <Text style={styles.verticalText3}>
                        {selectedProduct.color}
                      </Text>
                    </View>
                  </View>

                  <Image
                    style={styles.productImage}
                    contentFit="cover"
                    source={{uri: selectedProduct.imageData}}
                  />

                  <Text
                    style={[
                      styles.iphone13Pink,
                      styles.iphone13FlexBox,
                      {fontSize: 22},
                    ]}>
                    {productData.itemName}
                  </Text>

                  <Text
                    style={[
                      styles.category,
                      styles.iphone13FlexBox,
                      {fontSize: 18},
                    ]}>
                    {productData.categoryName}
                  </Text>
                  <Text
                    style={[
                      styles.itemnumbber,
                      styles.iphone13FlexBox,
                      {fontSize: 18},
                    ]}>
                    Item number :{productData.itemNumber}
                  </Text>

                  <Text
                    style={[
                      styles.inStock10,
                      styles.iphone13FlexBox,
                      {fontSize: 18},
                    ]}>
                    In Stock
                  </Text>
                  <Text
                    style={[
                      styles.inStock1,
                      styles.iphone13FlexBox,
                      {fontSize: 18},
                    ]}>
                    Current Stock: {selectedProduct.stock}
                  </Text>
                </View>

                <View style={styles.viewContainer}>
                  <Picker
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 2,
                      borderColor: 'red',
                      borderWidth: 2,
                      marginTop: 10,
                      zIndex: 1,
                      top: -10,
                      elevation: 5,
                    }}
                    selectedValue={selectedColor}
                    onValueChange={itemValue => setSelectedColor(itemValue)}>
                    {colors.map(color => (
                      <Picker.Item key={color} label={color} value={color} />
                    ))}
                  </Picker>

                  <Picker
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      marginLeft: 10,
                      borderRadius: 9,
                      borderColor: 'red',
                      borderWidth: 2,
                      marginTop: 10,
                      zIndex: 1,
                      top: -10,
                      elevation: 5,
                    }}
                    selectedValue={selectedSize}
                    onValueChange={itemValue => setSelectedSize(itemValue)}>
                    {sizes.map(size => (
                      <Picker.Item key={size} label={size} value={size} />
                    ))}
                  </Picker>
                </View>
              </View>
            </ScrollView>
            <Footer1 />
          </View>
        </ScrollView>
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
  viewContainer: {
    bottom: -480,
    marginLeft: 20,
    flexDirection: 'row',
    width: '90%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  textContainer: {
    flexDirection: 'row',
    top: 65,
    justifyContent: 'space-evenly',
  },

  verticalText: {
    marginVertical: 35,
    top: -80,

    fontSize: 20,
    color: COLORS.gray,
  },
  textContainer1: {
    top: 10,
  },

  verticalText1: {
    marginVertical: 40,
    top: -90,
    right: -55,
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  verticalText2: {
    marginVertical: 40,
    top: -196,
    right: -178,
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },

  verticalText3: {
    marginVertical: 40,
    top: -303,
    right: -278,
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },

  childBorder1: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    position: 'absolute',
    borderRadius: 12,
    elevation: 2,
  },
  iphone13FlexBox: {
    marginTop: 20,
    height: 40,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: FontSize.size_xl,
    textAlign: 'center',
    position: 'absolute',
  },
  iphone14ProMax1Child: {
    top: 345,
    left: 16,
    width: 378,
    height: 103,
    backgroundColor: Color.white,
  },

  productImage: {
    top: 25,
    left: 124,
    width: 150,
    height: 177,
    position: 'absolute',
  },
  iphone13Pink: {
    top: 190,
    left: 124,
    fontFamily: FontFamily.openSansSemiBold,
    color: Color.black,
    fontWeight: 'bold',
  },
  itemnumbber: {
    top: 222,
    left: 124,
    fontFamily: FontFamily.openSansSemiBold,

    color: Color.black,
  },
  category: {
    top: 245,
    left: 124,
    fontFamily: FontFamily.openSansSemiBold,

    color: Color.black,
  },
  itemnumbber1: {
    top: -245,
    left: 124,
    fontFamily: FontFamily.openSansSemiBold,

    color: Color.black,
  },
  inStock10: {
    top: 285,
    left: -30,
    color: '#34a853',
    fontFamily: FontFamily.openSansRegular,
  },
  inStock1: {
    top: 285,
    left: 225,
    color: '#34a853',
    fontFamily: FontFamily.openSansRegular,
  },
  text: {
    left: 47,
    width: 42,
  },
  viewAvailableStock: {
    top: 565,
    fontSize: 19,
    width: 250,
    textAlign: 'center',
    position: 'absolute',
    color: 'white',
    borderWidth: 1,
    alignItems: 'center',
    left: 58,
    borderRadius: 15,
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },

  iphone14ProMax1: {
    flex: 1,
    marginTop: -55,
    height: 780,
    width: '100%',
    backgroundColor: Color.white,
  },
});

export default BuddyStoreSearchedItem;
