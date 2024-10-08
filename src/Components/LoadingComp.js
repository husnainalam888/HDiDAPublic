import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import AnimatedSVG from './AnimatedSvg';

const LoadingComp = ({isLoading = false, color}) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View style={styles.overlay}>
        <AnimatedSVG color={color} />
      </View>
    </Modal>
  );
};

export default LoadingComp;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
