const subscrypt = require('subscrypt');
const errors = require('../errors');

const refactorRes = (response) => {
  const status = response.status === 'Fetched' ? 200 : 400;
  const { result } = response;
  return [status, result];
};
exports.checkSubscription = async (req, res, next) => {
  // check subscription
  // (user: string, provider_address: string, plan_index: u128) -> boolean
  const { user } = req;
  const { providerAddress } = req;
  const { planIndex } = req;
  const response = await subscrypt.checkSubscription(user, providerAddress, planIndex);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};

exports.checkSubscriptionWithUsername = async (req, res, next) => {
  const { username } = req;
  const { providerAddress } = req;
  const { phrase } = req;
  const response = await subscrypt.checkSubscriptionWithUsername(username, providerAddress, phrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.getUsernameByAddress = async (req, res, next) => {
  const { address } = req;
  const response = await subscrypt.getUsernameByAddress(address);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.retrieveDataWithUsername = async (req, res, next) => {
  const { username } = req;
  const { providerAddress } = req;
  const { phrase } = req;
  const response = await subscrypt.retrieveDataWithUsername(username, providerAddress, phrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};

exports.getPlanData = async (req, res, next) => {
  const { providerAddress } = req;
  const { planIndex } = req;
  const response = await subscrypt.getPlanData(providerAddress, planIndex);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.retrieveWholeDataWithUsername = async (req, res, next) => {
  const { username } = req;
  const { phrase } = req;
  const response = await subscrypt.retrieveWholeDataWithUsername(username, phrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.isUsernameAvailable = async (req, res, next) => {
  const { username } = req;
  const response = await subscrypt.isUsernameAvailable(username);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.userCheckAuthWithUsername = async (req, res, next) => {
  const { username } = req;
  const { passPhrase } = req;
  const response = await subscrypt.userCheckAuthWithUsername(username, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.providerCheckAuthWithUsername = async (req, res, next) => {
  const { username } = req;
  const { passPhrase } = req;
  const response = await subscrypt.providerCheckAuthWithUsername(username, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};

exports.checkAuthWithUsername = async (req, res, next) => {
  const { username } = req;
  const { providerAddress } = req;
  const { passPhrase } = req;
  const response = await subscrypt.checkAuthWithUsername(username, providerAddress, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};

exports.checkAuth = async (req, res, next) => {
  // check user authorization
  const { username } = req;
  const { providerAddress } = req;
  const passPhrase = req.phrase;
  const response = await subscrypt.checkAuth(username, providerAddress, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.providerCheckAuth = async (req, res, next) => {
  // check user authorization
  const { providerAddress } = req;
  const passPhrase = req.phrase;
  const response = await subscrypt.providerCheckAuth(providerAddress, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
exports.userCheckAuth = async (req, res, next) => {
  // check user authorization
  const { username } = req;
  const passPhrase = req.phrase;
  const response = await subscrypt.checkAuth(username, passPhrase);
  const arr = refactorRes(response);
  res.status(arr[0]).json(arr[1]);
};
