import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Import Axios library
import Header from '../components/Header';
import COLORS from '../../constants/colors';
import Footer1 from '../components/Footer1';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SideMenu from './SideMenu';
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
import StockCountadhoc from './StockCountadhoc';
import AdhocCountDetails from './AdhocCountDetails';

const CycleCount = ({route}) => {
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [adhocexpandedId, setAdhocExpandedId] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPopupVisiblesave, setPopupVisiblesave] = useState(false);
  const [pendingdata, setData] = useState('');
  const [adhocdata, setAdhocData] = useState([
    {creationProductsdto: null, creationdto: null},
  ]);

  
  
  const fetchTodaysData = async () => {
    const store = 'Ambience Mall';
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(
        `http://172.20.10.9:8083/stockcount/getProductsbydate/${currentDate}/${store}`,
      );
      const responseData = response.data;
      console.log('responseData : ', responseData);
      setData(responseData);
      if (responseData.creationProductsdto !== null) {
        navigation.navigate('CycleStart', {data: responseData});
      }
    } catch (error) {
      console.log('Error fetching pending data:', error);
    }
  };

  // useEffect(() => {
  //   fetchpendingData();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchpendingData();
  //   }, []),
  // );

  const fetchAdhocStockCountData = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/savestockcount/getall/adhoc/count`,
      );
      const responseData = response.data;
      setAdhocData(responseData);
      //console.log('Adhoc count response : ', adhocdata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAdhocStockCountData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAdhocStockCountData();
    }, []),
  );
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
  const closePopupsave = () => {
    setPopupVisiblesave(false);
  };
  const handleNoClicksave = () => {
    closePopupsave();
  };
  const openPopupsave = () => {
    setPopupVisiblesave(true);
  };
  const handleMenuItemClick = item => {
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

  const toggleExpand = countId => {
    const shouldEcpand =
      apiData.find(item => item.countId === countId)?.status === 'processing' ||
      apiData.find(item => item.countId === countId)?.status === 'complete';

    setExpandedId(prevId =>
      prevId === countId ? null : shouldEcpand ? countId : null,
    );
  };
  const adhocToggleExpand = adhocId => {
    const shouldEcpand = adhocdata.find(item => item.adhocId === adhocId);

    setAdhocExpandedId(prevId =>
      prevId === adhocId ? null : shouldEcpand ? adhocId : null,
    );
  };

  const handleDetailsPress = countId => {
    axios
      .get(`http://172.20.10.9:8083/savestockcount/getstockproducts/${countId}`)
      .then(response => {
        const countDetails = response.data;
        navigation.navigate('CountDtls', {countDetails});
      })
      .catch(error => {
        console.log('Error fetching count details:', error);
      });
  };

  const handleAdhocDetailsPress = adhocId => {
    const pendingArray = adhocdata.filter(obj => obj.adhocId === adhocId);
    navigation.navigate('AdhocCountDetails', {
      countDetails: pendingArray,
    });
  };

  const handleRecount = countId => {
    //const countId = countDetails[0].stockcount.countId;
    axios
      .get(`http://172.20.10.9:8083/savestockcount/getstockproducts/${countId}`)
      .then(response => {
        const countDetails = response.data;
        const keyToFilter = 'varianceQty';
        const filterData = countDetails.filter(item => item[keyToFilter]);
        navigation.navigate('Recount', {data: filterData});
        console.log('count details : ', countDetails);
        console.log('filterData details : ', filterData);
      })
      .catch(error => {
        console.log('Recount Error fetching count details:', error);
      });
  };

  const handleAdhocRecount = adhocId => {
    console.log('adhoc id', adhocId);
    axios
      .get(`http://172.20.10.9:8083/savestockcount/get/adhoc/${adhocId}`)
      .then(response => {
        const countDetails = response.data;
        const keyToFilter = 'firstvarianceQty';
        const filterData = countDetails.filter(item => item[keyToFilter]);
        navigation.navigate('Recount', {data: filterData});
        // console.log('count details : ', countDetails);
        // console.log('filterData details : ', filterData);
      })
      .catch(error => {
        console.log('Recount Error fetching count details:', error);
      });
  };
  const uniqueArray = Array.from(
    new Set(adhocdata.map(obj => obj.adhocId)),
  ).map(id => adhocdata.find(obj => obj.adhocId === id));
  //console.log('uniqueArray ', uniqueArray);

  const handlePostvar = countId => {
    axios
      .get(`http://172.20.10.9:8083/savestockcount/getstockproducts/${countId}`)
      .then(response => {
        const countDetails = response.data;
        navigation.navigate('Postvrnc', {countDetails});
      })
      .catch(error => {
        console.log('post variance Error fetching count details:', error);
      });
  };

  const handleadhocCount = () => {
    navigation.navigate('StockCountadhoc');
  };

  const handleButtonPress = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(
        `http://172.20.10.9:8083/stockcount/getProductsbydate/${currentDate}`,
      );

      const responseData = response.data;

      if (
        responseData &&
        responseData.creationProductsdto &&
        responseData.creationProductsdto.length > 0
      ) {
        const apiProducts = responseData.creationProductsdto || [];
        setApiData(apiProducts);
        navigation.navigate('StockCountadhoc', {data: responseData});
        console.log(responseData);
      } else {
        setPopupVisiblesave(true);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setPopupVisiblesave(true);
      //console.log('currentdata', responseData);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://172.20.10.9:8083/savestockcount/getinfolist',
      );
      const responseData = response.data;
      const pendingList = responseData?.pendingList || [];
      const stockCountInfoList = responseData?.stockCountInfoList || [];
      const combinedList = [...pendingList, ...stockCountInfoList];

      setApiData(combinedList);
    } catch (error) {
      console.log('InfoList Error fetching data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );
  useEffect(() => {
    fetchData();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  useEffect(() => {
    const focusOnScreen = navigation.addListener('focus', () => {
      fetchData();
    });

    return focusOnScreen;
  }, [navigation]);

  // useEffect(() => {
  //   const focusOnScreen = navigation.addListener('focus', () => {
  //     fetchpendingData();
  //   });

  //   return focusOnScreen;
  // }, [navigation]);

  const handleCount = async countId => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/stockcount/getpending/stockproducts/${countId}`,
      );
      const responseData = response.data;
      console.log('Start Count:', response.data);
      if (responseData && responseData.length > 0) {
        navigation.navigate('CycleStart', {data: responseData});
      } else {
        console.log('Invalid');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const renderContent = () => {
    const filteredApiData = apiData.filter(
      ({
        countId,
        startedAt,
        status,
        totalBookQty,
        countedQty,
        varianceQty,
        reCount,
      }) =>
        countId !== undefined &&
        startedAt !== undefined &&
        status !== undefined &&
        totalBookQty !== undefined &&
        countedQty !== undefined &&
        varianceQty !== undefined &&
        reCount !== undefined,
    );
    const pendingList = apiData.filter(item => item.reCount === 'pending');
    const savedDataList = filteredApiData.filter(
      item => item.reCount !== 'pending',
    );

    // Sort saved data by the earliest date
    savedDataList.sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );

    const combinedList = [...pendingList, ...savedDataList];
    //console.log('savedDataList ', savedDataList);
    //console.log('pendingdata ', pendingdata);
    // console.log('pendingList ', pendingList);
    return (
      <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
        <TouchableWithoutFeedback onPress={handlepress}>
          <View style={{flex: 1}}>
            <Header showBackButton={true} />

            <View style={{top: 1}}>
              <TouchableOpacity onPress={toggleMenu}>
                <Icon name="menu" size={45} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  top: -45,
                  left: 50,
                  fontSize: 30,
                  marginBottom: -10,
                  color: COLORS.black,
                }}>
                Stock Count
              </Text>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  (!apiData || apiData.length === 0) && styles.disabledButton,
                ]}
                onPress={handleadhocCount}
                disabled={!apiData || apiData.length === 0}>
                <Text style={styles.addButtonText}>Adhoc Count</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
              <Pressable onPress={closeMenu}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 500,
                    top: -3,
                  }}>
                  Pending Count
                </Text>

                {pendingdata.creationProductsdto === null && (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'red',
                      fontWeight: 500,
                      left: '55%',
                      top: '-1.6%',
                    }}>
                    No Scheduled Count
                  </Text>
                )}
                <View style={styles.pendingcycleCount}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 500,
                    }}>
                    Today's Count
                  </Text>
                  <Text>
                    {/* CountId: {pendingdata.creationProductsdto[0].countId} */}
                  </Text>
                  <TouchableOpacity
                    style={styles.StartButton}
                    onPress={() => fetchTodaysData()}>
                    <Text style={styles.StartButtonText}>Start Count</Text>
                  </TouchableOpacity>
                </View>

                {/* adhoc counts */}
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 500,
                    top: -3,
                  }}>
                  Adhoc Counts
                </Text>

                <ScrollView style={styles.adhoccycleCount}>
                  {uniqueArray.map(({adhocId, reason}) => (
                    <View style={styles.adhocCountContainer}>
                      <TouchableOpacity
                        onPress={() => adhocToggleExpand(adhocId)}
                        style={styles.cycleCountButton}>
                        <Text style={styles.cycleCountText}>
                          Adhoc id:{` ${adhocId}`}
                        </Text>

                        <Text
                          style={{
                            fontSize: 16,
                            marginBottom: 5,
                            lineHeight: 24,
                            color: '#4A486F',
                            fontWeight: '500',
                          }}>
                          Reason: {`${reason}`}
                        </Text>
                        <Ionicons
                          name={
                            adhocexpandedId === adhocId
                              ? 'chevron-down-sharp'
                              : 'chevron-forward-sharp'
                          }
                          style={{
                            fontWeight: 'bold',
                            left: '95%',
                            marginTop: -24,
                          }}
                          size={23}
                          color="black"
                        />
                      </TouchableOpacity>

                      {adhocexpandedId === adhocId && (
                        <View style={styles.detailsContainer}>
                          <TouchableOpacity
                            onPress={() => handleAdhocDetailsPress(adhocId)}>
                            <Text style={styles.countdtls}>DETAILS</Text>
                            <Ionicons
                              name={'chevron-forward-sharp'}
                              style={{
                                fontWeight: 'bold',
                                right: -337,
                                marginTop: -18,
                              }}
                              size={19}
                              color="black"
                            />
                          </TouchableOpacity>

                          {/* {status !== 'complete' && ( */}
                          <TouchableOpacity
                            style={styles.Postvar}
                            // onPress={() => handlePostvar(adhocId)}
                            // disabled={status !== 'complete'}
                          >
                            <Text style={styles.postText}>Post Variance</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleAdhocRecount(adhocId)}
                            // disabled={status == 'complete'}
                          >
                            <Text style={styles.adhocrecount}>Recount</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
                {savedDataList.map(
                  ({
                    countId,
                    startedAt,
                    completedAt,
                    status,
                    totalBookQty,
                    countedQty,
                    varianceQty,
                    reCountQty,
                    recountVarianceQty,
                    date,
                    reCount,
                  }) => (
                    <View key={countId} style={styles.cycleCountContainer}>
                      <TouchableOpacity
                        onPress={() => toggleExpand(countId)}
                        style={styles.cycleCountButton}>
                        <Text
                          style={styles.cycleCountText}>{` ${startedAt}`}</Text>

                        <Text
                          style={styles.cycleCountText12}>{`${status}`}</Text>
                        <Ionicons
                          name={
                            expandedId === countId
                              ? 'chevron-down-sharp'
                              : 'chevron-forward-sharp'
                          }
                          style={{
                            fontWeight: 'bold',
                            right: -340,
                            marginTop: -24,
                          }}
                          size={23}
                          color="black"
                        />
                      </TouchableOpacity>

                      {(status === 'complete' || status === 'processing') &&
                        expandedId === countId && (
                          <View style={styles.detailsContainer}>
                            <View style={styles.rlabel}>
                              <View style={styles.label}>
                                <Text
                                  style={styles.detailtext}>{`Count ID:`}</Text>
                                <Text style={styles.value}>{`${countId}`}</Text>
                              </View>

                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`Book Quantity`}</Text>
                                <Text
                                  style={
                                    styles.value
                                  }>{`${totalBookQty}`}</Text>
                              </View>
                            </View>

                            <View style={styles.rlabel}>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`Started At`}</Text>
                                <Text
                                  style={styles.value}>{`${startedAt}`}</Text>
                              </View>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`Completed At`}</Text>
                                <Text
                                  style={styles.value}>{`${completedAt}`}</Text>
                              </View>
                            </View>
                            <View style={styles.rlabel}>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`First Counted Quantity`}</Text>
                                <Text
                                  style={styles.value}>{`${countedQty}`}</Text>
                              </View>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`First Variance`}</Text>
                                <Text
                                  style={styles.value}>{`${varianceQty}`}</Text>
                              </View>
                            </View>
                            <View style={styles.rlabel}>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`Recount Quantity`}</Text>
                                <Text
                                  style={styles.value}>{`${reCountQty}`}</Text>
                              </View>
                              <View style={styles.label}>
                                <Text
                                  style={
                                    styles.detailtext
                                  }>{`Recount Variance`}</Text>
                                <Text
                                  style={
                                    styles.value
                                  }>{`${recountVarianceQty}`}</Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => handleDetailsPress(countId)}>
                              <Text style={styles.countdtls}>DETAILS</Text>
                              <Ionicons
                                name={'chevron-forward-sharp'}
                                style={{
                                  fontWeight: 'bold',
                                  right: -337,
                                  marginTop: -18,
                                }}
                                size={19}
                                color="black"
                              />
                            </TouchableOpacity>

                            {/* {status !== 'complete' && ( */}
                            <TouchableOpacity
                              style={
                                status !== 'complete'
                                  ? styles.postvarDis
                                  : styles.Postvar
                              }
                              onPress={() => handlePostvar(countId)}
                              disabled={status !== 'complete'}>
                              <Text
                                style={
                                  status !== 'complete'
                                    ? styles.postTextdis
                                    : styles.postText
                                }>
                                Post Variance
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleRecount(countId)}
                              disabled={status == 'complete'}>
                              <Text
                                style={
                                  status == 'complete'
                                    ? styles.recountdisabled
                                    : styles.recount
                                }>
                                Recount
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                    </View>
                  ),
                )}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isPopupVisiblesave}
                  onRequestClose={closePopupsave}>
                  <View style={styles.modalContainer1}>
                    <View style={styles.modalContent1}>
                      <Icon
                        style={{textAlign: 'center'}}
                        name="information-circle-outline"
                        size={50}
                        color="black"
                      />
                      <Text style={styles.text1}>No Cycle Count</Text>
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
              </Pressable>
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
      </SafeAreaView>
    );
  };

  return <>{renderContent()}</>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    // marginBottom: 86,
  },
  cycleCountContainer: {
    marginBottom: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 1,
  },
  adhocCountContainer: {
    marginBottom: "1%",
    borderWidth: 1,
    borderColor: '#E0EAEE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  testCountContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0EAEE',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 16,
    //flex: 1,
  },

  cycleCountButton: {
    padding: 12,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,

    borderRadius: 8,
    //overflow: 'visible',
  },
  pendingcycleCount: {
    padding: 12,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    top: '-0.1%',
    position: 'relative',
  },
  adhoccycleCount: {
    padding: 5,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderRadius: 2,
    //overflow: 'hidden',
    marginBottom: 1,
    // height: '40%',
    position: 'relative',
  },
  cycleCountText: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 2,
    lineHeight: 24,
    color: '#4A486F',
    fontWeight: '500',
  },
  cycleCountText1: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#e1ebf5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: -5,
    marginHorizontal: 128,
    borderRadius: 12,
    marginTop: -27,
    left: 115,
    textAlign: 'center',
  },
  cycleCountText12: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#e1ebf5',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: -5,
    marginHorizontal: 128,
    borderRadius: 12,
    marginTop: -27,
    left: 105,
    textAlign: 'center',
  },

  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    marginBottom: "1%",
  },

  addButton: {
    position: 'absolute',
    bottom: -100,
    right: 16,
    elevation: 3,
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginHorizontal: 3,
    marginVertical: 100,
  },
  disabledButton: {
    position: 'absolute',
    bottom: -100,
    right: 16,
    elevation: 3,
    backgroundColor: '#d3d3d3',
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginHorizontal: 3,
    marginVertical: 100,
  },

  StartButton: {
    position: 'absolute',
    bottom: -100,
    right: -10,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 29,
    marginVertical: 120,
  },
  Postvar: {
    borderColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 80,
    marginTop: -5,
    backgroundColor: COLORS.bluelight,
    color: COLORS.white,
  },
  postvarDis: {
    borderColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 80,
    marginTop: -5,
    backgroundColor: COLORS.graylight,
  },

  addButtonText: {
    top: -2,
    fontSize: 16,
    color: 'white',
  },
  StartButtonText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  postText: {
    top: -2,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  postTextdis: {
    top: -2,
    fontSize: 16,
    color: '#6f6f6f',
    fontWeight: '500',
  },
  countdtls: {
    top: 2,
    left: 270,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  recount: {
    top: 2,
    left: -260,
    borderColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.white,
    borderWidth: 1,
    marginTop: -5,
    backgroundColor: COLORS.bluelight,
  },

  adhocrecount: {
    top: '-100%',
    left: '1%',
    borderColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.white,
    borderWidth: 1,
    marginTop: -5,
    backgroundColor: COLORS.bluelight,
  },
  recountdisabled: {
    top: 2,
    left: -260,
    borderColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    marginTop: -5,
    backgroundColor: COLORS.graylight,
  },
  detailtext: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  value: {fontSize: 15, width: '100%'},
  label: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 6,
    width: '50%',
  },
  rlabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
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
  text1: {
    fontSize: 18,
    color: '#484848',
    textAlign: 'center',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 19,
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
});

export default CycleCount;
