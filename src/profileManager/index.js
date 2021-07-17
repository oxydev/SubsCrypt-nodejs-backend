const subscrypt = require('@oxydev/subscrypt');
const fs = require('fs');
const db = require('../databaseWrapper/database');

const providersPath = 'uploads/uploadProviders/';

function getPic(path, res) {
  try {
    const file = fs.createReadStream(path);
    const filename = (new Date()).toISOString();
    res.setHeader('Content-Disposition', `attachment: filename="${filename}"`);
    file.pipe(res);
  } catch (err) {
    res.status(404)
      .send('the provider has not image');
  }
}

async function setProviderProfile(req, res) {
  try {
    await db.setProviderProfile(
      req.body.providerAddress,
      req.body.description,
      req.body.providerName,
      req.file ? req.file.filename : null,
    );
    res.status(200)
      .send('OK');
  } catch (err) {
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
          res.status(200);
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
    await db.updateProductDescription(
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
  try {
    const value = await db.getProviderProfile(req.params.providerAddress);
    getPic(providersPath + value, res);
  } catch (e) {
    res.status(400)
      .json({
        err: 'there is no such provider',
      });
  }
}

async function getProviderDescription(req, res) {
  try {
    const values = await db.getProviderDescription(req.params.providerAddress);
    res.status(200)
      .json({
        description: values[0],
        name: values[1],
      });
  } catch (e) {
    res.status(400)
      .json({
        err: 'there is no such provider',
      });
  }
}

async function getProductDescription(req, res) {
  try {
    const values = await db.updateProductDescription(req.params.providerAddress);
    res.status(200)
      .json({
        description: values[0],
        name: values[1],
      });
  } catch (e) {
    res.status(400)
      .json({
        err: 'there is no such provider',
      });
  }
}

module.exports = {
  updateProductProfile,
  setProviderProfile,
  getProviderProfile,
  updateProviderProfile,
  getProviderDescription,
  getProductDescription,
};
