import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {useLanguage} from '../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {Colors, DarkColors} from '../Utils/Colors';

const SearchComp = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized} = useLanguage();
  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.7 : 1}
      onPress={props.onPress}
      style={[styles.row, props.style]}>
      <SvgFromXml
        style={{marginVertical: 11}}
        xml={
          theme == 'dark'
            ? svgWithColor('search', false, '#62646A')
            : SVG.search
        }
        height={20}
        width={20}
      />
      <TextInput
        editable={props.onPress ? false : true}
        style={styles.input}
        value={props.value}
        keyboardType="web-search"
        returnKeyType="search"
        returnKeyLabel="Search"
        placeholderTextColor={
          props.placeholderTextColor || theme == 'dark'
            ? DarkColors.abadb4
            : 'gray'
        }
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        placeholder={localized.search}
      />
      {props.hideFilter != true && (
        <Pressable onPress={props.onPress || props.onPressFilter}>
          <SvgFromXml
            style={{marginVertical: 6}}
            xml={theme == 'dark' ? SVG.darkFilter : SVG.filter}
            height={32}
            width={81}
          />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

export default SearchComp;

const styling = theme =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 13,
      alignItems: 'center',
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      borderRadius: 30,
      paddingEnd: 6,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      marginHorizontal: 10,
      fontSize: 16,
      paddingVertical: 0,
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
  });
