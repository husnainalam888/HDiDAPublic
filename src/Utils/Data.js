import {SVG, svgWithColor} from '../SVGS/SVG';
import {Colors} from './Colors';

export const Langues = [
  {
    image: require('../assets/english.png'),
    language: 'English',
  },
  {
    language: 'Arabic(ALG)',
    image: require('../assets/arabic.png'),
  },
  {
    language: 'French',
    image: require('../assets/french.png'),
  },
  {
    language: 'Arabic (UAE)',
    image: require('../assets/arabic_uae.png'),
  },
  {
    language: 'Arabic(TUN)',
    image: require('../assets/arabic_tun.png'),
  },
  {
    language: 'Arabic(MAR)',
    image: require('../assets/arabic_mar.png'),
  },
];

export const TAGS = [
  {
    id: 1,
    name: 'Used Cars',
  },
  {
    id: 2,
    name: 'New Cars',
  },
  {
    id: 3,
    name: 'Motorcycles',
  },
  {
    id: 4,
    name: 'Bikes',
  },
];
export const FAQTAGS = [
  {
    id: 1,
    name: 'General',
  },
  {
    id: 2,
    name: 'Account',
  },
  {
    id: 3,
    name: 'Service',
  },
  {
    id: 4,
    name: 'Payment',
  },
];
export const FILTER_TAGS = [
  {id: 1, name: 'Date Listed'},
  {id: 2, name: 'Vehicle Type'},
  {id: 3, name: 'Condition'},
  {id: 4, name: 'Year'},
  {id: 5, name: 'Make'},
  {id: 6, name: 'Body Style'},
  {id: 7, name: 'Fuel Type'},
  {id: 8, name: 'Mileage'},
  {id: 9, name: 'Vehicle Feature'},
  {id: 10, name: 'Transmission Type'},
];
export const PRODUCTS = [
  {
    id: 1,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: true,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Petrol',
    isLiked: 'true',
  },
  {
    id: 2,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: false,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Electric',
    isLiked: 'false',
  },
  {
    id: 3,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: true,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Petrol',
    isLiked: 'true',
  },
  {
    id: 4,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: false,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Electric',
    isLiked: 'false',
  },
  {
    id: 5,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: true,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Petrol',
    isLiked: 'true',
  },
  {
    id: 6,
    image: require('../assets/product.png'),
    isPromoted: true,
    isFavorite: false,
    name: 'Toyota Corolla 2011',
    price: '$35,650',
    location: 'Toronto, Canada',
    yearModel: '2019',
    distanceCover: '15,350 km',
    type: 'Electric',
    isLiked: 'false',
  },
];

export const CATS = [
  {
    id: 1,
    name: 'City',
  },
  {
    id: 2,
    name: 'Sedan',
  },
  {
    id: 3,
    name: 'Avg Sedan',
  },
  {
    id: 4,
    name: 'Family',
  },
];

export const COMMENTS = [
  {
    id: 1,
    name: 'Mark TR',
    comment: 'No, everything is working okay...',
    time: '1 day ago',
    image: require('../assets/avatar.png'),
    replies: [
      {
        id: 11,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
      {
        id: 12,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
    ],
  },
  {
    id: 2,
    name: 'Mark TR',
    comment: 'No, everything is working okay...',
    time: '1 day ago',
    image: require('../assets/avatar.png'),
    replies: [
      {
        id: 21,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
      {
        id: 22,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
    ],
  },
  {
    id: 3,
    name: 'Mark TR',
    comment: 'No, everything is working okay...',
    time: '1 day ago',
    image: require('../assets/avatar.png'),
    replies: [
      {
        id: 31,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
      {
        id: 32,
        name: 'Mark TR',
        comment: 'No, everything is working okay...',
        time: '1 day ago',
        image: require('../assets/avatar.png'),
      },
    ],
  },
];

export const FILTERS = [
  {
    id: 1,
    name: 'Vehicle Type',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 2,
    name: 'Make',
    description: 'Ford, Audi, Honda, Chevrolet, etc',
  },
  {
    id: 3,
    name: 'Body Style',
    description: 'Sedan, Hatchback, SUV, etc',
  },
  {
    id: 4,
    name: 'Price',
    description: 'Select a price range',
  },
];

export const VEHILE_TYPES = [
  {
    id: 0,
    name: 'All',
    description: '',
  },
  {
    id: 1,
    name: 'Car/Truck',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 2,
    name: 'Motorcycle',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 3,
    name: 'Boat',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 4,
    name: 'SUV',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 5,
    name: 'Truck',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
  {
    id: 6,
    name: 'Van',
    description: 'Car/Truck, motorcycle, boat, etc',
  },
];

export const MAKES = [
  {
    id: 0,
    name: 'Any',
  },
  {
    id: 1,
    name: 'Toyota',
  },
  {
    id: 2,
    name: 'Ford',
  },

  {
    id: 3,
    name: 'Honda',
  },
  {
    id: 4,
    name: 'Chevrolet',
  },
  {
    id: 5,
    name: 'Audi',
  },
  {
    id: 6,
    name: 'Nissan',
  },
  {
    id: 7,
    name: 'Mazda',
  },
  {
    id: 8,
    name: 'Hyundai',
  },
  {
    id: 9,
    name: 'BMW',
  },
];

export const PRICES = [
  {
    id: 1,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 2,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 3,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 4,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 5,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 6,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 7,
    name: 'From $10,0000 to  $20,000',
  },
  {
    id: 8,
    name: 'From $10,0000 to  $20,000',
  },
];

export const CAR_IMAGES = [
  {
    id: 1,
    image:
      'https://s3-prod.autonews.com/s3fs-public/ROLLS_ROYCE_GHOST-MAIN_i.jpg',
  },
  {
    id: 2,
    image: `https://hips.hearstapps.com/hmg-prod/images/rolls-royce-ghost-18-1612977351.jpg`,
  },
  {
    id: 3,
    image: `https://hips.hearstapps.com/hmg-prod/images/rolls-royce-ghost-18-1612977351.jpg`,
  },
  {
    id: 4,
    image: `https://hips.hearstapps.com/hmg-prod/images/rolls-royce-ghost-18-1612977351.jpg`,
  },
];

export const FEATURES = [
  {
    id: 1,
    icon: SVG.clock,
    type: 'Year',
    value: '2019',
  },
  {
    id: 2,
    icon: SVG.meter,
    type: '1200 km',
    value: 'miles',
  },
  {
    id: 3,
    icon: SVG.flash,
    type: 'Petrol',
    value: 'Variant',
  },
  {
    id: 4,
    icon: SVG.dor,
    type: '4 Doors',
    value: 'Door',
  },
];

export const INFO = [
  {
    id: 1,
    label: 'Year',
    value: '2019',
  },
  {
    id: 2,
    label: 'Mileage',
    value: '1200 km',
  },
  {
    id: 3,
    label: 'Petrol',
    value: 'Variant',
  },
  {
    id: 4,
    label: '4 Doors',
    value: 'Door',
  },
  {
    id: 5,
    label: 'Transmission',
    value: 'Manual',
  },
  {
    id: 6,
    label: 'Fuel',
    value: 'Petrol',
  },
  {
    id: 7,
    label: 'Color',
    value: 'Black',
  },
];

export const FEATURE_ITEMS = [
  {
    id: 1,
    name: 'AC',
  },
  {
    id: 2,
    name: 'Sunroof',
  },
  {
    id: 3,
    name: 'ABS',
  },
  {
    id: 4,
    name: 'Power Steering',
  },
  {
    id: 5,
    name: 'Bluetooth',
  },
  {
    id: 6,
    name: 'CD Player',
  },
];

export const CHAT_LIST = [
  {
    id: 1,
    name: 'Mark TR',
    message: 'Have a good one!',
    time: '3:02 PM',
    unreadCount: 2,
  },
  {
    id: 2,
    name: 'Mark TR',
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
  {
    id: 3,
    name: 'Mark TR',
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
  {
    id: 4,
    name: 'Mark TR',
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
  {
    id: 5,
    name: 'Mark TR',
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
  {
    id: 6,
    name: 'Mark TR',
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
];

export const MESSAGES = [
  {
    id: 1,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
    type: 'received',
  },
  {
    id: 2,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
    type: 'received',
  },
  {
    id: 3,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
    type: 'send',
  },
  {
    id: 4,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
    type: 'received',
  },
  {
    id: 5,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
    type: 'send',
  },
  {
    id: 6,
    message: 'No, everything is working okay...',
    time: '3:02 PM',
  },
];

export const DROPDOWNS_LIST = [
  {
    id: 1,
    label: 'Category',
    items: [
      {
        id: 1,
        label: 'SUV',
        value: 'SUV',
      },
      {
        id: 2,
        label: 'Sedan',
        value: 'Sedan',
      },
      {
        id: 3,
        label: 'Avg Sedan',
        value: 'Avg Sedan',
      },
      {
        id: 4,
        label: 'Avg SUV',
        value: 'Avg SUV',
      },
    ],
  },
  {
    id: 2,
    label: 'Sub Category',
    items: [
      {
        id: 1,
        label: 'City',
        value: 'City',
      },
      {
        id: 2,
        label: 'SUV',
        value: 'SUV',
      },
      {
        id: 3,
        label: 'Sedan',
        value: 'Sedan',
      },
    ],
  },
  {
    id: 3,
    label: 'Make',
    items: [],
  },
  {
    id: 4,
    label: 'Model',
    items: [],
  },
  {
    id: 5,
    label: 'Year',
    items: [],
  },
  {
    id: 6,
    label: 'Transmission',
    items: [],
  },
  {
    id: 7,
    label: 'Color',
    items: [],
  },
];

const PROFILE_SETTTINGS = [
  {
    id: 1,
    icon: svgWithColor('profileFill', '#B1BACD'),
    title: 'Profile',
  },
  {
    id: 2,
    title: 'Address',
    icon: svgWithColor('locatonFill', '#B1BACD'),
  },
  {
    id: 3,
    title: 'Payment',
    icon: svgWithColor('wallet', '#B1BACD'),
  },
  {
    id: 4,

    title: 'Language',
    icon: svgWithColor('language', '#B1BACD'),
  },
  {
    id: 5,
    title: 'Privacy Policy & Terms',
    icon: svgWithColor('privacyFill', '#B1BACD'),
  },
  {
    id: 6,
    title: 'Help & Support',
    icon: svgWithColor('Help', '#B1BACD'),
  },
  {
    id: 7,
    title: 'Refer a Friend',
    icon: svgWithColor('heartFillGray', '#B1BACD'),
  },
  {
    id: 8,
    title: 'About Us',
    icon: svgWithColor('aboutUs', '#B1BACD'),
  },
  {
    id: 9,
    icon: SVG.logout,
    title: 'Logout',
  },
];

export const SHARE_APPS = [
  {
    id: 1,
    label: 'Copy Link',
    icon: SVG.copy_link,
  },
  {
    id: 2,
    label: 'Whatsapp',
    icon: SVG.whatsapp,
  },
  {
    id: 3,
    label: 'Facebook',
    icon: SVG.fb_share,
  },
  {
    id: 4,
    label: 'Messenger',
    icon: SVG.fb_messenger,
  },
  {
    id: 5,
    label: 'Instagram',
    icon: SVG.insta_share,
  },
  {
    id: 6,
    label: 'Skype',
    icon: SVG.skype,
  },
  {
    id: 7,
    label: 'Twitter',
    icon: SVG.twitter_share,
  },
  {
    id: 8,
    label: 'Messages',
    icon: SVG.messages,
  },
];

export const CONTACT_LIST = [
  {
    id: 1,
    name: 'Romeo Can',
    phone: '+1 123-123-1234',
    following: true,
  },
  {
    id: 2,
    name: 'Sonia Ria',
    phone: '+1 123-123-1234',
  },
  {
    id: 3,
    name: 'Charlie Puth',
    phone: '+1 123-123-1234',
  },

  {
    id: 4,
    name: 'Justin Bieber',
    phone: '+1 123-123-1234',
  },
  {
    id: 5,
    name: 'Romeo Can',
    phone: '+1 123-123-1234',
  },
  {
    id: 6,
    name: 'Sonia Ria',
    phone: '+1 123-123-1234',
  },
  {
    id: 7,
    name: 'Charlie Puth',
    phone: '+1 123-123-1234',
  },

  {
    id: 8,
    name: 'Justin Bieber',
    phone: '+1 123-123-1234',
  },
  {
    id: 9,
    name: 'Romeo Can',
    phone: '+1 123-123-1234',
  },
  {
    id: 10,
    name: 'Sonia Ria',
    phone: '+1 123-123-1234',
  },
  {
    id: 11,
    name: 'Charlie Puth',
    phone: '+1 123-123-1234',
  },
];
