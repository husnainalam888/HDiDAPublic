import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import Dot from './Dot';
import ImageView from 'react-native-image-viewing';
import {BASE_URL, IMAGE_URL} from '../Utils/API';

const ImageSlider = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);

  const renderItem = ({item, index}) => (
    <Pressable onPress={() => setIsVisible(true)} style={styles.slide}>
      <Image source={{uri: IMAGE_URL + item}} style={styles.image} />
    </Pressable>
  );

  const keyExtractor = (_, index) => index.toString();

  const onIndexChanged = index => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        style={{marginHorizontal: -16}}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          onIndexChanged(newIndex);
        }}
      />
      <View style={styles.dotsContainer}>
        <View style={styles.subContainer}>
          {images.map((_, index) => (
            <Dot key={index} isActive={index === currentIndex} />
          ))}
        </View>
      </View>
      <ImageView
        images={images.map((image, index) => ({
          id: image?.id || index,
          uri: IMAGE_URL + image,
        }))}
        imageIndex={currentIndex}
        visible={visible}
        animationType="fade"
        keyExtractor={(_, index) => index.toString()}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000003b',
    padding: 4,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ImageSlider;
