import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../Utils/Colors';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import MenuComp, {MenuItem} from './MenuComp';
import {useNavigation} from '@react-navigation/native';
import {arrayToObj, formatPrice} from '../Utils/Utils';
import {IMAGE_URL} from '../Utils/API';
const Offer = ({item}) => {
  const navigation = useNavigation();
  const [info, setInfo] = React.useState(arrayToObj(item.info) || {});
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDetails', {item, info})}
      activeOpacity={0.8}
      style={styles.item}>
      <View style={styles.row}>
        <Image
          resizeMode="center"
          source={{uri: IMAGE_URL + item.images[0]}}
          style={styles.image}
        />
        <View style={{flex: 1, marginStart: 10}}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.price}>DZD {formatPrice(item.price)}</Text>
          <Text style={styles.info}>
            {info.Year} | {info.mileage} km | {info.Engine}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Offer;

const styles = StyleSheet.create({
  item: {
    borderColor: Colors.GrayLighter,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 6,
  },
  image: {
    width: 70,
    height: 'auto',
    borderRadius: 5,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.Black,
    fontSize: 13,
    fontWeight: '600',
  },
  info: {
    fontSize: 12,
    color: Colors.GrayDarker,
  },
  price: {
    fontSize: 13,
    color: Colors.Secondary,
    fontWeight: '700',
    marginVertical: 6,
  },
});
