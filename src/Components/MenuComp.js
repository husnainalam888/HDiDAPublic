import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {SVG} from '../SVGS/SVG';
import DropShadow from 'react-native-drop-shadow';
import {Colors, DarkColors} from '../Utils/Colors';
import React from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
export const MenuItem = ({startIcon, label, handleSelect = () => {}}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  return (
    <TouchableOpacity onPress={handleSelect} style={styles.item}>
      {startIcon && <SvgFromXml xml={startIcon} height={18} width={18} />}
      <Text style={[styles.itemText, startIcon && {marginLeft: 10}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const MenuComp = props => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const menuRef = React.useRef(null);
  const handleSelect = () => {
    if (menuRef.current) {
      menuRef.current.close();
    }
  };
  return (
    <View style={{zIndex: 1000, ...props.style}}>
      <Menu ref={menuRef} style={{zIndex: 10000}}>
        <MenuTrigger
          children={
            <View style={{paddingHorizontal: 8, paddingVertical: 12}}>
              <SvgFromXml
                xml={props.icon || SVG.threeDot}
                height={6}
                width={21}
              />
            </View>
          }
        />
        <MenuOptions
          style={{zIndex: 1000}}
          customStyles={{optionsContainer: styles.container}}>
          {props.children ? (
            React.Children.map(props.children, child => {
              return React.cloneElement(child, {
                handleSelect: () => {
                  child.props.handleSelect();
                  handleSelect();
                },
              });
            })
          ) : (
            <>
              <MenuItem
                startIcon={SVG.eyeHide}
                label={'Hide'}
                handleSelect={handleSelect}
              />
              <MenuItem
                startIcon={SVG.aboutUs}
                label={'Report Comment'}
                handleSelect={handleSelect}
              />
              <MenuItem
                startIcon={SVG.deleteFromMenu}
                label={'Delete Comment'}
                handleSelect={handleSelect}
              />
            </>
          )}
        </MenuOptions>
      </Menu>
    </View>
  );
};
const styling = theme =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginVertical: 10,
    },
    shadow: {
      shadowColor: Colors.Black,
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowRadius: 4,
      borderRadius: 50,
    },
    container: {
      zIndex: 1000,
      borderTopLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      backgroundColor: theme == 'dark' ? DarkColors.GrayMedium : 'white',
      paddingHorizontal: 17,
      paddingVertical: 10,
    },
    itemText: {
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontSize: 14,

      textAlign: 'left',
    },
  });

export default MenuComp;
