import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, DarkColors} from '../../Utils/Colors';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const LoginButton = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <SvgFromXml
        xml={props.icon}
        height={props.iconSize || 24}
        width={props.iconSize || 24}
      />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styling = theme =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? DarkColors.GrayDarker : Colors.Black,
      borderRadius: 10,
      paddingVertical: 17,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    text: {
      color: theme === 'dark' ? 'white' : Colors.Black,
      fontSize: 15,
      fontWeight: '600',
      marginLeft: 22,
      lineHeight: 25,
      flex: 1,
    },
  });
