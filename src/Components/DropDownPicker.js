import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, DarkColors} from '../Utils/Colors';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
const DropdownComponent = ({
  items,
  label,
  setValues,
  value,
  isSubValue,
  setSubValues = () => {},
  multiSelect = false,
}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      {!multiSelect ? (
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: Colors.Primary}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={items}
          search
          maxHeight={Dimensions.get('window').height * 0.5}
          labelField="label"
          valueField="value"
          mode="modal"
          itemContainerStyle={{
            borderRadius: 10,
            overflow: 'hidden',
            marginHorizontal: 5,
          }}
          activeColor={theme == 'dark' && DarkColors.GrayLightest}
          containerStyle={[
            theme == 'dark' && {
              backgroundColor: DarkColors.GrayLighter,
              borderWidth: 1,
              borderColor: DarkColors.GrayDarkest,
            },
            {paddingBottom: 5},
          ]}
          placeholder={!isFocus ? `Select ${label}` : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValues(prev => {
              console.log({
                ...prev,
                [label]: {
                  ...prev[label],
                  [isSubValue ? 'subValue' : 'value']: item.value,
                },
              });
              return {
                ...prev,
                [label]: {
                  ...prev[label],
                  [isSubValue ? 'subValue' : 'value']: item.value,
                },
              };
            });
            setSubValues(item.value);
            setIsFocus(false);
          }}
        />
      ) : (
        <MultiSelect
          style={[styles.dropdown, isFocus && {borderColor: Colors.Primary}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={[
            styles.selectedTextStyle,
            {
              color: 'white',
            },
          ]}
          activeColor={Colors.Primary}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={items}
          search
          maxHeight={Dimensions.get('window').height * 0.5}
          labelField="label"
          valueField="value"
          mode="modal"
          itemContainerStyle={[
            {
              borderRadius: 10,
              overflow: 'hidden',
              marginHorizontal: 5,
              marginVertical: 2.5,
              color: 'white',
            },
          ]}
          selectedStyle={{
            borderRadius: 5,
            borderWidth: 0,
            backgroundColor: Colors.Primary,
            color: 'white',
          }}
          containerStyle={[
            theme == 'dark' && {
              backgroundColor: DarkColors.GrayLighter,
              borderWidth: 1,
              borderColor: DarkColors.GrayDarkest,
            },
            {paddingBottom: 5},
          ]}
          itemTextStyle={{
            color: 'gray',
          }}
          placeholder={!isFocus ? `Select ${label}` : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValues(item);
            setIsFocus(false);
          }}
        />
      )}
    </>
  );
};

export default DropdownComponent;

const styling = theme =>
  StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLighter,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      marginTop: 10,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayMedium,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme == 'dark' ? 'white' : Colors.GrayDarkest,
    },
    iconStyle: {
      width: 20,
      height: 20,
      tintColor: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayMedium,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
