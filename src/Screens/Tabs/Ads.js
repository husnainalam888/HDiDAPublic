import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../Utils/Colors';
import TopNav from '../../Navigation/Top/TopNav';
import { localized } from '../../Utils/Strings';
import { useLanguage } from '../../Provider/LanguageProvider';

const Ads = () => {
  const {localized} = useLanguage();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>{localized.my_ads}</Text>
        <View style={styles.tabContainer}>
          <TopNav />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ads;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 26,
    marginVertical: 20,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
});
