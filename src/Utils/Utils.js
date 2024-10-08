import {PermissionsAndroid} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import Countries from './Countries';

export const global_storage = new MMKVLoader().initialize();

// how to format the price using comma i will give string like 2300000
export const formatPrice = price => {
  if (!price) {
    return '';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// how to format time 2023-11-19T17:48:36.317Z to 2 min ago 2 hour ago etc
export const formatTime = time => {
  const date = new Date(time);
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000).toFixed(0);
  const minutes = Math.floor(seconds / 60).toFixed(0);
  const hours = Math.floor(minutes / 60).toFixed(0);
  const days = Math.floor(hours / 24).toFixed(0);
  if (seconds < 60) {
    return `${parseInt(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${parseInt(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${parseInt(hours)} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (days < 365) {
    return `${parseInt(days / 30)} months ago`;
  } else {
    return `${parseInt(days / 365)} years ago`;
  }
};
export const formatDate = date => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

export function parseObjectToArray(inputObject) {
  const resultArray = [];

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const newObj = {
        label: key,
        value: inputObject[key].value,
        subValue: inputObject[key].subValue,
      };
      resultArray.push(newObj);
    }
  }
  console.log('Parsed Array ', JSON.stringify(resultArray));
  return resultArray;
}

export function arrayToObj(inputArray) {
  const resultObject = {};
  if (!inputArray) return resultObject;
  for (const item of inputArray) {
    resultObject[item.label] = item.value;
  }

  return resultObject;
}

export function calculateDaysLeft(creationTime, maxDays = 30) {
  const now = new Date();
  const creationDate = new Date(creationTime);

  // Calculate the difference in milliseconds
  const timeDifference = now - creationDate;

  // Convert milliseconds to days
  const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate remaining days until expiry
  const daysLeft = maxDays - daysElapsed;

  return daysLeft >= 0 ? daysLeft : 0; // Ensure it's not negative
}

export const savedFeatures = [
  {name: 'Air Conditioning'},
  {name: 'Power Windows'},
  {name: 'Power Door Locks'},
  {name: 'Power Mirrors'},
  {name: 'Cruise Control'},
  {name: 'Bluetooth Connectivity'},
  {name: 'USB Ports'},
  {name: 'Backup Camera'},
  {name: 'Keyless Entry'},
  {name: 'Remote Start'},
  {name: 'Sunroof/Moonroof'},
  {name: 'Alloy Wheels'},
  {name: 'Fog Lights'},
  {name: 'Traction Control'},
  {name: 'Stability Control'},
  {name: 'Anti-lock Braking System (ABS)'},
  {name: 'Tire Pressure Monitoring System (TPMS)'},
  {name: 'Heated Seats'},
  {name: 'Leather Seats'},
  {name: 'Satellite Radio'},
  {name: 'Navigation System'},
  {name: 'Automatic Transmission'},
  {name: 'Manual Transmission'},
  {name: 'Four-wheel drive (4WD)'},
  {name: 'All-wheel drive (AWD)'},
  {name: 'Heated Steering Wheel'},
  {name: 'Adaptive Cruise Control'},
  {name: 'Lane Departure Warning'},
  {name: 'Blind Spot Monitoring'},
  {name: 'Parking Sensors'},
  {name: 'Hands-Free Liftgate'},
  {name: 'Voice Control'},
  {name: 'Head-Up Display'},
  {name: 'LED Headlights'},
  {name: 'Roof Rails'},
  {name: 'Trailer Hitch'},
  {name: 'Sport Suspension'},
  {name: 'Off-Road Package'},
];

export const verificationScreenFields = [
  {
    name: 'Phone Number',
    type: 'input',
    value: '',
  },
  {
    name: 'Company Name',
    type: 'input',
    value: '',
  },
  {
    name: 'Legal Status',
    type: 'dropdown',
    values: [
      {
        label: 'One Person EURT',
        value: 'One Person EURT',
      },
    ],
  },
  {
    name: 'Trade Register',
    type: 'input',
    value: '',
  },
  {
    name: 'Tax Identification Number',
    type: 'input',
    value: '',
  },
  {
    name: 'Tax Identification Number (NIF)',
    type: 'input',
    value: '',
  },
  {
    name: 'Business address',
    message: `You can use home address if you don’t have business address`,
    type: 'heading',
    value: '',
  },
  {
    name: 'Country',
    type: 'dropdown',
    values: Countries.map(item => ({label: item.name, value: item.name})),
  },
  {
    name: 'State',
    type: 'input',
    value: '',
  },
  {
    name: 'City',
    type: 'input',
    value: '',
  },
  {
    name: 'Address',
    type: 'input',
    multiline: true,
    value: '',
  },
];
