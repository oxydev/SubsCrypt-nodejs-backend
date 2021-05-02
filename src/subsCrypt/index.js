const subscrypt = require('subscrypt');
const errors = require('../errors');

const refactorRes = (response) => {
    const status = response.status === 'Fetched' ? 200 : 'NotConnected' ? 427 : 400;
    const {result} = response;
    return [status, result];
};


/**
 * @function - A CallView function, And It's For Checking Subscription
 * @param args - Arguments Of checkSubscription Function
 * @param {string} user - Address Of User
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 {
  "status": "Fetched",
  "result": false
}
 */
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


/**
 check if subscrypt contract is connected or not
 */
exports.isConnected = async (req, res, next) => {
  console.log(await subscrypt.isConnected());
  res.status(200);
};


/**
 * @function - A CallView function, And It's For Checking Subscription
 * @param args - Arguments Of checkSubscriptionWithUsername Function
 * @param {string} username - Username
 * @param {string} providerAddress - Address of Provider
 * @param {number} phrase - plan_index
 * @returns {Promise<*>} - It's An async Function, And It Waits There To Return The Result Of The Transaction
 {
  "status": "Fetched",
  "result": false
}
 */
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


/**
 * @function - A CallView function, And It's For Retrieving Data With Password
 * @param args - Arguments Of retrieveDataWithUsername Function
 * @param {string} username - Username
 * @param {string} providerAddress - Address of Provider
 * @param {string} phrase - password
 {
  "status": "Fetched",
  "result": [
    {
      "provider": "5Dyu5YxLufavjPg8vP31BhKs5xz8ncdkQcNdGwf5XtW4C9Ym",
      "plan": {
        "duration": "40,000,000",
        "active_session_limit": "1",
        "price": "2,000",
        "max_refund_permille_policy": "200",
        "disabled": false
      },
      "plan_index": "1",
      "subscription_time": "1,619,631,732,000",
      "meta_data_encrypted": "shit",
      "refunded": false
    }
  ]
}
 */
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


/**
 * @function - A CallView function, And It's For Getting Plan Data
 * @param args - Arguments Of getPlanData Function
 * @param {string} providerAddress - Address of Provider
 * @param {number} planIndex - plan_index
 *
 {
  "status": "Fetched",
  "result": {
  "duration": "20,000,000",
    "active_session_limit": "1",
    "price": "1,000",
    "max_refund_permille_policy": "100",
    "disabled": false
  }
}
 */
exports.getPlanData = async (req, res, next) => {
  providerAddress = req.query.providerAddress;
  planIndex = req.query.planIndex;
  resp = await subscrypt.getPlanData(providerAddress, planIndex);
  console.log(resp);
  const arr = refactorRes(resp);
  res.status(arr[0]).json(arr[1]);
};



/**
 * @function - A CallView function, And It's For Retrieving Whole Data With Password
 * @param args - Arguments Of retrieveWholeDataWithUsername Function
 * @param {string} username - Username
 * @param {string} phrase - password
 {
  "status": "Fetched",
  "result": [
    {
      "provider": "5Dyu5YxLufavjPg8vP31BhKs5xz8ncdkQcNdGwf5XtW4C9Ym",
      "plan": {
        "duration": "40,000,000",
        "active_session_limit": "1",
        "price": "2,000",
        "max_refund_permille_policy": "200",
        "disabled": false
      },
      "plan_index": "1",
      "subscription_time": "1,619,631,732,000",
      "meta_data_encrypted": "shit",
      "refunded": false
    }
  ]
}
 */
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


/**
 * @function - A CallView function, And It's For Checking Auth in SubsCrypt Dashboard
 * @param args - Arguments Of userCheckAuthWithUsername Function
 * @param {string} username - Username
 * @param {string} passPhrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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



/**
 * @function - A CallView function, And It's For Checking Auth in SubsCrypt Dashboard
 * @param args - Arguments Of providerCheckAuthWithUsername Function
 * @param {string} username - Username of provider
 * @param {string} phrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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


/**
 * @function - A CallView function, And It's For Checking Auth of users in different providers using user and pass
 * @param args - Arguments Of checkAuthWithUsername Function
 * @param {string} username - username of user
 * @param {string} providerAddress - Address of Provider
 * @param {string} passPhrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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


/**
 * @function - A CallView function, And It's For Checking Auth of users in different providers using wallet
 * @param args - Arguments Of checkAuth Function
 * @param {string} userAddress - Address Of User
 * @param {string} providerAddress - Address of Provider
 * @param {string} phrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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

/**
 * @function - A CallView function, And It's For Checking Auth in SubsCrypt Dashboard
 * @param args - Arguments Of providerCheckAuth Function
 * @param {string} providerAddress - Address Of Provider
 * @param {string} phrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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


/**
 * @function - A CallView function, And It's For Checking Auth in SubsCrypt Dashboard
 * @param args - Arguments Of userCheckAuth Function
 * @param {string} username - Address Of User
 * @param {string} phrase - pass_phrase
 {
  "status": "Fetched",
  "result": true
}
 */
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
