import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const InputWithIcon = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <View style={[{...styles.container}, props.style]}>
      {props.startIcon && (
        <SvgFromXml xml={props.startIcon} width={20} height={20} />
      )}
      <TextInput
        style={[styles.input, props.inputStyle]}
        {...props.textInputProps}
      />
      {!props.loading && (
        <SvgFromXml
          style={{padding: 10}}
          onPress={() => {
            if (props.onPressEnd) {
              props.onPressEnd();
            }
          }}
          xml={
            props.textInputProps?.secureTextEntry ? SVG.eyeOpen : props.endIcon
          }
          width={props.endIconSize || 20}
          height={props.endIconSize || 20}
        />
      )}
      {props.loading && (
        <View
          style={{backgroundColor: '#FF9200', padding: 8, borderRadius: 20}}>
          <ActivityIndicator size="small" color={'white'} />
        </View>
      )}
    </View>
  );
};

export default InputWithIcon;

const styling = theme =>
  StyleSheet.create({
    input: {
      flex: 1,
      color: theme == 'dark' ? 'white' : Colors.Black,
      marginHorizontal: 14,
      fontSize: 16,
      paddingVertical: 12,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderColor:
        theme == 'dark' ? DarkColors.GrayLightest : Colors.GrayLighter,
      backgroundColor: theme == 'dark' ? '#0e0e0e' : 'white',
    },
  });
