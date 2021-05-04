const subscrypt = require('@oxydev/subscrypt');
const errors = require('../errors');
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
  return [status, status === 200 ? result : response.status];
};

/**
 * Check if the given user has a valid active subscription in the given plan index.
 * @param {string} userAddress - Address Of User
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkSubscription(req, res, next) {
  try {
    console.log(req.query.user, req.query.providerAddress, req.query.planIndex);
    await subscrypt.checkSubscription(req.query.user, req.query.providerAddress, req.query.planIndex).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
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
async function checkSubscriptionWithUsername(req, res, next) {
  try {
    const { username } = req.params.username;
    const { providerAddress } = req.query.providerAddress;
    const { phrase } = req.query.phrase;
    await subscrypt.checkSubscriptionWithUsername(username, providerAddress, phrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * returns username of given address
 * @param {string} sender - Address of user
 * @returns {Promise<string|Failed>} - Result of request
 */
async function getUsernameByAddress(req, res, next) {
  try {
    const { address } = req.params.address;
    await subscrypt.getUsernameByAddress(address).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Retrieving Subscription Data to given provider With Password
 * @param {string} username - Username
 * @param {string} providerAddress - Address of Provider
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
async function retrieveDataWithUsername(req, res, next) {
  try {
    const { username } = req.query.username;
    const { providerAddress } = req.params.providerAddress;
    const { phrase } = req.query.phrase;
    await subscrypt.retrieveDataWithUsername(username, providerAddress, phrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Getting Plan Data of a provider
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 * @returns {Promise<PlanFetched|Failed>} - Return a plan data or error
 */
async function getPlanData(req, res, next) {
  try {
    const { providerAddress } = req.params;
    const { planIndex } = req.params;
    await subscrypt.getPlanData(providerAddress, planIndex).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Retrieving Whole Subscription Data With Password of SubsCrypt dashboard
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<SubscriptionFetched|Failed>} - Result of request
 */
async function retrieveWholeDataWithUsername(req, res, next) {
  try {
    const { username } = req.query.username;
    const { phrase } = req.query.phrase;
    await subscrypt.retrieveWholeDataWithUsername(username, phrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * if username is available or not
 * @param {string} username - username
 * @returns {Promise<boolean|Failed>} - Result of request
 */
async function isUsernameAvailable(req, res, next) {
  try {
    const { username } = req.params.username;
    await subscrypt.isUsernameAvailable(username).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of user for SubsCrypt Dashboard with username
 * @param {string} username - Username
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function userCheckAuthWithUsername(req, res, next) {
  try {
    const { username, passPhrase } = req.query;
    await subscrypt.userCheckAuthWithUsername(username, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of provider for SubsCrypt Dashboard with username
 * @param {string} providerUsername - Username of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function providerCheckAuthWithUsername(req, res, next) {
  try {
    const { username } = req.query.username;
    const { passPhrase } = req.query.phrase;
    await subscrypt.providerCheckAuthWithUsername(username, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of user for given provider with username
 * @param {string} username - Username
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkAuthWithUsername(req, res, next) {
  try {
    const { username } = req.query.username;
    const { providerAddress } = req.query.providerAddress;
    const { passPhrase } = req.query.passPhrase;
    await subscrypt.checkAuthWithUsername(username, providerAddress, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of user for given provider with wallet
 * @param {string} userAddress - Address of User
 * @param {string} providerAddress - Address of provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function checkAuth(req, res, next) {
  try {
    const { userAddress } = req.query.userAddress;
    const { providerAddress } = req.query.providerAddress;
    const { passPhrase } = req.query.phrase;
    await subscrypt.checkAuth(userAddress, providerAddress, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of provider for SubsCrypt Dashboard
 * @param {string} providerAddress - Address Of Provider
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function providerCheckAuth(req, res, next) {
  try {
    const { providerAddress } = req.query.providerAddress;
    const { passPhrase } = req.query.phrase;
    await subscrypt.providerCheckAuth(providerAddress, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

/**
 * Check password of user for SubsCrypt Dashboard
 * @param {string} userAddress - Address Of User
 * @param {string} password - password
 * @returns {Promise<BooleanResult|Failed>} - Result of request
 */
async function userCheckAuth(req, res, next) {
  try {
    const { username } = req.query.username;
    const { passPhrase } = req.query.phrase;
    await subscrypt.userCheckAuth(username, passPhrase).then((resp) => {
      const arr = refactorRes(resp);
      res.status(arr[0]).json(arr[1]);
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
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
