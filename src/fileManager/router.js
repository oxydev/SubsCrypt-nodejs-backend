const router = require('express')
  .Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('upload/', upload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
});

// Export the router
module.exports = {
  router,
};
