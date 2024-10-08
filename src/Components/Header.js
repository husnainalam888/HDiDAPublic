import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgFromXml} from 'react-native-svg';
import {global_storage} from '../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';
const Header = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.header, props.style]}>
      {props.startIcon && (
        <TouchableOpacity
          onPress={props.startPress ? props.startPress : goBack}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            marginStart: -20,
            paddingStart: 20,
          }}>
          <SvgFromXml
            xml={props.startIcon}
            width={props.startIconSize || 20}
            height={props.startIconSize || 14}
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.headerText,
          props.endIcon && {
            marginEnd: props.endIconSize ? -1 * props.endIconSize : 24,
          },
          props.startIcon && {textAlign: 'center', flex: 1, marginStart: -10},
          props.titleStyle,
        ]}>
        {props.title}
      </Text>
      {props.endIcon && (
        <TouchableOpacity
          style={props.endIconStyle}
          onPress={() => {
            if (props.endPress) {
              props.endPress();
            }
          }}>
          <SvgFromXml
            xml={props.endIcon}
            height={props.endIconSize || 24}
            width={props.endIconSize || 24}
          />
        </TouchableOpacity>
      )}
      {props.endIcon2 && (
        <TouchableOpacity
          style={[props.endIconStyle, {zIndex: 1}]}
          onPress={() => {
            if (props.endPress2) {
              props.endPress2();
            }
          }}>
          <SvgFromXml
            onPress={() => {
              if (props.endPress2) {
                props.endPress2();
              }
            }}
            xml={props.endIcon2}
            height={props.endIconSize || 24}
            width={props.endIconSize || 24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styling = theme =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : 'black',
      flex: 1,
    },
  });
