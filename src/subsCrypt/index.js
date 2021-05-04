const subscrypt = require('@oxydev/subscrypt');

/**
 * @typedef PlanFetched
 * @property {string} status Status of request("Fetched") in this case
 * @property {PlanConst} result Plan Const data
 */

/**
 * @typedef CharacteristicsFetched
 * @property {string} status Status of request("Fetched") in this case
 * @property {string[]} characteristics keys of characteristics mapping of plan
 */

/**
 * @typedef HashResult
 * @property {string} status Status of request("Fetched") in this case
 * @property {string} result Hash of given string
 */

/**
 * @typedef SubscriptionFetched
 * @property {string} status Status of request("Fetched") in this case
 * @property {SubscriptionRecord[]} result Array of SubscriptionRecords
 */

const refactorRes = (response) => {
  const status = response.status === 'Fetched' ? 200 : 500;
  const { result } = response;
  return [status, result];
};

/**
 * Check if the given user has a valid active subscription in the given plan index.
 * @param {string} userAddress - Address Of User
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkSubscription(req, res) {
  const { user } = req.query.user;
  const { providerAddress } = req.query.providerAddress;
  const { planIndex } = req.query.planIndex;
  await subscrypt.checkSubscription(user, providerAddress, planIndex).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * check if subscrypt contract is connected or not
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function isConnected(req, res) {
  res.status(200).json(await subscrypt.isConnected());
}

/**
 * Check if the given user has a valid active subscription in the given plan index.
 * @param {string} username- Username
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkSubscriptionWithUsername(req, res) {
  const { username } = req.params.username;
  const { providerAddress } = req.query.providerAddress;
  const { phrase } = req.query.phrase;
  await subscrypt.checkSubscriptionWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * returns username of given address
 * @param {string} sender - Address of user
 * @returns {Promise<string|Failed>} - Result of request
 */
async function getUsernameByAddress(req, res) {
  const { address } = req.params.address;
  await subscrypt.getUsernameByAddress(address).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Retrieving Subscription Data to given provider With Password
 * @param {string} username - Username
 * @param {string} providerAddress - Address of Provider
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
async function retrieveDataWithUsername(req, res) {
  const { username } = req.query.username;
  const { providerAddress } = req.params.providerAddress;
  const { phrase } = req.query.phrase;
  await subscrypt.retrieveDataWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Getting Plan Data of a provider
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<PlanFetched|Failed>} - Return a plan data or error
 */
async function getPlanData(req, res) {
  const { providerAddress } = req.params;
  const { planIndex } = req.params;
  await subscrypt.getPlanData(providerAddress, planIndex).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Retrieving Whole Subscription Data With Password of SubsCrypt dashboard
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
async function retrieveWholeDataWithUsername(req, res) {
  const { username } = req.query.username;
  const { phrase } = req.query.phrase;
  await subscrypt.retrieveWholeDataWithUsername(username, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * if username is available or not
 * @param {string} username - username
 * @returns {Promise<boolean|Failed>} - Result of request
 */
async function isUsernameAvailable(req, res) {
  const { username } = req.params.username;
  await subscrypt.isUsernameAvailable(username).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of user for SubsCrypt Dashboard with username
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function userCheckAuthWithUsername(req, res) {
  const { username, passPhrase } = req.query;
  await subscrypt.userCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of provider for SubsCrypt Dashboard with username
 * @param {string} providerUsername - Username of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function providerCheckAuthWithUsername(req, res) {
  const { username } = req.query.username;
  const { passPhrase } = req.query.phrase;
  await subscrypt.providerCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of user for given provider with username
 * @param {string} username - Username
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkAuthWithUsername(req, res) {
  const { username } = req.query.username;
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.passPhrase;
  await subscrypt.checkAuthWithUsername(username, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of user for given provider with wallet
 * @param {string} userAddress - Address of User
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkAuth(req, res) {
  const { userAddress } = req.query.userAddress;
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.phrase;
  await subscrypt.checkAuth(userAddress, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of provider for SubsCrypt Dashboard
 * @param {string} providerAddress - Address Of Provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function providerCheckAuth(req, res) {
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.phrase;
  await subscrypt.providerCheckAuth(providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

/**
 * Check password of user for SubsCrypt Dashboard
 * @param {string} userAddress - Address Of User
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function userCheckAuth(req, res) {
  const { username } = req.query.username;
  const { passPhrase } = req.query.phrase;
  await subscrypt.userCheckAuth(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
}

module.exports = {
  userCheckAuth,
  userCheckAuthWithUsername,
  providerCheckAuthWithUsername,
  providerCheckAuth,
  checkAuth,
  checkSubscription,
  checkAuthWithUsername,
  checkSubscriptionWithUsername,
  isConnected,
  isUsernameAvailable,
  getUsernameByAddress,
  retrieveDataWithUsername,
  retrieveWholeDataWithUsername,
  getPlanData,
};
