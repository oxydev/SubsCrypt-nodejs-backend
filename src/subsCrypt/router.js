'use strict';

// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
router.get('/', tasks.checkAuth);
router.get('/', tasks.userCheckAuth);
router.get('/', tasks.providerCheckAuthWithUsername);
router.get('/', tasks.checkSubscription);
router.get('/', tasks.checkSubscriptionWithUsername);
router.get('/', tasks.getUsernameByAddress);
router.get('/', tasks.retrieveDataWithUsername);
router.get('/', tasks.getPlanData);
router.get('/', tasks.retrieveWholeDataWithUsername);
router.get('/', tasks.isUsernameAvailable);
router.get('/', tasks.userCheckAuthWithUsername);
router.get('/', tasks.providerCheckAuthWithUsername);
router.get('/', tasks.checkAuthWithUsername);

// Export the router
module.exports = router;
