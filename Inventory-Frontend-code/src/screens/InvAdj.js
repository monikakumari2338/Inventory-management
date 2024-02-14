import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from './colors';
import Footer1 from '../components/Footer1';
import Header from '../components/Header';
import SideMenu from './SideMenu';
import ItemScanner from './ItemScanner.js';
import TRsearch from './TRsearch.js';
import DsdSearch from './DsdSearch.js';
import Rtvsearch from './Rtvsearch.js';
import ViewDSD from './ViewDSD.js';
import Dashboard from './Dashboard';
import Viewrtv from './Viewrtv';
import ViewInv from './ViewInv';
import PoSearch from './PoSearch';
import CycleCount from './CycleCount';
import InvAdjSummary from './InvAdjSummary';
const InvAdj = () => {
  const navigation = useNavigation();

  const [status, setStatus] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [date, setDate] = useState('');

  const [reasonError, setReasonError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [supplierIdError, setSupplierIdError] = useState('');
  const [dateError, setDateError] = useState('');
  const [reason, setReason] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isReasonSelected, setIsReasonSelected] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [isDropdownVisibleicon, setDropdownVisibleicon] = useState(false);
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

  const reasonOptions = [
    {label: 'Wrong', value: 'Wrong'},
    {label: 'Excess', value: 'Excess'},
    {label: 'Damage', value: 'Damage'},
    {label: 'Theft', value: 'Theft'},
    {label: 'Short', value: 'Short'},
  ];

  const selectReasonModal = selectedItem => {
    setSelectedReason(selectedItem.value);
    setDropdownVisible(false);
    setIsReasonSelected(true);
    validateReason();
  };
  const closeDrodown = () => {
    setDropdownVisible(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    closeDrodown();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handlepress = () => {
    if (isMenuOpen) {
      closeMenu();
      setDropdownVisible(false);
    }
  };
  const handlepressout = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
      setDropdownVisibleicon(false);
      setIsReasonSelected(true);
    }
  };

  const handleMenuItemClick = item => {
    setSelectedMenuItem(item);
    if (item === 'Dashboard') {
      navigation.navigate(Dashboard);
    } else if (item === 'StockCheck') {
      navigation.navigate(ItemScanner);
    } else if (item === 'PO Recieve') {
      navigation.navigate(PoSearch);
    } else if (item === 'Transfer Recieve') {
      navigation.navigate(TRsearch);
    } else if (item === 'DSD Recieve') {
      navigation.navigate(DsdSearch);
    } else if (item === 'Return to Vendor') {
      navigation.navigate(Rtvsearch);
    } else if (item === 'Inventory Adjustment') {
      navigation.navigate(InvAdj);
    } else if (item === 'Stock Count') {
      navigation.navigate(CycleCount);
    } else if (item === 'View DSD') {
      navigation.navigate(ViewDSD);
    } else if (item === 'View Vendor Return') {
      navigation.navigate(Viewrtv);
    } else if (item === 'View Inventory Adjusment') {
      navigation.navigate(ViewInv);
    }
    closeMenu();
  };

  const validateReason = () => {
    setReasonError(selectedReason.trim() == '' ? '' : 'Please select a Reason');
  };

  const isFormValid = () => {
    const isReasonValid = selectedReason && selectedReason.trim() !== '';

    setReasonError(isReasonValid ? '' : 'Please select a Reason');

    return isReasonValid;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    setIsReasonSelected(true);
  };

  const selectReason = selectedReason => {
    setReason(selectedReason);
    setDropdownVisible(false);
    setIsReasonSelected(true);
  };

  const resetForm = () => {
    setReason('');

    setReasonError('');
  };

  const navigateToSecondPage = () => {
    if (isFormValid()) {
      navigation.navigate('InvPro', {
        reason: selectedReason,
      });

      resetForm();
    }
  };
  //console.log('reason: ', selectedReason);
  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            handlepress();
            closeDrodown();
          }}>
          <View style={{flex: 1}}>
            <View style={{top: 1}}>
              <TouchableOpacity onPress={toggleMenu}>
                <Icon name="menu" size={45} color="black" />
              </TouchableOpacity>
              <Text
                style={{top: -45, left: 50, fontSize: 30, color: COLORS.black}}>
                Inventory Adjustment
              </Text>
            </View>

            <View style={{padding: 16}}>
              <View style={styles.card}>
                <View style={styles.inputContainer}>
                  <Text style={styles.EODText}>Inventory Status</Text>
                  <View>
                    <TouchableOpacity
                      style={styles.input}
                      // onPress={toggleDropdown}
                      onPress={() => setDropdownVisible(!isDropdownVisible)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 6,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.inputtext}>
                          {selectedReason || 'Select Reason'}
                        </Text>
                        <Icon
                          style={{}}
                          name={
                            isDropdownVisible
                              ? 'caret-up-outline'
                              : 'caret-down-outline'
                          }
                          color={isReasonSelected ? 'black' : 'black'}
                          size={20}
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
                      visible={isDropdownVisible}
                      onRequestClose={() => {
                        setDropdownVisible(false);
                      }}>
                      <TouchableWithoutFeedback
                        onPress={() => setDropdownVisible(false)}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                          }}>
                          <View style={styles.modalContainer}>
                            {reasonOptions.map(item => (
                              <TouchableOpacity
                                key={item.value}
                                style={styles.dropdownItem}
                                onPress={() => selectReasonModal(item)}>
                                <Text style={styles.dropdownItemText}>
                                  {item.label}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>
                  <Text style={styles.validationError}>{reasonError}</Text>
                </View>
              </View>
              <Pressable style={styles.button} onPress={navigateToSecondPage}>
                <Text style={styles.EODbtn}>Next </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Footer1 />
      <SideMenu
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        items={store}
        onItemClick={handleMenuItemClick}
      />
      {/* <InvAdjSummary reason={selectedReason}/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  inputtext: {
    color: 'black',
  },
  inputContainer: {
    marginBottom: -5,
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
  EODText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A486F',
    fontWeight: '500',
  },
  button: {
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
  validationError: {
    color: '#ED6B6B',
    fontSize: 14,
    marginTop: -3,
    marginBottom: 2,
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: '#DDD',
    marginTop: -95,
    marginHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 150,
    paddingVertical: 10,
    borderWidth: 0.4,
    borderColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000',
    left: -120,
  },
});

export default InvAdj;
