import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SVG} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {SvgFromXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {localized} from '../../Utils/Strings';
import {useLanguage} from '../../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const TwoWayBtn = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const {localized} = useLanguage();
  const navigation = useNavigation();
  const styles = styling(theme);
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {props.canGoBack != false && (
          <SvgFromXml xml={SVG.backRound} height={56} width={54} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPressNext}
        style={[
          styles.nextBtn,
          props.disabled && {
            backgroundColor: theme == 'dark' ? '#439c86ff' : '#1c9e7ea6',
          },
        ]}>
        <Text style={styles.btnText}>{localized.next}</Text>
        <SvgFromXml xml={SVG.nextWhite} height={24} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default TwoWayBtn;

const styling = theme =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? DarkColors.Primary : Colors.Secondary,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 30,
    },
    btnText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
      marginEnd: 16,
    },
  });
