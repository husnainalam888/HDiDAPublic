import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';

const MyToast = ({options}: any) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            options.title == 'Error' ||
            options.type == 'danger' ||
            options.type == 'error' ||
            options.title == 'Message Alert!'
              ? Colors.Orange
              : Colors.Secondary,
        },
      ]}>
      <View style={{flex: 1, width: '100%'}}>
        <Text style={styles.title}>{options.title}</Text>
        <Text style={styles.message}>{options.message}</Text>
      </View>
    </View>
  );
};

export default MyToast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.Orange,
    padding: 16,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  message: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
