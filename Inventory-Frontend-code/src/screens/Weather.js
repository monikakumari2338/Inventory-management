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

  const validateStatus = () => {
    const specialCharacterRegex = /^[a-zA-Z0-9\s]*$/;
    setStatusError(
      status.trim() && specialCharacterRegex.test(status)
        ? ''
        : 'Please enter a valid Status',
    );
  };

  const validateSupplierId = () => {
    const isNumeric = /^[0-9]+$/.test(supplierId);
    setSupplierIdError(isNumeric ? '' : 'Supplier Id should be numeric');
  };

  const validateDate = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    setDateError(
      dateRegex.test(date) ? '' : 'Date should be in YYYY-MM-DD format',
    );
  };

  const validateReason = () => {
    setReasonError(
      selectedReason.trim() !== '' ? '' : 'Please select a Reason',
    );
  };

  const isFormValid = () => {
    const isReasonValid = se.trim() !== '';
    const isStatusValid = status.trim() !== '';
    const isSupplierIdValid = supplierId.trim() !== '';
    const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(date);

    setReasonError(isReasonValid ? '' : 'Please select a Reason');
    setStatusError(isStatusValid ? '' : 'Please enter Status');
    setSupplierIdError(
      isSupplierIdValid ? '' : 'Supplier Id should be numeric',
    );
    setDateError(isDateValid ? '' : 'Date should be in YYYY-MM-DD format');

    return isReasonValid && isStatusValid && isSupplierIdValid && isDateValid;
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
    setStatus('');
    setSupplierId('');
    setDate('');

    setReasonError('');
    setStatusError('');
    setSupplierIdError('');
    setDateError('');
  };

  const navigateToSecondPage = () => {
    if (isFormValid()) {
      navigation.navigate('InvPro', {
        reason,
        status,
        supplierId,
        date,
      });
      resetForm();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
                  <Text style={styles.EODText}>Reason</Text>
                  <View>
                    {/* Display selected reason */}
                    <TouchableOpacity
                      style={styles.input}
                      onPress={toggleDropdown}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 4,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            textAlign: 'center',
                          }}>
                          {selectedReason || 'Select Reason'}
                          {/* <Text
                            style={{
                              color: isReasonSelected ? 'black' : '#ED6B6B',
                            }}>
                            *
                          </Text> */}
                        </Text>
                        <Icon
                          style={{left: 9}}
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
                      <TouchableWithoutFeedback onPress={handlepressout}>
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
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>
                  <Text style={styles.validationError}>{reasonError}</Text>

                  <Text style={styles.EODText}>Status</Text>
                  <TextInput
                    style={styles.input}
                    value={status}
                    placeholder="Enter status"
                    onChangeText={text => {
                      setStatus(text);
                      validateStatus();
                    }}
                    onBlur={validateStatus}
                  />
                  <Text style={styles.validationError}>{statusError}</Text>

                  <Text style={styles.EODText}>Supplier ID</Text>
                  <TextInput
                    style={styles.input}
                    value={supplierId}
                    placeholder="Enter Supplier Id"
                    onChangeText={text => {
                      setSupplierId(text);
                      validateSupplierId();
                    }}
                    onBlur={validateSupplierId}
                  />
                  <Text style={styles.validationError}>{supplierIdError}</Text>

                  <Text style={styles.EODText}>Date</Text>
                  <TextInput
                    style={styles.input}
                    value={date}
                    placeholder="Enter Date (YYYY-MM-DD)"
                    onChangeText={text => {
                      setDate(text);
                      validateDate();
                    }}
                    onBlur={validateDate}
                  />
                  <Text style={styles.validationError}>{dateError}</Text>
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
  inputContainer: {
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
  reasonContainer: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  reasonPicker: {
    backgroundColor: 'white',
    elevation: 3,
  },
  reasonItem: {
    justifyContent: 'flex-start',
  },
  reasonLabel: {
    color: '#4A486F',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  reasonDropDown: {
    backgroundColor: 'white',
    zIndex: 9999,
  },
  addreason: {
    margin: 10,
    fontSize: 24,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 42,
    borderRadius: 20,
    width: 286,
    elevation: 3,
    backgroundColor: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: -20,
    marginTop: 255,
    marginHorizontal: 25,

    borderRadius: 10,
    elevation: 3,
  },
  dropdownItem: {
    padding: 9,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000',
  },
});

export default InvAdj;
