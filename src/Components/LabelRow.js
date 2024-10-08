import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, DarkColors} from '../Utils/Colors';
import {useLanguage} from '../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';

const LabelRow = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized} = useLanguage();
  return (
    <View style={styles.row}>
      <Text style={[styles.label, props.style]}>{props.label}</Text>
      {props.hideEnd != true && (
        <TouchableOpacity onPress={props.onPress}>
          <Text style={[styles.end, props.endStyle]}>
            {props.end || localized.see_all}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LabelRow;

const styling = theme =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 17,
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
    end: {
      color: theme == 'dark' ? DarkColors.Primary : Colors.Secondary,
      fontSize: 12,
      fontWeight: '600',
    },
  });
