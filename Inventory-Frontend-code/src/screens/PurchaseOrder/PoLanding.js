import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import SearchBar_FS from '../../components/SearchBar_FS';
import {useNavigation} from '@react-navigation/native';
import {CustomBottomSheet} from '../../components/CustomBottomSheet';
// React Native Elements UI Library
import {Icon, SearchBar} from '@rneui/themed';
import {StyleSheet, FlatList} from 'react-native';
import {FAB} from '@rneui/themed';
import {useTheme, Overlay, Button} from '@rneui/themed';
import COLORS from '../../../constants/colors';
import PoCard from './LandingComp/PoCard';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import PageTitle from '../../components/PageHeader';
import {ScrollView} from 'react-native';
import Footer1 from '../../components/Footer1';
import Icon2 from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';

export default function PoLanding() {
  const [Data, setData] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [sortApplied, setSortApplied] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [noSearchResultsOverlay, SetNoSearchResultsOverlay] = useState(false);
  const {theme} = useTheme();
  const [Prevdata, setPrevData] = useState(Data);
  //const { searchVisible } = useVisibilityContext();
  const navigation = useNavigation();

  //console.log('Prevdata', Prevdata);

  const poData = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.9:8083/purchaseOrder/getall/po/asn`,
      );
      const responseData = response.data;
      //console.log('CurrentDate data : ', responseData);
      setData(responseData);
      setPrevData(responseData);
      // if (responseData.creationProductsdto !== null) {
      //   navigation.navigate('CycleStart', {data: responseData});
      // }
    } catch (error) {
      console.log('Po Onload data Error fetching :', error);
    }
  };

  useEffect(() => {
    poData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      poData();
    }, []),
  );

  function handleNoSearchResults() {
    setData(Prevdata);
    setSearchStr('');
    SetNoSearchResultsOverlay(false);
  }

  // filter data
  function handleSearch(text) {
    const asnSearchResults = Data.asn.filter(item =>
      item.asnNumber.toString().includes(text),
    );
    const poSearchResults = Data.purchaseOrder.filter(item =>
      item.poNumber.toString().includes(text),
    );
    console.log('asnSearchResults', asnSearchResults);
    if (asnSearchResults == '' && poSearchResults == '') {
      SetNoSearchResultsOverlay(true);
    }
    setData({asn: asnSearchResults, purchaseOrder: poSearchResults});
    console.log(Data);
  }

  const initialFilterParams = {
    reason: [],
    progress: [],
  };

  const [filterParams, setFilterParams] = useState(initialFilterParams);

  function sortByDate(sortType) {
    if (sortType === 'reset') {
      resetSort();
      return;
    }
    const sortedData = Data; // Make a copy of initialData
    console.log('sorted data : ', sortedData);
    sortedData.asn.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return sortType === 'latest' ? dateB - dateA : dateA - dateB;
    });
    sortedData.purchaseOrder.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return sortType === 'latest' ? dateB - dateA : dateA - dateB;
    });
    setData(sortedData);
    setSortApplied(true);
    console.log('Sorted by: ' + sortType);
  }

  function resetSort() {
    setData(Prevdata);
    setSortApplied(false);
    console.log('Sort reset');
  }

  // function pushFilterParams(filterType) {
  //   const newFilterParams = {...filterParams};
  //   newFilterParams.push(filterType);
  //   setFilterParams(newFilterParams);
  // }

  function filterData() {
    const filteredData = Data.asn
      .filter(item => {
        if (filterParams.reason.length === 0) {
          return true;
        }
        return filterParams.reason.includes(item.asn.status);
      })
      .filter(item => {
        if (filterParams.progress.length === 0) {
          return true;
        }
        return filterParams.progress.includes(item.asn.supplier);
      });
    const POfilteredData = Data.purchaseOrder
      .filter(item => {
        if (filterParams.reason.length === 0) {
          return true;
        }
        return filterParams.reason.includes(item.asn.status);
      })
      .filter(item => {
        if (filterParams.progress.length === 0) {
          return true;
        }
        return filterParams.progress.includes(item.asn.supplier);
      });
    console.log('filtered data ', filteredData);
    setData({asn: filteredData, purchaseOrder: POfilteredData});
    setFilterApplied(true);
  }

  function resetFilter() {
    setFilterParams(initialFilterParams);
    setFilterApplied(false);
  }

  function handleDeleteSearch() {
    //console.log('deleted');
    setData(Prevdata);
  }

  // ---------------------- Bottom Sheet Options ----------------------

  const sortOpts = [
    {
      title: 'Sort by latest',
      icon: {
        name: 'sort-clock-descending-outline',
        type: 'material-community',
        color: 'black',
        size: 35,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      sortType: 'latest',
    },
    {
      title: 'Sort by oldest',
      icon: {
        name: 'sort-clock-descending-outline',
        type: 'material-community',
        color: 'black',
        size: 35,
        containerStyle: {
          transform: [{scaleY: -1}],
        },
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      sortType: 'oldest',
    },
    {
      title: sortApplied ? 'Reset Sort' : 'Cancel',
      icon: sortApplied
        ? {name: 'refresh', type: 'material', color: 'white'}
        : {name: 'cancel', type: 'material', color: 'white'},
      containerStyle: [styles.sortOptContainer, {backgroundColor: 'darkred'}],
      titleStyle: styles.sortOptCancel,
      sortType: 'reset',
    },
  ];

  const filterOpts = [
    {
      title: 'Status',
      icon: {
        name: 'progress-question',
        type: 'material-community',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
    },
    {
      title: 'Date',
      icon: {
        name: 'date-range',
        type: 'material',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
    },
    {
      title: 'Supplier',
      icon: {
        name: 'report-problem',
        type: 'material',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
    },
    {
      title: filterApplied ? 'Cancel' : 'Reset',
      icon: filterApplied
        ? {name: 'cancel', type: 'material', color: 'white'}
        : {name: 'refresh', type: 'material', color: 'white'},
      containerStyle: [
        styles.sortOptContainer,
        filterApplied
          ? {backgroundColor: 'darkred'}
          : {backgroundColor: 'black'},
      ],
      titleStyle: styles.sortOptCancel,
      onPress: () => resetFilter(),
    },
  ];

  const statusFilterOpts = [
    {
      title: 'In Progress',
      icon: {
        name: 'progress-question',
        type: 'material-community',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      filterType: 'inProgress',
    },
    {
      title: 'Completed',
      icon: {
        name: 'progress-check',
        type: 'material-community',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      filterType: 'complete',
    },
    // reset filter
    {
      title: 'Reset',
      icon: {
        name: 'refresh',
        type: 'material',
        color: 'white',
      },
      containerStyle: [styles.sortOptContainer, {backgroundColor: 'darkred'}],
      titleStyle: styles.sortOptCancel,
    },
  ];

  const reasonFilterOpts = [
    {
      title: 'Damaged',
      icon: {
        name: 'image-broken-variant',
        type: 'material-community',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      onPress: () => {
        const newFilterParams = filterParams;
        newFilterParams.reason.push('Damaged');
        setFilterParams(newFilterParams);
      },
    },
    {
      title: 'Stock In',
      icon: {
        name: 'download',
        type: 'font-awesome',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      onPress: () => {
        const newFilterParams = filterParams;
        newFilterParams.reason.push('stockIn');
        setFilterParams(newFilterParams);
      },
    },
    {
      title: 'Stock Out',
      icon: {
        name: 'upload',
        type: 'font-awesome',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      onPress: () => {
        const newFilterParams = filterParams;
        newFilterParams.reason.push('stockOut');
        setFilterParams(newFilterParams);
      },
    },
    {
      title: 'Theft',
      icon: {
        name: 'shield-lock-open',
        type: 'material-community',
        color: 'black',
        size: 30,
      },
      titleStyle: styles.sortOpt,
      containerStyle: styles.sortOptContainer,
      onPress: () => {
        const newFilterParams = filterParams;
        newFilterParams.reason.push('theft');
        setFilterParams(newFilterParams);
      },
    },
  ];
  return (
    <>
      <Header showBackButton={true} />
      <PageTitle title={'PO/ASN Receive'} />
      <View style={styles.searchBarAndOpts}>
        <SearchBar
          lightTheme={true}
          round={true}
          placeholder="Search here..."
          containerStyle={{
            flex: 1,
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
          }}
          inputContainerStyle={{
            height: 40,
          }}
          inputStyle={{fontFamily: 'Montserrat-Medium', fontSize: 16}}
          searchIcon={{size: 20}}
          value={searchStr}
          onChangeText={text => {
            setSearchStr(text), handleSearch(text);
          }}
          onClear={handleDeleteSearch}
        />
        {/* Filter Button */}
        <Pressable
          style={styles.chipButton}
          onPress={() => setFilterVisible(true)}>
          <Icon name="filter" type="antdesign" size={25} />
        </Pressable>

        {/* Sort Button */}
        <Pressable
          style={styles.chipButton}
          color="blue"
          onPress={() => setSortVisible(true)}>
          <Icon name="sort" type="materialcommunity" size={28} />
        </Pressable>
      </View>
      {/* Sort Bottom Sheet */}
      {sortVisible && (
        <CustomBottomSheet
          isVisible={sortVisible}
          setIsVisible={setSortVisible}
          opts={sortOpts}
          func={sortByDate}
        />
      )}

      {/* Filter Bottom Sheet */}
      {filterVisible && (
        <CustomBottomSheet
          isVisible={filterVisible}
          setIsVisible={setFilterVisible}
          opts={filterOpts}
          func={filterData}
        />
      )}

      <ScrollView>
        {Data ? Data.asn.map(dataitem => <PoCard item={dataitem} />) : null}
        {Data
          ? Data.purchaseOrder.map(dataitem => <PoCard item={dataitem} />)
          : null}
      </ScrollView>

      {/* No Search Results Overlay */}
      <Overlay
        isVisible={noSearchResultsOverlay}
        //onBackdropPress={proofOverlay}
        overlayStyle={styles.NoSearchResultsModal}>
        <Icon2
          name="info"
          size={45}
          color="black"
          style={{alignSelf: 'center', top: 15}}
        />

        <Text style={{color: 'black', fontWeight: 500, fontSize: 18}}>
          Results not Found, Kindly Click on the Back Button
        </Text>

        <Button
          title="Back"
          buttonStyle={{backgroundColor: COLORS.primary}}
          containerStyle={styles.modalButton}
          titleStyle={{
            fontFamily: 'Montserrat-Medium',
            color: 'white',
            marginHorizontal: 20,
          }}
          onPress={() => handleNoSearchResults()}
        />
      </Overlay>
      <Footer1 />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  searchBarAndOpts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  chipButton: {
    marginHorizontal: 5,
  },
  NoSearchResultsModal: {
    width: 350,
    height: 280,
    paddingVertical: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
