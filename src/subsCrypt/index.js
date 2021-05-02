const subscrypt = require('subscrypt');
const errors = require('../errors');

const refactorRes = (response) => {
    const status = response.status === 'Fetched' ? 200 : 'NotConnected' ? 427 : 400;
    const {result} = response;
    return [status, result];
};
exports.checkSubscription = async (req, res, next) => {
  // check subscription
  // (user: string, provider_address: string, plan_index: u128) -> boolean
  user = req.query.user;
  providerAddress = req.query.providerAddress;
  planIndex = req.query.planIndex;
  await subscrypt.checkSubscription(user, providerAddress, planIndex).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.isConnected = async (req, res, next) => {
  console.log(await subscrypt.isConnected());
  res.status(200);
};

exports.checkSubscriptionWithUsername = async (req, res, next) => {
  username = req.query.username;
  providerAddress = req.query.providerAddress;
  phrase = req.query.phrase;
  await subscrypt.checkSubscriptionWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.getUsernameByAddress = async (req, res, next) => {
  await subscrypt.getUsernameByAddress().then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.retrieveDataWithUsername = async (req, res, next) => {
  username = req.query.username;
  providerAddress = req.query.providerAddress;
  phrase = req.query.phrase;
  await subscrypt.retrieveDataWithUsername(username, providerAddress, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.getPlanData = async (req, res, next) => {
  providerAddress = req.query.providerAddress;
  planIndex = req.query.planIndex;
  resp = await subscrypt.getPlanData(providerAddress, planIndex);
  console.log(resp);
  const arr = refactorRes(resp);
  res.status(arr[0]).json(arr[1]);
};

exports.retrieveWholeDataWithUsername = async (req, res, next) => {
  username = req.query.username;
  phrase = req.query.phrase;
  await subscrypt.retrieveWholeDataWithUsername(username, phrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.isUsernameAvailable = async (req, res, next) => {
  username = req.query.username;
  await subscrypt.isUsernameAvailable(username).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.userCheckAuthWithUsername = async (req, res, next) => {
  username  = req.query.username;
  passPhrase  = req.query.passPhrase;
  await subscrypt.userCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.providerCheckAuthWithUsername = async (req, res, next) => {
  username = req.query.username;
  passPhrase = req.query.phrase;
  await subscrypt.providerCheckAuthWithUsername(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.checkAuthWithUsername = async (req, res, next) => {
  username = req.query.username;
  providerAddress = req.query.providerAddress;
  passPhrase = req.query.passPhrase;
  await subscrypt.checkAuthWithUsername(username, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.checkAuth = async (req, res, next) => {
  // check user authorization
  userAddress = req.query.userAddress;
  providerAddress = req.query.providerAddress;
  passPhrase = req.query.phrase;
  await subscrypt.checkAuth(userAddress, providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.providerCheckAuth = async (req, res, next) => {
  // check user authorization
  providerAddress = req.query.providerAddress;
  passPhrase = req.query.phrase;
  await subscrypt.providerCheckAuth(providerAddress, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};

exports.userCheckAuth = async (req, res, next) => {
  // check user authorization
  username = req.query.username;
  passPhrase = req.query.phrase;
  await subscrypt.userCheckAuth(username, passPhrase).then((resp) => {
    const arr = refactorRes(resp);
    res.status(arr[0]).json(arr[1]);
  }).catch((err) => {
    res.status(500);
  });
};
