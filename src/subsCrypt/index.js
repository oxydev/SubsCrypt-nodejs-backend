const subscrypt = require('@oxydev/subscrypt');

/**
 * @typedef PlanConst
 * @property {number} duration
 * @property {number} price
 * @property {number} max_refund_permille
 * @property {bool} disabled
 */

/**
 * @typedef SubscriptionRecord
 * @property {string} provider
 * @property {PlanConst} plan
 * @property {number} plan_index
 * @property {number} subscription_time
 * @property {string[]} characteristics_values_encrypted
 * @property {bool} refunded
 */

/**
 * @typedef Failed
 * @property {string} status Status of request("Failed") in this case
 * @property {*} result Debug Data
 */

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
 * @typedef BooleanResult
 * @property {string} status Status of request("Fetched") in this case
 * @property {bool} result
 */

/**
 * @typedef SubscriptionFetched
 * @property {string} status Status of request("Fetched") in this case
 * @property {SubscriptionRecord[]} result Array of SubscriptionRecords
 */

const refactorRes = (response) => {
  let status = 400;
  if (response.status === 'Fetched') status = 200;
  else if (response.status === 'NotConnected') status = 500;

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
exports.checkSubscription = async (req, res) => {
  const { user } = req.query.user;
  const { providerAddress } = req.query.providerAddress;
  const { planIndex } = req.query.planIndex;
  await subscrypt.checkSubscription(user, providerAddress, planIndex).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check if the given user has a valid active subscription in the given plan index.
 * @param {string} username- Username
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.checkSubscriptionWithUsername = async (req, res) => {
  const { username } = req.params.username;
  const { providerAddress } = req.query.providerAddress;
  const { phrase } = req.query.phrase;
  await subscrypt.checkSubscriptionWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * returns username of given address
 * @param {string} sender - Address of user
 * @returns {Promise<string|Failed>} - Result of request
 */
exports.getUsernameByAddress = async (req, res) => {
  const { address } = req.params.address;
  await subscrypt.getUsernameByAddress(address).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Retrieving Subscription Data to given provider With Password
 * @param {string} username - Username
 * @param {string} providerAddress - Address of Provider
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
exports.retrieveDataWithUsername = async (req, res) => {
  const { username } = req.query.username;
  const { providerAddress } = req.params.providerAddress;
  const { phrase } = req.query.phrase;
  await subscrypt.retrieveDataWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Getting Plan Data of a provider
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<PlanFetched|Failed>} - Return a plan data or error
 */
exports.getPlanData = async (req, res) => {
  const providerAddress  = req.params.providerAddress;
  const planIndex = req.params.planIndex;
  await subscrypt.getPlanData(providerAddress, planIndex).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Retrieving Whole Subscription Data With Password of SubsCrypt dashboard
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
exports.retrieveWholeDataWithUsername = async (req, res) => {
  const { username } = req.query.username;
  const { phrase } = req.query.phrase;
  await subscrypt.retrieveWholeDataWithUsername(username, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * if username is available or not
 * @param {string} username - username
 * @returns {Promise<boolean|Failed>} - Result of request
 */
exports.isUsernameAvailable = async (req, res) => {
  const { username } = req.params.username;
  await subscrypt.isUsernameAvailable(username).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check password of user for SubsCrypt Dashboard with username
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.userCheckAuthWithUsername = async (req, res) => {
  const { username, passPhrase } = req.query;
  await subscrypt.userCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check password of provider for SubsCrypt Dashboard with username
 * @param {string} providerUsername - Username of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.providerCheckAuthWithUsername = async (req, res) => {
  const { username } = req.query.username;
  const { passPhrase } = req.query.phrase;
  await subscrypt.providerCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check password of user for given provider with username
 * @param {string} username - Username
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.checkAuthWithUsername = async (req, res) => {
  const { username } = req.query.username;
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.passPhrase;
  await subscrypt.checkAuthWithUsername(username, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};


/**
 * Check password of user for given provider with wallet
 * @param {string} userAddress - Address of User
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.checkAuth = async (req, res) => {
  const { userAddress } = req.query.userAddress;
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.phrase;
  await subscrypt.checkAuth(userAddress, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check password of provider for SubsCrypt Dashboard
 * @param {string} providerAddress - Address Of Provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.providerCheckAuth = async (req, res) => {
  const { providerAddress } = req.query.providerAddress;
  const { passPhrase } = req.query.phrase;
  await subscrypt.providerCheckAuth(providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Check password of user for SubsCrypt Dashboard
 * @param {string} userAddress - Address Of User
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
exports.userCheckAuth = async (req, res) => {
  const { username } = req.query.username;
  const { passPhrase } = req.query.phrase;
  await subscrypt.userCheckAuth(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500).json(err);
  });
};
