import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import HeaderBottomSheet from '../HeaderBottomSheet';
import VehileTypes from './VehileTypes';
import FilterList from './FilterList';
import {MAKES, PRICES, VEHILE_TYPES} from '../../Utils/Data';
import {SVG} from '../../SVGS/SVG';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {LOCALIZED_STRINGS} from '../../Utils/Strings';
import {useLanguage} from '../../Provider/LanguageProvider';
import RangeInput from '../RangeInput';
import {DarkColors} from '../../Utils/Colors';

const FilterSheet = ({
  onClose,
  onSelect,
  filterType,
  selectedList,
  onReset,
}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const {localized} = useLanguage();
  const [filters, setFilters] = useMMKVStorage('pickers', global_storage, []);
  const [subCatFilter, setSubCatFilter] = useState(null);
  const [filterSelected, setFilterSelected] = useState(
    filterType || {name: localized.filters},
  );
  const [selected, setSelected] = useState(false);

  const handleStartPress = () => {
    setFilterSelected(null);
  };

  const handleFilterSelect = item => {
    setFilterSelected(item);
  };

  useEffect(() => {}, [filterType]);

  return (
    <View style={styles.container}>
      <HeaderBottomSheet
        label={filterSelected ? filterSelected.name : localized.filters}
        showStart={
          filterSelected !== null && filterSelected.name !== localized.filters
        }
        showReset={
          filterSelected !== null && filterSelected.name !== localized.filters
        }
        onPressReset={onReset}
        onStartPress={handleStartPress}
        endIcon={theme == 'dark' ? SVG.darkClose : SVG.close}
        onPressEnd={onClose}
      />

      {subCatFilter?.subValues?.length > 0 ? (
        <VehileTypes
          selected={
            selectedList?.find(x => x.type == filterSelected.name)?.value
          }
          onSelect={selected => {
            if (onSelect) {
              onSelect({
                type: filterSelected.name,
                value: subCatFilter,
                subValue: selected.name,
              });
            }
          }}
          data={subCatFilter.subValues.map(item => {
            return {name: item, _id: item};
          })}
          clearAll={onReset ? onReset : () => {}}
        />
      ) : filterSelected?.name &&
        filterSelected.name != localized.filters &&
        filterSelected?.type == 'dropdown' &&
        (filterSelected?.subValues?.length == 0 ||
          !filterSelected?.subValues) ? (
        <VehileTypes
          selected={
            selectedList?.find(x => x.type == filterSelected.name)?.value
          }
          onSelect={selected => {
            console.log(
              'FilterSheet',
              'onSelect',
              'Selected List :',
              selectedList,
            );
            if (onSelect)
              if (selected?.subValues?.length > 0) {
                console.log('FilterSheet', 'selected', selected);
                setSubCatFilter(selected);
              } else onSelect({type: filterSelected.name, value: selected});
          }}
          data={filterSelected.values}
          clearAll={onReset ? onReset : () => {}}
        />
      ) : filterSelected?.type == 'range' ? (
        <RangeInput
          label={'Enter Range'}
          selected={
            selectedList?.find(x => x?.type == filterSelected?.name)?.value
              ?.name
          }
          onApply={value => {
            console.log('FilterSheet', 'onSelect', 'Selected List :', value);
            if (onSelect)
              onSelect({type: filterSelected.name, value: {name: value}});
          }}
        />
      ) : (
        <FilterList
          data={[
            ...filters.filter(x => x.type == 'dropdown' || x.type == 'range'),
            {
              _id: 'price',
              multiple: false,
              name: 'Price',
              status: true,
              type: 'range',
              values: [],
            },
          ]}
          selected={selectedList}
          onSelect={handleFilterSelect}
        />
      )}
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLighter : 'white',
    },
  });

export default FilterSheet;
