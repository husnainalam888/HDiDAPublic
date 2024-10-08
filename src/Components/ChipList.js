import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {SvgXml, SvgFromXml} from 'react-native-svg';
import {Colors, DarkColors, MyColors} from '../Utils/Colors';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';

const ChipList = ({
  type,
  data,
  onClear,
  disabled = false,
  itemStyle,
  onSelect,
  onPressFilter,
  selectedFilters,
  ...props
}) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const renderItem = ({item, index}) => {
    const handleClearPress = () => {
      if (onClear) {
        onClear(item);
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.5}
        onPress={() => {
          if (disabled) return;
          if (type == 'dropDown') {
            if (onSelect) onSelect(item);
            return;
          }
          setIsSelected(item);
        }}>
        <View
          style={[
            styles.item,
            isSelected == item && styles.selectedItem,
            itemStyle,
          ]}>
          <Text
            style={[
              styles.label,
              isSelected == item && styles.selectedLabel,
              props.textStyle,
            ]}>
            {item.name}
          </Text>
          {type == 'dropDown' && (
            <SvgFromXml
              style={{marginStart: 10}}
              xml={
                theme == 'dark'
                  ? svgWithColor('arrow_down_fill', 'white')
                  : SVG.arrow_down_fill
              }
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <ScrollView
          horizontal
          style={{marginHorizontal: -16, flexGrow: 0}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}>
          {type == 'dropDown' && (
            <Pressable style={styles.filter} onPress={onPressFilter}>
              <SvgFromXml
                style={{marginStart: 10}}
                xml={SVG.filter_outline}
                height={17}
                width={17}
              />
              <Text style={styles.count}>
                {'(' + selectedFilters.length + ')'}
              </Text>
            </Pressable>
          )}
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={styles.flatListContent}
            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      )}
    </>
  );
};

const styling = theme =>
  StyleSheet.create({
    item: {
      alignItems: 'center',
      marginHorizontal: 5,
      borderRadius: 30,
      paddingHorizontal: 18,
      paddingVertical: 6,
      flexDirection: 'row',
      backgroundColor: theme == 'dark' ? DarkColors.GrayMedium : 'white',
    },
    selectedItem: {
      backgroundColor: '#000',
      borderRadius: 30,
      padding: 10,
    },
    label: {
      color: theme == 'dark' ? '#fff' : '#000',
    },
    selectedLabel: {
      color: '#fff',
    },
    flatList: {
      marginVertical: 14,
      marginHorizontal: -16,
      flexGrow: 0,
    },
    flatListContent: {
      paddingHorizontal: 20,
      flexGrow: 0,
    },
    filter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: '#1c9c7c33',
      borderRadius: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      flexGrow: 0,
    },
    count: {
      color: Colors.Secondary,
      fontSize: 13,
      marginStart: 7,
    },
  });

export default ChipList;
