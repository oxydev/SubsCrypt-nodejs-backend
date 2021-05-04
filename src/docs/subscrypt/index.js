const getTodo = require('./get-todo');

module.exports = {
  paths: {
    '/subsCrypt/checkSubscription': {
      ...getTodo,
    },
  },
};
