const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');

async function setProviderProfile(req, res) {
  try {
    db.setProviderProfile(req.body.providerAddress, req.body.description, req.file.filename);
    res.send(req.file.filename);
  } catch (err) {
    res.send(400);
  }
}

async function updateProviderProfile(req, res) {
  try {
    await subscrypt.providerCheckAuthWithUsername(req.body.username, req.body.phrase)
      .then((resp) => {
        if (resp.result === true) {
          db.setProviderProfile(req.body.providerAddress, req.body.description, req.file.filename);
          res.send(req.file.filename);
        } else {
          res.send('username or password is invalid!');
        }
      })
      .catch(() => {
        res.send('username or password is invalid');
      });
  } catch (err) {
    res.send(400);
  }
}

// async function updateProductProfile(req, res) {
//   try {
//     db.updateProductProfile(req.body.providerAddress, req.body.planIndex, req.file.filename);
//     res.send(req.file.filename);
//   } catch (err) {
//     res.send(400);
//   }
// }

async function getProviderProfile(req, res) {
  await db.getProviderProfile(req.params.providerAddress, res);
}

// async function getUserProfile(req, res) {
//   await db.getUserProfile(req.params.userAddress, res);
// }

// async function getProductProfile(req, res) {
//   await db.getProductProfile(req.params.providerAddress, req.params.planIndex, res);
// }

module.exports = {
  setProviderProfile,
  getProviderProfile,
  updateProviderProfile,
};
