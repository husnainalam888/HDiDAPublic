import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {LOCALIZED_STRINGS} from '../Utils/Strings';
import {global_storage} from '../Utils/Utils';
const DEFAULT_LANGUAGE = 'en';
const LanguageContext = createContext();
export const LanguageProvider = ({children, initialLanguage}) => {
  const [selectedLanguage, setSelectedLanguage] = useMMKVStorage(
    'selectedLanguage',
    global_storage,
    initialLanguage || DEFAULT_LANGUAGE,
  );
  useEffect(() => {
    if (selectedLanguage == 'en') {
      setLocalized(LOCALIZED_STRINGS.en);
    } else if(selectedLanguage=="ar"){
      setLocalized(LOCALIZED_STRINGS.ar);
    }
    else{
      setLocalized(LOCALIZED_STRINGS.fr)
    }
  }, [selectedLanguage]);

  const [localized, setLocalized] = useState(
    selectedLanguage == 'en' ? LOCALIZED_STRINGS.en : selectedLanguage=='ar'? LOCALIZED_STRINGS.ar:LOCALIZED_STRINGS.fr,
  );
  const changeLanguage = newLanguage => {
    setSelectedLanguage(newLanguage);
  };

  const value = {
    selectedLanguage,
    changeLanguage,
    localized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
