import {GooglePay} from 'react-native-google-pay';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const requestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      gateway: 'stripe',
      gatewayMerchantId: '',
      stripe: {
        publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
        version: '2018-11-08',
      },
      gateway: 'example',
      gatewayMerchantId: 'exampleGatewayMerchantId',
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '10',
    totalPriceStatus: 'FINAL',
    currencyCode: 'USD',
  },
  merchantName: 'Example Merchant',
};
const setEnvironment = () => {
  GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
};
const requestPayment = () => {
  GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
    ready => {
      if (ready) {
        GooglePay.requestPayment(requestData)
          .then(token => {})
          .catch(error => console.log(error.code, error.message));
      }
    },
  );
};

export {setEnvironment, requestPayment};
