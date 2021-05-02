// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
router.get('/checkAuth', tasks.checkAuth);
router.get('/userCheckAuth', tasks.userCheckAuth);
router.get('/providerCheckAuthWithUsername', tasks.providerCheckAuthWithUsername);
router.get('/checkSubscription', tasks.checkSubscription);
router.get('/checkSubscriptionWithUsername', tasks.checkSubscriptionWithUsername);
router.get('/getUsernameByAddress', tasks.getUsernameByAddress);
router.get('/retrieveDataWithUsername', tasks.retrieveDataWithUsername);
router.get('/getPlanData', tasks.getPlanData);
router.get('/retrieveWholeDataWithUsername', tasks.retrieveWholeDataWithUsername);
router.get('/isUsernameAvailable', tasks.isUsernameAvailable);
router.get('/userCheckAuthWithUsername', tasks.userCheckAuthWithUsername);
router.get('/providerCheckAuthWithUsername', tasks.providerCheckAuthWithUsername);
router.get('/checkAuthWithUsername', tasks.checkAuthWithUsername);
router.get('/isConnected', tasks.isConnected);

// Export the router
module.exports = router;
