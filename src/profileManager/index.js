const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');

async function setProviderProfile(req, res) {
  try {
    db.setProviderProfile(
      req.body.providerAddress,
      req.body.description,
      req.body.providerName,
      req.file ? req.file.filename : null,
    );
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.send(400);
  }
}

async function updateProviderProfile(req, res) {
  try {
    await subscrypt.providerCheckAuthWithUsername(req.body.username, req.body.phrase)
      .then((resp) => {
        if (resp.result === true) {
          db.setProviderProfile(
            req.body.providerAddress,
            req.body.description,
            req.body.providerName,
            req.file ? req.file.filename : null,
          );
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

async function updateProductProfile(req, res) {
  try {
    console.log(req.body);
    db.updateProductDescription(
      req.body.providerAddress,
      req.body.planName,
      req.body.planIndex,
      req.body.description,
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
}

async function getProviderProfile(req, res) {
  await db.getProviderProfile(req.params.providerAddress, res);
}

async function getProviderDescription(req, res) {
  await db.getProviderDescription(req.params.providerAddress, res);
}

async function getProductDescription(req, res) {
  await db.getProductDescription(req.params.providerAddress, req.params.planIndex, res);
}

module.exports = {
  updateProductProfile,
  setProviderProfile,
  getProviderProfile,
  updateProviderProfile,
  getProviderDescription,
  getProductDescription,
};
