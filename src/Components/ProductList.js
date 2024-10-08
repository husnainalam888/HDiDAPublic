import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Product from './Product';
import ProductLoadingComp from './LoadingComponents/ProductLoadingComp';
import AnimatedSVG from './AnimatedSvg';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {styles} from '../Screens/CarDetails/CarDetails';

const ProductList = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const handleEndReached = ({
    nativeEvent: {layoutMeasurement, contentOffset, contentSize},
  }) => {
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;

    if (isEndReached && contentOffset.y > 0) {
      props.onEndReached && props.onEndReached();
    }
  };

  return (
    <>
      {!props.loading ? (
        <>
          <FlatList
            data={props.data}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            onScroll={handleEndReached}
            horizontal={props.type != 2}
            contentContainerStyle={[
              styles.contentContainerStyle,
              props.pageLoading && {paddingBottom: 40},
            ]}
            keyExtractor={item => item.id}
            ListFooterComponent={() =>
              props.pageLoading ? (
                <View style={{marginBottom: 40}}>
                  <AnimatedSVG />
                </View>
              ) : null
            }
            renderItem={({item}) => (
              <Product
                hideComments={props.hideComments}
                onCommentPress={props.onCommentPress}
                type={props.type || 1}
                item={item}
                itemStyle={props.itemStyle}
                onChange={props.onChange}
                onDelete={props.onDelete}
              />
            )}
          />
          {/* {props.pageLoading?<View style={{marginBottom:40}}><AnimatedSVG/></View>:null} */}
        </>
      ) : (
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          horizontal={props.type != 2}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProductLoadingComp
              type={props.type || 1}
              itemStyle={props.itemStyle}
            />
          )}
        />
      )}
    </>
  );
};

export default ProductList;

const styling = theme =>
  StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 8,
    },
    flatList: {marginHorizontal: -16, flexGrow: 0},
  });
