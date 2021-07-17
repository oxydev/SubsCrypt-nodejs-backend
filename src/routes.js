const router = require('express').Router();
const { MAIN_ROUTE } = require('./subsCrypt/router');
const errors = require('./errors');
const subsCryptRouter = require('./subsCrypt/router');
const dataRouter = require('./profileManager/router');
const subscriptionRouter = require('./subscriptions/router');

// Wire up routers
router.use(MAIN_ROUTE, subsCryptRouter.router);
router.use('/profile', dataRouter.router);
router.use('/subscriptions', subscriptionRouter.router);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
