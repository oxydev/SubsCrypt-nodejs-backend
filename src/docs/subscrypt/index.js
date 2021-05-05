const checkSubscription = require('./checkSubscription');
const isConnected = require('./isConnected');
const checkSubscriptionWithUsername = require('./checkSubscriptionWithUsername');

module.exports = {
  paths: {
    '/subsCrypt/checkSubscription': {
      ...checkSubscription,
    },
    '/subsCrypt/checkSubscription/{username}': {
      ...checkSubscriptionWithUsername,
    },
    '/subsCrypt/isConnected': {
      ...isConnected,
    },
  },
};
