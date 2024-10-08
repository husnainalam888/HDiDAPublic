import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, DarkColors} from '../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {LOCALIZED_STRINGS} from '../Utils/Strings';
import {useLanguage} from '../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';

const HeaderBottomSheet = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized} = useLanguage();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.showStart && (
        <TouchableOpacity
          style={{
            zIndex: 1,
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
          onPress={props.onStartPress}>
          <SvgFromXml
            style={{
              height: 14,
              width: 14,
            }}
            xml={
              theme == 'dark'
                ? svgWithColor('arrow_back', false, 'white')
                : SVG.arrow_back
            }
            height={14}
            width={14}
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.text,
          props.showStart != true && {marginStart: 24},
          !props.startIcon &&
            (props.endIcon || props.showReset) && {
              marginEnd: theme == 'dark' && !props.showReset ? -20 : -14,
            },
        ]}>
        {props.label}
      </Text>
      {props.showReset != true && (
        <TouchableOpacity
          onPress={props.onPressEnd}
          style={{
            backgroundColor:
              theme == 'dark' ? DarkColors.GrayLighter : Colors.LightWhite,
            padding: 5,
            borderRadius: 20,
          }}>
          <SvgFromXml
            xml={props.endIcon}
            height={theme == 'dark' ? 20 : 14}
            width={theme == 'dark' ? 20 : 14}
          />
        </TouchableOpacity>
      )}
      {props.showReset && (
        <TouchableOpacity
          onPress={() => props.onPressReset && props.onPressReset(props.label)}>
          <Text style={styles.reset}>{localized.reset}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBottomSheet;

const styling = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor:
        theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
      borderBottomWidth: 4,
      paddingTop: 5,
      paddingEnd: 16,
      paddingBottom: 16,
      marginBottom: 11,
    },
    text: {
      textAlign: 'center',
      flex: 1,
      fontSize: 16,
      fontWeight: '700',
      color: theme == 'dark' ? 'white' : Colors.GrayDarker,
    },
    reset: {
      fontSize: 13,
      color: theme == 'dark' ? 'white' : Colors.GrayDarker,
      fontWeight: '500',
    },
  });
