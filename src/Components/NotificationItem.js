import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {Colors, DarkColors} from '../Utils/Colors';

const NotificationItem = ({item}) => {
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.msg}>{item?.message}</Text>
    </View>
  );
};

export default NotificationItem;

const styling = theme =>
  StyleSheet.create({
    container: {
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLightest,
      padding: 12,
      gap: 4,
      borderRadius: 8,
    },
    title: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarkest,
      fontWeight: '600',
      fontSize: 16,
    },
    msg: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarkest,
      fontSize: 14,
    },
  });
