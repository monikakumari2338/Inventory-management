import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import SideMenu from './SideMenu';
import COLORS from './colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ItemScanner from './ItemScanner.js';
import PoSearch from './PoSearch.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import InvAdj from './InvAdj.js';
import Dashboard from './Dashboard';
import CycleCount from './CycleCount.js';
import Viewrtv from './Viewrtv.js';
import ViewInv from './ViewInv.js';
import {Pressable} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {useRoute} from '@react-navigation/native';
const InvAdjSummary = () => {
  const route = useRoute();
  const {summary, itemName, reason} = route.params;
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPopupVisiblesave, setPopupVisiblesave] = useState(false);
  const [downloadfile, setdownloadfile] = useState('');
  const [filtereddata, setfiltereddata] = useState('');
  // console.log(' summary reason', reason);
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

  const handleOk = () => {
    navigation.navigate(InvAdj);
    closePopupsave();
  };

  const handlePrint = () => {
    console.log('printed successfully');
    setPopupVisiblesave(true);
    downloadPDF();
  };

  const closePopupsave = () => {
    setPopupVisiblesave(false);
  };
  const handleNoClicksave = () => {
    closePopupsave();
  };
  const openPopupsave = () => {
    setPopupVisiblesave(true);
    handlePrint();
  };

  const downloadPDF = async () => {
    try {
      // Prepare HTML content
      const htmlContent = `
        <html>
          <head>
            <style>
              ${stylesToInline(styles)}
            </style>
          </head>
          <body>
          <h1>Inventory Adjustment Details</h1>
          <h1>Inventory Adjustment Reason : ${reason}</h1>
          ${filteredSummaryArray
            .map(
              (item, index) => `
            <div style="margin-bottom: 10px;">
              <p><strong>Item No:</strong> ${item.itemNumber}</p>
              <p><strong>Name:</strong> ${itemName}</p>
              <p><strong>Size:</strong> ${item.size}</p>
              <p><strong>Color:</strong> ${item.color}</p>
              <p><strong>Adjusted qty:</strong> ${item.qty}</p>
            </div>
          `,
            )
            .join('')}
        </body>
        </html>
      `;

      // Create PDF file
      const {filePath: localFilePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'Inventory Adjustment Details',
        base64: true,
      });

      // Define the Downloads folder path on your computer
      const downloadsFolderPath = '/storage/emulated/0/Download';

      // Move the file to the Downloads folder
      const targetFilePath = `${downloadsFolderPath}/InvAdjustmentDetails.pdf`;

      await RNFS.moveFile(localFilePath, targetFilePath);

      setdownloadfile(targetFilePath);

      // Alert user about successful download
      // Alert.alert(
      //   'Download Success',
      //   `The PDF file has been downloaded successfully to: ${targetFilePath}`,
      // );
      console.log(
        `The PDF file has been downloaded successfully to: ${targetFilePath}`,
      );
    } catch (error) {
      console.log('Error generating PDF:', error);
      // Alert user about the error
      Alert.alert(
        'Download Error',
        'An error occurred while generating the PDF.',
      );
    }
  };

  const keyToInclude = 'qty';
  //const arr = JSON.stringify(summary[0].updateproductData);
  const filteredSummaryArray = summary.filter(item =>
    item.hasOwnProperty(keyToInclude),
  );

  //console.log('filteredSummaryArray', filteredSummaryArray);
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
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
          <View style={{height: 600}}>
            <Text style={styles.detailstext}>Inventory Adjustment Details</Text>
            <Text style={styles.detailstext}>Reason: {reason}</Text>
            <ScrollView horizontal>
              <ScrollView style={styles.container}>
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Item No</Text>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={[styles.headerText]}>Size</Text>
                    <Text style={[styles.headerText]}>Color</Text>
                    <Text style={[styles.headerText]}>Qty</Text>
                  </View>
                  <View style={{height: 600}}>
                    <ScrollView style={styles.container}>
                      {filteredSummaryArray.map((item, index) => (
                        <TouchableOpacity key={index}>
                          <View style={styles.tableRow}>
                            <Text style={[styles.rowText]}>
                              {item.itemNumber}
                            </Text>
                            <Text style={[styles.rowText]}>{itemName}</Text>
                            <Text style={[styles.rowText]}>{item.size}</Text>
                            <Text style={[styles.rowText]}>{item.color}</Text>
                            <Text style={[styles.rowText]}>{item.qty}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
          </View>

          <Pressable style={styles.savebutton} onPress={handleOk}>
            <Text style={styles.EODbtn}>Ok</Text>
          </Pressable>
          <Pressable style={styles.printbutton} onPress={openPopupsave}>
            <Text style={styles.EODbtn}>Print</Text>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPopupVisiblesave}
            onRequestClose={handleOk}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Icon
                  style={{textAlign: 'center', marginBottom: 15}}
                  name="checkmark-circle-outline"
                  size={60}
                  color="#34A853"
                />
                <Text style={styles.buttonText1}>
                  Inventory Adjustment details printed successfully
                </Text>

                <TouchableOpacity style={styles.okbutton} onPress={handleOk}>
                  <Text style={styles.EODbtn}>Ok</Text>
                </TouchableOpacity>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 2,
  },

  tableContainer: {
    marginTop: 54,
    marginBottom: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.primary,
    marginTop: -38,
  },

  headerText: {
    color: 'white',
    paddingHorizontal: 9,
    fontSize: 16,
    textAlign: 'center',
    top: 10,
    flex: 1,
    width: 80,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },

  rowText: {
    color: '#333333',
    textAlign: 'center',
    flex: 1,
    marginStart: -5,
    width: 70,
  },

  savebutton: {
    marginTop: -70,
    fontSize: 24,
    left: -95,
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
  okbutton: {
    marginTop: 50,
    fontSize: 24,
    left: -5,
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
  EODbtn: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  printbutton: {
    marginTop: -50,
    fontSize: 24,
    left: 100,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonText1: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 20,
  },
  detailstext: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 17,
    //marginTop: 20,
  },
});
const stylesToInline = styleObj =>
  Object.keys(styleObj)
    .map(selector => {
      const rules = styleObj[selector];
      const cssText = Object.keys(rules)
        .map(
          prop =>
            `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${rules[prop]};`,
        )
        .join(' ');
      return `${selector} { ${cssText} }`;
    })
    .join(' ');
export default InvAdjSummary;
