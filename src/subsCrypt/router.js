// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks

router.get('/userCheckAuth', tasks.userCheckAuth);
router.get('/providerCheckAuth', tasks.providerCheckAuth);
router.get('/checkSubscription', tasks.checkSubscription);
router.get('/checkSubscription/:username', tasks.checkSubscriptionWithUsername);
router.get('/getUsername/:address', tasks.getUsername);
router.get('/getPlanData/:providerAddress/:planIndex', tasks.getPlanData);
router.get('/isUsernameAvailable/:username', tasks.isUsernameAvailable);
router.get('/userCheckAuth/:username', tasks.userCheckAuthWithUsername);
router.get('/providerCheckAuth/:username', tasks.providerCheckAuthWithUsername);
router.get('/checkAuth', tasks.checkAuth);
router.get('/checkAuth/:username', tasks.checkAuthWithUsername);
router.get('/retrieveDataWithUsername', tasks.retrieveWholeDataWithUsername);
router.get('/retrieveDataWithUsername/:providerAddress', tasks.retrieveDataWithUsername);
router.get('/isConnected', tasks.isConnected);
router.get('/getPlanCharacteristics/:providerAddress/:planIndex', tasks.getPlanCharacteristics);

// Export the router
module.exports = router;
