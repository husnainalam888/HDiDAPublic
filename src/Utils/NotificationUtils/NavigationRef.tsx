import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();
export function setNavigationRef(ref) {
  if (ref) {
    navigationRef.current = ref;
  }
}
