import React from 'react';
import {FlatList, Text, View} from 'react-native';
const demo = {
  'Disclaimer & Disclosure': 'Disclaimer & Disclosure for HDIDA App Users',
  'Welcome Message':
    'Welcome to HDIDA App, the automotive social marketplace that connects buyers and sellers and offers a range of features to make your car-buying experience exceptional. We want to ensure that all our users are aware of the packages we offer and understand the terms and conditions that govern the use of our platform. Therefore, we have put together this disclaimer and disclosure statement that outlines our policies and procedures.',
  'User Agreement': {
    Heading: 'User Agreement',
    Description:
      'By using the HDIDA App, you agree to abide by our user agreement, which includes our terms of service, privacy policy, and any other guidelines or policies that we may provide from time to time. Please read these documents carefully before using the app.',
  },
  'User Packages': {
    Heading: 'User Packages',
    Description:
      'We offer different packages to our users, which provide various benefits and features, depending on the level of membership. Our packages include:',
  },
  Packages: {
    Basic: {
      Heading: 'Basic',
      Description:
        'This package is free and provides limited features and benefits, such as the ability to browse listings, search for cars, and contact sellers.',
    },
    Premium: {
      Heading: 'Premium',
      Description:
        'This package provides additional features, such as the ability to create listings, access to advanced search options, and priority customer support. The Premium package is available for a fee, which may vary depending on the region and currency.',
    },
    VIP: {
      Heading: 'VIP',
      Description:
        'This package offers the highest level of benefits and features, including personalized assistance from our customer support team, access to exclusive listings, and priority placement in search results. The VIP package is also available for a fee, which may vary depending on the region and currency.',
    },
  },
  'Package Changes': {
    Heading: 'Package Changes',
    Description:
      'Please note that the packages we offer may change from time to time, and we reserve the right to modify, suspend, or discontinue any of our packages or features at any time.',
  },
  'Fees and Payment': {
    Heading: 'Fees and Payment',
    Description:
      'If you choose to purchase one of our premium packages, you will be required to pay the applicable fee. Please note that we use third-party payment processors to process payments, and you may be subject to their terms and conditions. We are not responsible for any fees or charges imposed by these payment processors.',
  },
  'Third-Party Services': {
    Heading: 'Third-Party Services',
    Description:
      'HDIDA App may contain links to third-party services, websites, or content that are not owned or controlled by us. We are not responsible for any content, advertising, products, or other materials available on or through these third-party services. Your use of these services is at your own risk, and we encourage you to review the terms and conditions and privacy policies of any third-party services you access.',
  },
  'Limitation of Liability': {
    Heading: 'Limitation of Liability',
    Description:
      'HDIDA App provides a platform for buyers and sellers to connect and does not guarantee the accuracy, completeness, or quality of any listings or content on the platform. We are not responsible for any transactions or disputes between buyers and sellers, and we do not endorse or recommend any particular seller or product.',
    'Liability Statement':
      'In no event shall HDIDA App or its affiliates, officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app, including but not limited to damages for lost profits, lost data, or business interruption.',
  },
  'Changes to Disclaimer and Disclosure': {
    Heading: 'Changes to Disclaimer and Disclosure',
    Description:
      'We reserve the right to modify or update this disclaimer and disclosure statement at any time, and we encourage you to review it periodically. Your continued use of the HDIDA App following the posting of any changes to this statement constitutes your acceptance of those changes.',
  },
  'Contact Information':
    'If you have any questions or concerns about these policies, please contact us at support@hdida.com.',
};

const DisclaimerComponent = ({data = demo}) => {
  const renderItem = ({item}) => (
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
        {item.Heading}
      </Text>
      {item.Description && <Text>{item.Description}</Text>}
      {item.LiabilityStatement && <Text>{item.LiabilityStatement}</Text>}
      {item.Packages && (
        <FlatList
          data={Object.values(item.Packages)}
          renderItem={({item}) => (
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>{item.Heading}</Text>
              <Text>{item.Description}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );

  return (
    <FlatList
      data={Object.values(data)}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={{paddingHorizontal: 20}}
    />
  );
};

export default DisclaimerComponent;
