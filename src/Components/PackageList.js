import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {FEATURES} from '../Utils/Data';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {Colors, DarkColors} from '../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';

const PackageList = ({data, onSelect, context}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState(0);

  const getAdsCount = () => {
    let count = 0;
    data.forEach(item => {
      if (item.inCredits == true) count += item.ads;
    });
    return count;
  };
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          setSelected(index);
          onSelect(item);
        }}
        style={[
          styles.item,
          selected == index && {borderColor: Colors.Secondary, borderWidth: 1},
        ]}>
        <SvgFromXml
          xml={
            selected === index
              ? SVG.selectedCircle
              : selected !== index && theme == 'dark'
              ? svgWithColor('emptyCircle', false, 'white')
              : SVG.emptyCircle
          }
          height={20}
          width={20}
        />
        <View style={{flex: 1, marginStart: 12}}>
          <View style={styles.row}>
            <Text style={styles.heading}>
              Feature {item.ads} Ad for {item.days} Days
            </Text>
            <Text style={styles.price}>
              {item.inCredits && context == 'sell'
                ? `Use Credt`
                : 'DZD ' + item.price}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>{item.description}</Text>
            {item.credits ? (
              <Text style={styles.packageCount}>{item.credits}</Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      <FlatList data={data} renderItem={renderItem} />
      <Pressable
        onPress={() => {
          navigation.navigate('CustomPackage');
        }}
        style={[
          styles.item,
          {
            borderColor: Colors.Secondary,
            borderWidth: 1,
            alignItems: 'center',
            paddingEnd: 16,
          },
        ]}>
        <View style={{flex: 1, marginStart: 12}}>
          <Text style={[styles.heading, {color: Colors.Secondary}]}>
            Create Your Custom Package
          </Text>
          <Text style={styles.description}>Best for Business</Text>
        </View>
        <SvgFromXml
          xml={svgWithColor('back', false, Colors.Secondary)}
          style={{transform: [{rotate: '180deg'}]}}
          height={20}
          width={20}
        />
      </Pressable>
    </>
  );
};

export default PackageList;

const styling = theme =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 10,
      backgroundColor: theme == 'dark' ? '#0e0e0e' : 'white',
      overflow: 'hidden',
      marginVertical: 6,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    heading: {
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontWeight: '700',
    },
    price: {
      color: Colors.Secondary,
      fontWeight: '700',
    },
    description: {
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayMedium,
      fontWeight: '300',
      marginTop: 8,
    },
    packageCount: {
      backgroundColor:
        theme == 'dark' ? DarkColors.GrayLighter : Colors.GrayLighter,
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayMedium,
      fontWeight: '300',
      marginTop: 8,
      padding: 8,
      paddingVertical: 2,
      borderRadius: 10,
      fontSize: 12,
    },
  });
