const {MAIN_ROUTE} = require("./subsCrypt/router");

const router = require('express').Router();
const errors = require('./errors');
const subsCryptRouter = require('./subsCrypt/router');

// Wire up routers
router.use(MAIN_ROUTE, subsCryptRouter.router);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
