window = global;

const {
  testMetaData,
} = require('@oxydev/subscrypt');

const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../server');

const { MAIN_ROUTE } = require('./router');

chai.use(chaiHttp);
describe('Errors - IT', () => {
  describe('null route', () => {
    it('returns a 404 response', (done) => {
      chai.request(server)
        .get('/nonexistentroute')
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(404);
          expect(res.body)
            .to
            .be
            .an('object');
          expect(res.body.message)
            .to
            .equal('not found');
          done();
        });
    });
  });
});

const { routes } = require('./router');

testMetaData.providerAddress = '5E1CtWAkJAJ2HhNMeSwA4bYkWNWzYKSzvcTHNXP4WPZ75NZk';
testMetaData.subscriberAddress = '5DnTpgDUtZ5jiRi2iN1LXWUWDm7FjKnU6Px5EiWV24n5mE77';
testMetaData.providerName = 'uj37o';
testMetaData.subscriberUsername = 'r4yrl';
testMetaData.passWord = 'weten';
testMetaData.plansCharacteristic = [['plan0']];
testMetaData.plansData = [{
  duration: '86,400',
  price: '1,000,000,000,000',
  max_refund_permille_policy: '100',
  disabled: false,
},
{
  disabled: true,
  duration: '432,000',
  max_refund_permille_policy: '150',
  price: '10,000,000,000,000',
}];

const paramsNames = {
  userAddress: 'address',
  username: 'username',
  providerAddress: 'providerAddress',
  planIndex: 'planIndex',
};
const responseCodes = {
  success: 200,
};
describe('Getting Data Test', () => {
  let userWholeData;

  const isFunction = (functionToCheck) => functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

  const replaceLast = (find, replace, string) => {
    const lastIndex = string.lastIndexOf(find);
    if (lastIndex === -1) {
      return string;
    }

    const beginString = string.substring(0, lastIndex - 1);
    const endString = string.substring(lastIndex + find.length);

    return beginString + replace + endString;
  };

  const getItWithTimeout = (name, func) => {
    it(name, func)
      .timeout(testMetaData.REQUEST_TIMEOUT * 3);
  };

  const getResult = async (route, status, query) => {
    const res = await chai.request(server)
      .get(MAIN_ROUTE + route)
      .query(query);
    expect(res)
      .to
      .have
      .status(status);
    return res;
  };

  const isResExpected = (res, object) => {
    expect(res)
      .to
      .deep
      .equal(object);
  };

  const isResObject = (res) => {
    expect(res.body)
      .to
      .be
      .an('object');
  };

  const isResSuccess = (res) => {
    expect(res.body.message)
      .to
      .equal(testMetaData.SUCCESS_STATUS);
  };

  const isResString = (res, expected) => {
    expect(res.body)
      .to
      .equal(expected);
  };

  const getQuery = ({
    username = undefined,
    userAddress = undefined,
    password = undefined,
    providerAddress = undefined,
    planIndex = undefined,
  }) => {
    const query = {};
    if (username !== undefined) query.username = username;
    if (password !== undefined) query.phrase = password;
    if (userAddress !== undefined) query.userAddress = userAddress;
    if (providerAddress !== undefined) query.providerAddress = providerAddress;
    if (planIndex !== undefined) query.planIndex = planIndex;
    return query;
  };

  const routeWithParams = (route, params) => {
    if (params) {
      Object.keys(params)
        .forEach((value) => {
          route = replaceLast(paramsNames[value],
            isFunction(params[value]) ? params[value]() : params[value], route);
        });
    }
    return route;
  };
  const getItFunc = async (routeName, itObject) => {
    const route = routeWithParams(routes[routeName], itObject.params);
    const query = getQuery(itObject.query || {});
    const result = await getResult(route, itObject.responseCode || responseCodes.success, query);

    if (itObject.testIsObj) {
      isResObject(result);
    }
    if (itObject.testIsSuccess) {
      isResSuccess(result);
    }
    const expected = itObject.expectedResult;
    if (expected !== undefined && itObject.testIsStr === undefined) {
      isResExpected(result.body, isFunction(expected) ? expected() : expected);
    } else if (expected !== undefined) {
      isResString(result, expected);
    }
    if (isFunction(itObject.after)) {
      itObject.after(result);
    }
  };
  const getTests = (testsObj) => {
    Object.keys(testsObj)
      .forEach((describeTest) => {
        describe(`Check ${describeTest}`, () => {
          Object.keys(testsObj[describeTest])
            .forEach((itTest) => {
              getItWithTimeout(`${itTest} Test`, () => getItFunc(itTest, testsObj[describeTest][itTest]));
            });
        });
      });
  };

  const testsObj = {
    'is Connected': {
      isConnected: {},
    },
    'provider name And providerAddress Validity': {
      isUsernameAvailable: {
        params: {
          username: testMetaData.providerName,
        },
        expectedResult: false,
      },
      getUsername: {
        params: {
          userAddress: testMetaData.providerAddress,
        },
        testIsStr: true,
        expectedResult: testMetaData.providerName,
      },
    },
    'Username And UserAddress Validity': {
      isUsernameAvailable: {
        params: {
          username: testMetaData.subscriberUsername,
        },
        expectedResult: false,
      },
      getUsername: {
        params: {
          userAddress: testMetaData.subscriberAddress,
        },
        testIsStr: true,
        expectedResult: testMetaData.subscriberUsername,
      },
    },
    'User Authentication': {
      userCheckAuth: {
        query: {
          userAddress: testMetaData.subscriberAddress,
          password: testMetaData.passWord,
        },
        expectedResult: true,
      },
      userCheckAuthWithUsername: {
        params: {
          username: testMetaData.subscriberUsername,
        },
        query: { password: testMetaData.passWord },
        expectedResult: true,
      },
    },
    'Getting The Data Of The User': {
      retrieveWholeDataWithUsername: {
        query: {
          username: testMetaData.subscriberUsername,
          password: testMetaData.passWord,
        },
        after: (result) => {
          userWholeData = result.body;
        },
      },
      retrieveDataWithUsername: {
        params: {
          providerAddress: () => userWholeData[0].provider,
        },
        query: {
          username: testMetaData.subscriberUsername,
          password: testMetaData.passWord,
        },
        expectedResult:
          () => userWholeData.filter((value) => value.provider === userWholeData[0].provider),
      },
    },
    'Auth Of Provider': {
      providerCheckAuth: {
        query: {
          password: testMetaData.passWord,
          providerAddress: testMetaData.providerAddress,
        },
        expectedResult: true,
      },
      providerCheckAuthWithUsername: {
        params: {
          username: testMetaData.providerName,
        },
        query: { password: testMetaData.passWord },
        expectedResult: true,
      },
      getPlanData: {
        params: {
          providerAddress: testMetaData.providerAddress,
          planIndex: '1',
        },
        expectedResult: testMetaData.plansData[1],
      },
    },
    'Getting Plan Data Funcs': {
      getPlanLength: {
        params: {
          providerAddress: testMetaData.providerAddress,
        },
        expectedResult: testMetaData.plansData.length.toString(),
      },
      getPlanData: {
        params: {
          providerAddress: testMetaData.providerAddress,
          planIndex: '0',
        },
        expectedResult: testMetaData.plansData[0],
      },
      getPlanCharacteristics: {
        params: {
          providerAddress: testMetaData.providerAddress,
          planIndex: '0',
        },
        expectedResult: testMetaData.plansCharacteristic[0],
      },
      getWithdrawableAmount: {
        params: {
          providerAddress: testMetaData.providerAddress,
        },
        expectedResult: '100,000,000,000',
      },
      getMoneyAddress: {
        params: {
          providerAddress: testMetaData.providerAddress,
        },
        expectedResult: testMetaData.providerAddress,
      },
    },
  };

  getTests(testsObj);

  describe('Check Checking Auth Of User & Its Providers', () => {
    getItWithTimeout('should CheckAuth Using User Address', async () => {
      userWholeData.forEach((userWholeDatum) => {
        const query = getQuery({
          userAddress: testMetaData.subscriberAddress,
          password: testMetaData.passWord,
          providerAddress: userWholeDatum.provider,
        });
        getResult(routes.checkAuth, responseCodes.success, query)
          .then((result) => {
            isResExpected(result.body, true);
          });
      });
    });

    getItWithTimeout('should CheckAuth Using User Name', async () => {
      userWholeData.forEach((userWholeDatum) => {
        const route = replaceLast(
          paramsNames.username,
          testMetaData.subscriberUsername,
          routes.userCheckAuthWithUsername,
        );
        const query = getQuery({
          password: testMetaData.passWord,
          providerAddress: userWholeDatum.provider,
        });
        getResult(route, responseCodes.success, query)
          .then((result) => {
            isResExpected(result.body, true);
          });
      });
    });
  });

  describe('Check Subscription Functions', () => {
    getItWithTimeout('should Check Subscriptions With User Address', async () => {
      userWholeData.forEach((userWholeDatum, index) => {
        const query = getQuery({
          userAddress: testMetaData.subscriberAddress,
          providerAddress: userWholeDatum.provider,
          planIndex: index,
        });
        getResult(routes.checkSubscription, responseCodes.success, query)
          .then((result) => {
            isResExpected(result.body || true, true);
          });
      });
    });

    getItWithTimeout('should Check Subscriptions With User Name', async () => {
      userWholeData.forEach((userWholeDatum, index) => {
        const route = replaceLast(
          paramsNames.username,
          testMetaData.subscriberUsername,
          routes.checkSubscriptionWithUsername,
        );
        const query = getQuery({
          providerAddress: userWholeDatum.provider,
          planIndex: index,
        });
        getResult(route, responseCodes.success, query)
          .then((result) => {
            isResExpected(result.body || true, true);
          });
      });
    });
  });
});
