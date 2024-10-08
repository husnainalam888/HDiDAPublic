import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../Utils/Colors';
import {SvgFromXml} from 'react-native-svg';
import {SVG, svgWithColor} from '../SVGS/SVG';
const reportReasons = [
  "It's spam",
  'Nudity or sexual activity',
  'Hate speech or symbols',
  'Misleading',
  'False information',
  'Bullying or harassment',
  'Scam or fraud',
  'Intellectual property violation',
  'Something else',
];
const ReportComp = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.headging}>Report</Text>
      <Text style={styles.des}>Why are you reporting this person?</Text>
      <FlatList
        data={reportReasons}
        contentContainerStyle={{paddingHorizontal: 24}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (props.onSelect) props.onSelect(item);
            }}
            style={styles.item}>
            <Text style={styles.text}>{item}</Text>
            <SvgFromXml
              xml={svgWithColor('arrow_right', false, Colors.Black)}
              width={13}
              height={13}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ReportComp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  headging: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  des: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
    marginTop: 7,
    marginBottom: 16,
  },
  item: {
    paddingVertical: 11,
    borderTopColor: Colors.GrayLighter,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: Colors.Black,
  },
});
