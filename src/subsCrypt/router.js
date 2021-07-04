// Router
const router = require('express')
  .Router();
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
  getUsers: '/getUsers/:providerAddress',
  getUsersOfPlan: '/getUsers/:providerAddress/:planIndex',
  addUser: '/addUser/:userAddress', // TODO : remove add to database functions
  addProvider: '/addProvider/:providerAddress',
  addProduct: '/addProduct/:providerAddress/:planIndex',
  addSubscription: '/addSubscription/:providerAddress/:planIndex/:userAddress/:startTime/:duration',
};
const MAIN_ROUTE = '/subsCrypt';
Object.keys(routes)
  .forEach((value) => {
    router.get(routes[value], tasks[value]);
  });

// Export the router
module.exports = {
  router,
  routes,
  MAIN_ROUTE,
};
