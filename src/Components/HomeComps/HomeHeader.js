import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const HomeHeader = () => {
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const styles = styling(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SvgFromXml
        xml={theme == 'dark' ? SVG.darkLogo : SVG.logo}
        width={40}
        height={40}
      />
      <Text style={styles.text}>HDIDA</Text>
      {user?.id !== 'guest' && (
        <SvgFromXml
          onPress={() => navigation.navigate('NotificationScreen')}
          style={{marginEnd: 10}}
          xml={theme == 'dark' ? SVG.bellDark : SVG.bell}
          width={40}
          height={40}
        />
      )}
      <SvgFromXml
        onPress={() => navigation.openDrawer()}
        xml={theme == 'dark' ? SVG.drawerDark : SVG.drower}
        width={40}
        height={40}
      />
    </View>
  );
};

export default HomeHeader;

const styling = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
    },
    text: {
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontSize: 24,
      marginHorizontal: 10,
      flex: 1,
    },
  });
