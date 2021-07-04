const router = require('express')
  .Router();

const multer = require('multer');
const index = require('./index');

const uploadProviders = multer({
  dest: 'uploads/uploadProviders/',
  limits: { fileSize: 300000 },
});

// const uploadProducts = multer({
//   dest: 'uploads/uploadProducts/',
//   limits: { fileSize: 1000000 },
// });

router.post('/newProviderRegister', uploadProviders.single('profile'), index.setProviderProfile);
router.patch('/updateProviderPic', uploadProviders.single('profile'), index.updateProviderProfile);
router.get('/getProviderPic/:providerAddress', index.getProviderProfile);
// router.get('/getProductPic/:providerAddress/:planIndex', index.getProductProfile);

// Export the router
module.exports = {
  router,
};
