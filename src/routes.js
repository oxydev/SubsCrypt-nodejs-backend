'use strict';

const router = require('express').Router();
const middleware = require('./middleware');
const errors = require('./errors');
const healthRouter = require('./health/router');
const taskRouter = require('./tasks/router');
const subsCryptRouter = require('./subsCrypt/router');

// Wire up middleware
router.use(middleware.doSomethingInteresting);

// Wire up routers
router.use('/health', healthRouter);
router.use('/tasks', taskRouter);
router.use('/subsCrypt', subsCryptRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
