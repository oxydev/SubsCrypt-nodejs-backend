const router = require('express')
  .Router();

const multer = require('multer');
const index = require('./index');

const uploadProviders = multer({
  dest: './uploads/uploadProviders/',
  limits: { fileSize: 3000000 },
});

router.post('/newProviderRegister', uploadProviders.single('profile'), index.setProviderProfile);
router.patch('/updateProviderPic', uploadProviders.single('profile'), index.updateProviderProfile);
router.patch('/updateProductProfile', index.updateProductProfile);
router.get('/getProviderPic/:providerAddress', index.getProviderProfile);
router.get('/getProviderDescription/:providerAddress', index.getProviderDescription);
router.get('/getProductDescription/:providerAddress/:planIndex', index.getProductDescription);

module.exports = {
  router,
};
