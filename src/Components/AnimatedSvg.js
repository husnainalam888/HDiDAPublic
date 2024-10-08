import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const AnimatedSVG = ({color = '#54D1B1'}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const rotateAnimation = Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true,
    }),
  );

  useEffect(() => {
    rotateAnimation.start();
    return () => {
      rotateAnimation.stop();
    };
  }, []);

  const rotateStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, rotateStyle]}>
      <Svg width={48} height={48} viewBox="0 0 48 48">
        <Circle
          cx={24}
          cy={44}
          r={4}
          transform="rotate(-90 24 44)"
          fill={color}
        />
        <Circle
          cx={24}
          cy={4}
          r={4}
          transform="rotate(-90 24 4)"
          fill={color}
        />
        <Circle
          cx={4}
          cy={24}
          r={4}
          transform="rotate(-90 4 24)"
          fill={color}
        />
        <Circle
          cx={44}
          cy={24}
          r={4}
          transform="rotate(-90 44 24)"
          fill={color}
        />
        <Circle
          cx={9.85784}
          cy={9.85791}
          r={4}
          transform="rotate(-45 9.85784 9.85791)"
          fill={color}
        />
        <Circle
          cx={38.1421}
          cy={38.1421}
          r={4}
          transform="rotate(-45 38.1421 38.1421)"
          fill={color}
        />
        <Circle
          cx={38.1421}
          cy={9.85778}
          r={4}
          transform="rotate(45 38.1421 9.85778)"
          fill={color}
        />
        <Circle
          cx={9.85785}
          cy={38.1422}
          r={4}
          transform="rotate(45 9.85785 38.1422)"
          fill={color}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedSVG;
