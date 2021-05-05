const checkSubscription = require('./checkSubscription');
const isConnected = require('./isConnected');
const checkSubscriptionWithUsername = require('./checkSubscriptionWithUsername');
const getUsername = require('./getUsername');
const retrieveDataWithUsername = require('./retrieveDataWithUsername');
const retrieveWholeDataWithUsername = require('./retrieveWholeDataWithUsername');
const isUsernameAvailable = require('./isUsernameAvailable');
const getPlanData = require('./getPlanData');
const checkAuth = require('./checkAuth');
const checkAuthWithUsername = require('./checkAuthWithUsername');
const providerCheckAuth = require('./providerCheckAuth');
const providerCheckAuthWithUsername = require('./providerCheckAuthWithUsername');
const userCheckAuth = require('./userCheckAuth');
const userCheckAuthWithUsername = require('./userCheckAuthWithUsername');

module.exports = {
  paths: {
    '/subsCrypt/checkSubscription': {
      ...checkSubscription,
    },
    '/subsCrypt/checkSubscription/{username}': {
      ...checkSubscriptionWithUsername,
    },
    '/subsCrypt/getUsername/{address}': {
      ...getUsername,
    },
    '/subsCrypt/retrieveDataWithUsername': {
      ...retrieveWholeDataWithUsername,
    },
    '/subsCrypt/retrieveDataWithUsername/{providerAddress}': {
      ...retrieveDataWithUsername,
    },
    '/subsCrypt/isUsernameAvailable/{username}': {
      ...isUsernameAvailable,
    },
    '/subsCrypt/getPlanData/{providerAddress}/{planIndex}': {
      ...getPlanData,
    },
    '/subsCrypt/checkAuth': {
      ...checkAuth,
    },
    '/subsCrypt/checkAuth/{username}': {
      ...checkAuthWithUsername,
    },
    '/subsCrypt/providerCheckAuth': {
      ...providerCheckAuth,
    },
    '/subsCrypt/providerCheckAuth/{username}': {
      ...providerCheckAuthWithUsername,
    },
    '/subsCrypt/userCheckAuth': {
      ...userCheckAuth,
    },
    '/subsCrypt/userCheckAuth/{username}': {
      ...userCheckAuthWithUsername,
    },
    '/subsCrypt/isConnected': {
      ...isConnected,
    },
  },
};
