// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
const routes = {
  userCheckAuth: '/userCheckAuth',
  providerCheckAuth: '/providerCheckAuth',
  checkSubscription: '/checkSubscription',
  checkSubscriptionWithUsername: '/checkSubscription/:username',
  getUsername: '/getUsername/:address',
  getPlanData: '/getPlanData/:providerAddress/:planIndex',
  getPlanLength: '/getPlanLength/:providerAddress',
  isUsernameAvailable: '/isUsernameAvailable/:username',
  userCheckAuthWithUsername: '/userCheckAuth/:username',
  providerCheckAuthWithUsername: '/providerCheckAuth/:username',
  checkAuth: '/checkAuth',
  checkAuthWithUsername: '/checkAuth/:username',
  retrieveWholeDataWithUsername: '/retrieveDataWithUsername',
  retrieveDataWithUsername: '/retrieveDataWithUsername/:providerAddress',
  isConnected: '/isConnected',
  getPlanCharacteristics: '/getPlanCharacteristics/:providerAddress/:planIndex',
};
const MAIN_ROUTE = '/subsCrypt';
Object.keys(routes).forEach((value) => {
  router.get(routes[value], tasks[value]);
});

// router.get('/userCheckAuth', tasks.userCheckAuth);
// router.get('/providerCheckAuth', tasks.providerCheckAuth);
// router.get('/checkSubscription', tasks.checkSubscription);
// router.get('/checkSubscription/:username', tasks.checkSubscriptionWithUsername);
// router.get('/getUsername/:address', tasks.getUsername);
// router.get('/getPlanData/:providerAddress/:planIndex', tasks.getPlanData);
// router.get('/isUsernameAvailable/:username', tasks.isUsernameAvailable);
// router.get('/userCheckAuth/:username', tasks.userCheckAuthWithUsername);
// router.get('/providerCheckAuth/:username', tasks.providerCheckAuthWithUsername);
// router.get('/checkAuth', tasks.checkAuth);
// router.get('/checkAuth/:username', tasks.checkAuthWithUsername);
// router.get('/retrieveDataWithUsername', tasks.retrieveWholeDataWithUsername);
// router.get('/retrieveDataWithUsername/:providerAddress', tasks.retrieveDataWithUsername);
// router.get('/isConnected', tasks.isConnected);
// router.get('/getPlanCharacteristics/:providerAddress/:planIndex', tasks.getPlanCharacteristics);

// Export the router
module.exports = {
  router,
  routes,
  MAIN_ROUTE,
};
