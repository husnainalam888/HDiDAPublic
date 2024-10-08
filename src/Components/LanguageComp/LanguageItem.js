import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../Utils/Colors';

const LanguageItem = ({item, onSelect, selected}) => {
  const isSelected = selected == item;
  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={[styles.item, isSelected && styles.selectedItem]}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.text}>{item.language}</Text>
    </TouchableOpacity>
  );
};

export default LanguageItem;

const styles = StyleSheet.create({
  item: {
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 158,
    backgroundColor: 'rgba(249, 249, 251,0.8)',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: '#fff',
    borderColor: Colors.Black,
    borderWidth: 1,
  },
  image: {
    height: 41,
    width: 41,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
});
