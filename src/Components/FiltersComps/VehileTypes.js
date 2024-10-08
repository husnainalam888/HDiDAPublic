import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../../SVGS/SVG';
import {VEHILE_TYPES} from '../../Utils/Data';
import {Colors, DarkColors} from '../../Utils/Colors';
import SearchComp from '../SearchComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';

const VehileTypes = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [filteredData, setFilteredData] = useState(props.data);
  const [selected, setSelected] = useState(props.selected);
  const [selectAll, setSelectedAll] = useState(false);
  useEffect(() => {
    setSelected(props.selected);
    setSelectedAll(false);
  }, [props.selected]);
  useEffect(() => {
    console.log('VehileTypes', 'selected', selected, 'item', props.data[0]);
    setFilteredData(props.data);
  }, [props.data]);
  const getValuesName = values => {
    let stringValue = '';
    values.map((item, index) => {
      if (index < 2)
        stringValue = stringValue ? stringValue + ', ' + item : item;
      else if (index == 2)
        stringValue = stringValue
          ? stringValue + ', ' + item + ' etc.'
          : item + ', etc.';
    });
    return stringValue;
  };
  const renderItem = ({item, onSelect}) => {
    const isAll = item.name === 'All';

    const handleItemPress = () => {
      if (isAll) {
        setSelectedAll(true);
      } else {
        setSelected(item);
        setSelectedAll(false);
      }
      props.onSelect(item);
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handleItemPress}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          {item?.subValues?.length > 0 && (
            <Text style={styles.description}>
              {getValuesName(item.subValues)}
            </Text>
          )}
        </View>
        <SvgFromXml
          xml={
            selected?._id == item?._id || selectAll
              ? SVG.selectedCircle
              : SVG.emptyCircle
          }
          height={18}
          width={18}
        />
      </TouchableOpacity>
    );
  };
  const handleFilter = text => {
    if (!text) {
      setFilteredData(props.data);
    } else {
      console.log('handleFilter', text);
      setFilteredData(
        props.data.filter(item =>
          item.name.toLowerCase().startsWith(text.toLowerCase()),
        ),
      );
    }
  };

  return (
    <>
      <SearchComp
        hideFilter={true}
        style={styles.search}
        onChangeText={handleFilter}
      />
      <FlatList
        contentContainerStyle={styles.FlatList}
        data={filteredData}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No Matches Found</Text>
        )}
      />
    </>
  );
};

export default VehileTypes;

const styling = theme =>
  StyleSheet.create({
    FlatList: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      flexGrow: 1,
    },
    item: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingBottom: 13,
      borderBottomColor:
        theme == 'dark' ? DarkColors.GrayDarker : Colors.GrayLightest,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : Colors.Black,
    },
    description: {
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      fontSize: 13,
      fontWeight: '500',
    },
    search: {
      backgroundColor: theme == 'dark' ? '#0e0e0e' : Colors.LightWhite,
      marginHorizontal: 10,
    },
    empty: {
      textAlign: 'center',
      textAlignVertical: 'center',
      flex: 1,
    },
  });
