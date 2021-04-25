'use strict';

// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
router.get('/', tasks.checkAuth);
router.get('/', tasks.retrieveWholeDataWithPassword);
router.get('/', tasks.retrieveWholeDataWithWallet);
router.get('/', tasks.retrieveDataWithPassword);
router.get('/', tasks.retrieveDataWithWallet);
router.get('/', tasks.checkSubscription);

// Export the router
module.exports = router;