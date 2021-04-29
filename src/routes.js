'use strict';

const router = require('express').Router();
const errors = require('./errors');
const subsCryptRouter = require('./subsCrypt/router');

// Wire up routers
router.use('/subsCrypt', subsCryptRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
