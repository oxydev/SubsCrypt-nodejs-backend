// Router
const router = require('express')
  .Router();
const tasks = require('./index');

// Tasks
const routes = {
  getUsers: '/getUsers/:providerAddress',
  getUsersOfPlan: '/getUsers/:providerAddress/:planIndex',
  getProviderData: '/getProviderData/:providerAddress',
  getProviderCustomIncome: '/getProviderCustomIncome/:providerAddress/:start/:finish',
  getPlanIncome: '/getPlanIncome/:providerAddress/:planIndex',
  getPlanCustomIncome: '/getPlanIncomeCustomIncome/:providerAddress/:PlanIndex/:start/:finish',
};
const MAIN_ROUTE = '/subscriptions';
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
