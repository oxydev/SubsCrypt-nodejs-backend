const db = require('../databaseWrapper/database');

async function updateProviderProfile(req, res) {
  try {
    db.updateProviderProfile(req.body.providerAddress, req.file.filename);
    res.send(req.file.filename);
  } catch (err) {
    res.send(400);
  }
}

async function updateUserProfile(req, res) {
  try {
    db.updateUserProfile(req.body.userAddress, req.file.filename);
    res.send(req.file.filename);
  } catch (err) {
    res.send(400);
  }
}

async function updateProductProfile(req, res) {
  try {
    db.updateProductProfile(req.body.providerAddress, req.body.planIndex, req.file.filename);
    res.send(req.file.filename);
  } catch (err) {
    res.send(400);
  }
}

async function getProviderProfile(req, res) {
  await db.getProviderProfile(req.params.providerAddress, res);
}

async function getUserProfile(req, res) {
  await db.getUserProfile(req.params.userAddress, res);
}

async function getProductProfile(req, res) {
  await db.getProductProfile(req.params.providerAddress, req.params.planIndex, res);
}

module.exports = {
  updateProviderProfile,
  updateUserProfile,
  updateProductProfile,
  getProviderProfile,
  getUserProfile,
  getProductProfile,
};
