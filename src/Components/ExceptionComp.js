import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, DarkColors} from '../Utils/Colors';
import {global_storage} from '../Utils/Utils';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const ExceptionComp = ({image, title, description}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  return (
    <View style={{flex: 1, paddingVertical: 16, justifyContent: 'center'}}>
      <View
        style={{
          backgroundColor:
            theme == 'dark' ? DarkColors.GrayLighter : Colors.LightWhite,
          alignSelf: 'center',
          padding: 40,
          borderRadius: 140,
        }}>
        <Image
          source={image || require('../assets/noData.png')}
          resizeMode="contain"
          style={{height: 200, width: 200, alignSelf: 'center'}}
        />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 16,
          color: theme == 'dark' ? 'white' : Colors.GrayDarker,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: 'center',
          color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
        }}>
        {description}
      </Text>
    </View>
  );
};

export default ExceptionComp;

const styles = StyleSheet.create({});
