import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SVG} from '../SVGS/SVG';
import {SvgFromXml} from 'react-native-svg';
import {Colors, DarkColors} from '../Utils/Colors';
import {useLanguage} from '../Provider/LanguageProvider';
import {global_storage} from '../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const Button = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {selectedLanguage} = useLanguage();
  return (
    <TouchableOpacity
      style={[
        styles.row,
        props.style,
        selectedLanguage == 'ar' && {flexDirection: 'row-reverse'},
      ]}
      onPress={props.onPress}>
      {props.starIcon && (
        <SvgFromXml
          style={{marginRight: 10}}
          xml={props.starIcon}
          height={props.starIconSize || 14}
          width={props.starIconSize || 14}
        />
      )}
      <Text
        style={[
          styles.text,
          props.icon && {marginStart: 53},
          props.titleStyle,
        ]}>
        {props.title}
      </Text>
      {props.icon && (
        <SvgFromXml
          style={[
            styles.icon,
            props.iconStyle,
            selectedLanguage == 'ar' ? {transform: [{rotate: '180deg'}]} : {},
          ]}
          xml={props.icon}
          height={props.iconSize || 30}
          width={props.iconSize || 30}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styling = theme =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 16,
      backgroundColor: theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
      borderRadius: 12,
      marginVertical: 20,
      gap: 10,
    },
    text: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 25,
    },
    icon: {
      width: 30,
      height: 30,
      marginEnd: 13,
    },
  });
