import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../SVGS/SVG';
import {Colors} from '../Utils/Colors';
import Button from './Button';
import {useLanguage} from '../Provider/LanguageProvider';

const DeleteSheetComp = props => {
  const ref = React.useRef(props.ref);
  const {localized} = useLanguage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.message}>{props.message}</Text>
      <SvgFromXml
        style={styles.icon}
        xml={props.icon || SVG.deleteWithGradient}
        height={74}
        width={74}
      />
      <View style={styles.btns}>
        <Button
          onPress={() => {
            if (props.onClose) props.onClose();
          }}
          title={localized['Cancel']}
          titleStyle={{color: 'black'}}
          style={styles.negativeBtn}
        />
        <Button
          onPress={() => {
            if (props.onConfirm) props.onConfirm();
          }}
          title={localized['Yes']}
          style={styles.positiveBtn}
        />
      </View>
    </View>
  );
};

export default DeleteSheetComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  icon: {
    marginVertical: 28,
  },
  title: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
  },
  message: {
    marginTop: 7,
    fontSize: 14,
    color: Colors.Black,
  },
  negativeBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.GrayLighter,
    flex: 1,
    marginEnd: 10,
  },
  positiveBtn: {
    backgroundColor: '#FD4585',
    flex: 1,
    marginStart: 10,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
