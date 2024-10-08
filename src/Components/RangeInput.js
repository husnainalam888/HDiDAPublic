import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Utils/Colors';
import InputWithIcon from './Input/InputWithIcon';
import Button from './Button';
import {useToast} from 'react-native-toast-notifications';
const RangeInput = ({label, onApply, selected = false}) => {
  const toast = useToast();
  const getMin = selected => {
    if (selected) {
      return selected.split('-')[0];
    }
    return '';
  };
  const getMax = selected => {
    if (selected) return selected.split('-')[1];
    return '';
  };
  const [min, setMin] = useState(getMin(selected) || '');
  const [max, setMax] = useState(getMax(selected) || '');
  useEffect(() => {
    if (min == '' || max == '') {
      setMin(getMin(selected));
      setMax(getMax(selected));
    }
  }, [selected]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <InputWithIcon
          style={{flex: 1}}
          textInputProps={{
            placeholder: 'Enter Min',
            marginStart: 0,
            value: min,
            keyboardType: 'number-pad',
            onChangeText: text => setMin(text),
          }}
        />
        <InputWithIcon
          style={{flex: 1}}
          textInputProps={{
            placeholder: 'Enter Max',
            value: max,
            keyboardType: 'number-pad',
            onChangeText: text => setMax(text),
            style: {
              marginStart: 0,
            },
          }}
        />
      </View>
      <Button
        onPress={() => {
          if (onApply) {
            if (!min || !max) {
              toast.show('Enter the both min and max values', {
                title: 'Warning',
              });
              return;
            }
            onApply(`${min}-${max}`);
          }
        }}
        title={'Apply'}
      />
    </View>
  );
};

export default RangeInput;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  label: {
    color: Colors.GrayDarker,
    fontWeight: '600',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 16,
  },
});
