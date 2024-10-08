import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../SVGS/SVG';
import {Colors, DarkColors} from '../Utils/Colors';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../Provider/LanguageProvider';
const RenderItem = ({item, onPress, selected}) => {
  const {selectedLanguage} = useLanguage();
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[
          styles.icon,
          selected && {borderWidth: 2, borderColor: Colors.Primary},
        ]}>
        {item.name !== 'All' && (
          <Image
            source={{
              uri:
                'https://www.hdida.app/cat/' +
                (item?.name).split(' ')[0] +
                '.png',
            }}
            resizeMode="contain"
            style={{
              height: 40,
              width: 40,
            }}
          />
        )}
        {item?.name == 'All' && (
          <SvgFromXml xml={SVG.cat} height={40} width={40} />
        )}
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.name}>
        {selectedLanguage == 'ar'
          ? item?.translations?.arabic ?? item.name
          : selectedLanguage == 'fr'
          ? item?.translations?.french ?? item.name
          : item?.name || item}
      </Text>
    </View>
  );
};

const CatList = props => {
  const TAG = 'CatList';

  const navigation = useNavigation();
  const [pickers, setPickers] = useMMKVStorage('pickers', global_storage, []);
  const [cats, setCats] = useState(props?.data);
  const [bodyType, setBodyType] = useState(null);
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  useEffect(() => {
    let cats = props.data || pickers;
    if (cats?.length > 0) {
      let result = cats?.find(x => x.name == 'Vehicle Type');
      setSelectedVehicleType(result?.values);
      let bodies = cats?.find(x => x.name == 'Body Style');
      setBodyType(bodies?.values);
    }
  }, [props?.data]);

  const List = ({style, data, onPress}) => {
    const [theme] = useMMKVStorage('theme', global_storage, 'light');
    const styles = styling(theme);
    return (
      <FlatList
        style={[styles.FlatList, style]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={data}
        renderItem={({item}) => <RenderItem item={item} onPress={onPress} />}
      />
    );
  };
  return (
    <>
      <FlatList
        style={[
          styles.FlatList,
          bodyType?.length > 0 && {
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderColor:
              theme == 'dark' ? DarkColors.GrayMedium : Colors.GrayLightest,
          },
        ]}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.contentContainerStyle}
        data={selectedVehicleType}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onPress={item => {
              navigation.navigate('SearchScreen', {
                data: [{type: 'Vehicle Type', value: item}],
              });
            }}
          />
        )}
      />

      {bodyType?.length > 0 && (
        <List
          data={bodyType}
          style={{paddingTop: 10}}
          onPress={item => {
            navigation.navigate('SearchScreen', {
              data: [
                {
                  type: 'Body Style',
                  value: item,
                },
              ],
            });
          }}
        />
      )}
    </>
  );
};

export default CatList;

const styling = theme =>
  StyleSheet.create({
    FlatList: {
      marginHorizontal: -16,
    },
    contentContainerStyle: {
      paddingHorizontal: 13,
      paddingTop: 10,
    },
    container: {
      marginHorizontal: 13,
    },
    icon: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
      borderRadius: 40,
      height: 60,
      width: 60,
    },
    name: {
      fontSize: 12,
      marginTop: 6,
      textAlign: 'center',
      width: 60,
      color: theme == 'dark' ? 'white' : 'gray',
    },
  });
