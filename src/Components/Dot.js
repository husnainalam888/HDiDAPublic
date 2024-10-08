// Dot.js

import React from 'react';
import {View, StyleSheet} from 'react-native';

const Dot = ({isActive}) => {
  return (
    <View
      style={[styles.dot, {backgroundColor: isActive ? 'white' : '#FFFFFF99'}]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginHorizontal: 5,
  },
});

export default Dot;
