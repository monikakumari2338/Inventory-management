import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import BackButton from '../screens/BackButton';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Header({showBackButton}) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <Image source={require('./img/kpmg1.png')} style={styles.logo} />

      {showBackButton ? (
        <TouchableOpacity onPress={handlePress}>
          <Icon
            style={{marginTop: '11%', left: '1%'}}
            name="arrow-back-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00338e',
    height: 120,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'baseline',
  },
  logo: {
    height: '30%',
    width: '27%',
    top: '28%',
    alignSelf: 'center',
  },

  placeholder: {
    color: 'red',
  },
});
