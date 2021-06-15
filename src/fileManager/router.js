const router = require('express')
  .Router();
const multer = require('multer');
const index = require('./index');

const uploadProviders = multer({
  dest: 'uploads/uploadProviders/',
  limits: { fileSize: 300000 },
});

const uploadUsers = multer({
  dest: 'uploads/uploadUsers/',
  limits: { fileSize: 1000000 },
});

const uploadProducts = multer({
  dest: 'uploads/uploadProducts/',
  limits: { fileSize: 1000000 },
});

router.post('/updateProviderPic', uploadProviders.single('profile'), index.updateProviderProfile);
router.post('/updateUserPic', uploadUsers.single('profile'), index.updateUserProfile);
router.post('/updateProductPic', uploadProducts.single('profile'), index.updateProductProfile);
router.get('/getProviderPic/:providerAddress', index.getProviderProfile);
router.get('/getUserPic/:userAddress', index.getUserProfile);
router.get('/getProductPic/:providerAddress/:planIndex', index.getProductProfile);

// Export the router
module.exports = {
  router,
};
