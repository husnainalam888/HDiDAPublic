import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'rn-country-picker';
import {Colors, DarkColors} from '../../Utils/Colors';
import {SVG} from '../../SVGS/SVG';
import {useLanguage} from '../../Provider/LanguageProvider';
import {global_storage} from '../../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const CountrySelector = ({...props}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const {localized} = useLanguage();
  const [countryCode, setCountryCode] = useState('213');
  const [phone, setPhone] = useState(`+${countryCode}${props.value}`);
  const selectedValue = value => {
    setCountryCode(value);
  };
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <CountryPicker
        disable={false}
        animationType={'slide'}
        language="en"
        dropDownImage={{svg: SVG.back, size: 24}}
        pickerTitleStyle={styles.pickerTitleStyle}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        hideCountryFlag={false}
        hideCountryCode={true}
        searchBarStyle={styles.searchBarStyle}
        countryCode={countryCode}
        selectedValue={selectedValue}
      />
      <View style={styles.line} />
      <Text style={[styles.input, {flex: 0}]}>{`+${countryCode}`}</Text>
      <TextInput
        placeholderTextColor={
          theme === 'dark' ? DarkColors.abadb4 : Colors.GrayDarker
        }
        style={styles.input}
        keyboardType="phone-pad"
        placeholder={localized.phone_number}
        onChangeText={text =>
          props.onChangeText({code: countryCode, phone: text})
        }
        value={props.value}
        maxLength={15}
        // {...props}
      />
    </View>
  );
};

export default CountrySelector;

const styling = theme =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor:
        theme === 'dark' ? DarkColors.GrayMedium : Colors.GrayLighter,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 14,
    },
    line: {
      width: 1,
      backgroundColor:
        theme === 'dark' ? DarkColors.GrayMedium : Colors.GrayDarker,
      height: '70%',
      marginEnd: 8,
      marginStart: 8,
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontWeight: '400',
      color: theme === 'dark' ? 'white' : Colors.Black,
      lineHeight: 22,
      paddingVertical: 10,
    },
    pickerTitleStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    selectedCountryTextStyle: {
      paddingLeft: 5,
      color: '#000',
      textAlign: 'right',
    },

    countryNameTextStyle: {
      paddingLeft: 10,
      color: '#000',
      textAlign: 'right',
    },

    searchBarStyle: {
      flex: 1,
    },
    code: {
      width: '10%',
    },
  });
