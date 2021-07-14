const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');
const errors = require('../errors');

const refactorRes = (response) => {
  const status = response.status === 'Fetched' ? 200 : 500;
  const { result } = response;
  return [status, status === 200 ? result : response.status];
};

async function checkSubscription(req, res, next) {
  try {
    await subscrypt.checkSubscription(req.query.userAddress, req.query.providerAddress,
      req.query.planIndex)
      .then((resp) => {
        const arr = refactorRes(resp);
        if (arr[0] === 200) {
          res.status(arr[0])
            .json(arr[1]);
        } else {
          next(errors.newHttpError(arr[0], arr[1]));
        }
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function isConnected(req, res, next) {
  res.setTimeout(5000, () => {
    next(errors.newHttpError(500, 'NotConnected'));
  });
  res.status(200)
    .json(await subscrypt.isConnected());
}

async function checkSubscriptionWithUsername(req, res, next) {
  try {
    await subscrypt.checkSubscriptionWithUsername(req.params.username,
      req.query.providerAddress, req.query.planIndex)
      .then((resp) => {
        const arr = refactorRes(resp);
        if (arr[0] === 200) {
          res.status(arr[0])
            .json(arr[1]);
        } else {
          next(errors.newHttpError(arr[0], arr[1]));
        }
        // todo check if fix in next version of contract
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function getUsername(req, res, next) {
  try {
    await subscrypt.getUsername(req.params.address)
      .then((resp) => {
        const arr = refactorRes(resp);
        if (arr[0] === 200) {
          res.status(arr[0])
            .json(arr[1]);
        } else {
          res.status(200);
        }
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function retrieveDataWithUsername(req, res, next) {
  try {
    await subscrypt.retrieveDataWithUsername(req.query.username, req.params.providerAddress,
      req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function getPlanData(req, res, next) {
  try {
    await subscrypt.getPlanData(req.params.providerAddress, req.params.planIndex)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function getPlanLength(req, res, next) {
  try {
    await subscrypt.getPlanLength(req.params.providerAddress)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function getPlanCharacteristics(req, res, next) {
  try {
    await subscrypt.getPlanCharacteristics(req.params.providerAddress, req.params.planIndex)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function retrieveWholeDataWithUsername(req, res, next) {
  try {
    await subscrypt.retrieveWholeDataWithUsername(req.query.username, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function isUsernameAvailable(req, res, next) {
  try {
    await subscrypt.isUsernameAvailable(req.params.username)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function userCheckAuthWithUsername(req, res, next) {
  try {
    await subscrypt.userCheckAuthWithUsername(req.params.username, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function providerCheckAuthWithUsername(req, res, next) {
  try {
    await subscrypt.providerCheckAuthWithUsername(req.params.username, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function checkAuthWithUsername(req, res, next) {
  try {
    await subscrypt.checkAuthWithUsername(req.params.username, req.query.providerAddress,
      req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function getSha2(req, res, next) {
  try {
    await subscrypt.getSha2(req.query.string)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function checkAuth(req, res, next) {
  try {
    await subscrypt.checkAuth(req.query.userAddress, req.query.providerAddress, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function providerCheckAuth(req, res, next) {
  try {
    await subscrypt.providerCheckAuth(req.query.providerAddress, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch(() => {
        next(errors.newHttpError(404, 'Wrong Args'));
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}

async function userCheckAuth(req, res, next) {
  try {
    await subscrypt.userCheckAuth(req.query.userAddress, req.query.phrase)
      .then((resp) => {
        const arr = refactorRes(resp);
        res.status(arr[0])
          .json(arr[1]);
      })
      .catch((err) => {
        res.status(500)
          .json(err);
      });
  } catch {
    next(errors.newHttpError(404, 'Wrong Args'));
  }
}
// todo bad smell
async function getProviderData(req, res) {
  const json = {};
  try {
    const f2 = function (err, row) {
      if (row) {
        json.income = row.total_income;
        res.status(200)
          .json(json);
      } else {
        res.status(404)
          .json({ message: 'there is no such provider' });
      }
    };
    const f1 = function (err, rows) {
      json.userCount = rows[0].count;
      db.getProviderIncome(req.params.providerAddress, f2);
    };
    db.getUsersCount(req.params.providerAddress, f1);
  } catch (err) {
    res.status(500)
      .json(err);
  }
}

async function getProviderCustomIncome(req, res) {
  const json = {};
  const f3 = function (err, rows) {
    if (rows.length > 0) {
      let customTimeIncom = 0;
      rows.forEach((row) => {
        if (row.start_time > req.params.start && row.start_time < req.params.finish) {
          customTimeIncom += row.price;
        }
      });
      json.customTimeIncom = customTimeIncom;
      res.status(200)
        .json(json);
    } else {
      res.status(404)
        .json({ message: 'there is no such provider' });
    }
  };
  db.getProviderCustomIncome(req.params.providerAddress, f3);
}

async function getPlanIncome(req, res) {
  const json = {};
  try {
    const f2 = function (err, rows) {
      if (rows.length > 0) {
        let customTimeIncom = 0;
        rows.forEach((row) => {
          customTimeIncom += row.price;
        });
        json.income = customTimeIncom;
        res.status(200)
          .json(json);
      } else {
        res.status(404)
          .json({ message: 'there is no such provider or plan' });
      }
    };
    const f1 = function (err, rows) {
      json.userCount = rows[0].count;
      db.getPlanCustomIncome(req.params.providerAddress, req.params.planIndex, f2);
    };
    db.getPlanUsersCount(req.params.providerAddress, req.params.planIndex, f1);
  } catch (err) {
    res.status(500)
      .json(err);
  }
}

async function getPlanCustomIncome(req, res) {
  const json = {};
  const f3 = function (err, rows) {
    let customTimeIncom = 0;
    rows.forEach((row) => {
      if (row.start_time > req.params.start && row.start_time < req.params.finish) {
        customTimeIncom += row.price;
      }
    });
    json.customTimeIncom = customTimeIncom;
    res.status(200)
      .json(json);
  };
  db.getPlanCustomIncome(req.params.providerAddress, req.params.planIndex, f3);
}

async function getUsers(req, res) {
  await db.getUsers(req.params.providerAddress, res);
}

async function getUsersOfPlan(req, res) {
  await db.getUsersOfPlan(req.params.providerAddress, req.params.planIndex, res);
}

async function addUser(req, res) {
  await db.addUser(req.params.userAddress);
  res.status(200)
    .json('');
}

async function addProvider(req, res) {
  await db.addProvider(req.params.providerAddress);
  res.status(200)
    .json('');
}

async function addProduct(req, res) {
  await db.addProduct(req.params.providerAddress, req.params.planIndex);
  res.status(200)
    .json('');
}

async function addSubscription(req, res) {
  await db.addSubscription(
    req.params.userAddress,
    req.params.providerAddress,
    req.params.planIndex,
    req.params.startTime,
    req.params.duration,
    req.params.price,
  );
  res.status(200)
    .json('');
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
  getUsername,
  retrieveDataWithUsername,
  getSha2,
  retrieveWholeDataWithUsername,
  getPlanData,
  getPlanIncome,
  getPlanCharacteristics,
  getPlanLength,
  getProviderData,
  getProviderCustomIncome,
  getPlanCustomIncome,
  getUsers,
  getUsersOfPlan,
  addUser,
  addProvider,
  addProduct,
  addSubscription,
};
