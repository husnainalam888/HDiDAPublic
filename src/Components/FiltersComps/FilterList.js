import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {Colors, DarkColors} from '../../Utils/Colors';
import {FILTERS} from '../../Utils/Data';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {IMAGE_URL} from '../../Utils/API';

const FilterList = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [filters, setFilters] = useMMKVStorage('pickers', global_storage, []);

  useEffect(() => {
    console.log('data', props.selected);
  }, []);

  const getValuesName = values => {
    let stringValue = '';
    values.map((item, index) => {
      if (index < 2)
        stringValue = stringValue ? stringValue + ', ' + item.name : item.name;
      else if (index == 2)
        stringValue = stringValue
          ? stringValue + ', ' + item.name + ' etc.'
          : item.name + ', etc.';
    });
    return stringValue;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.row,
          props?.['selected']?.find(x => x.type == item.name) && {
            borderColor: Colors.Primary,
            borderWidth: 1,
          },
        ]}
        onPress={() => props.onSelect(item)}>
        {/* <SvgFromXml
          xml={theme == 'dark' ? SVG.darkRoundCar : SVG.grayRoundCar}
          height={45}
          width={45}
        /> */}
        <Image
          source={{
            uri:
              `https://www.hdida.app/cat/${
                theme == 'dark' ? 'Dark' : 'Light'
              }/` +
              item?.name +
              '.png',
          }}
          style={{
            height: 45,
            width: 45,
            resizeMode: 'contain',
            backgroundColor: theme == 'dark' ? 'white' : Colors.GrayLightest,
            borderRadius: 45 / 2,
          }}
        />
        <View style={styles.column}>
          <Text style={styles.textBold}>{item?.name}</Text>
          <Text numberOfLines={1} style={styles.text}>
            {item.type == 'dropdown'
              ? getValuesName(item?.values)
              : item.type == 'range'
              ? 'Select ' + item?.name + ' Range'
              : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={
        props.data || [
          ...filters.filter(x => x.type == 'dropdown' || x.type == 'range'),
          {
            _id: 'price',
            multiple: false,
            name: 'Price',
            status: true,
            type: 'range',
            values: [],
          },
        ]
      }
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

export default FilterList;

const styling = theme =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingVertical: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayLighter,
      padding: 10,
    },
    column: {
      marginHorizontal: 10,
      flex: 1,
    },
    textBold: {
      fontWeight: 'bold',
      fontSize: 15,
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
    text: {
      fontSize: 13,
      color: theme == 'dark' ? DarkColors.GrayDarkest : Colors.GrayDarker,
    },
  });
