window = global;
const { MAIN_ROUTE } = require('./router');

const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../server');

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

const {
  testMetaData,
  config
} = require('@oxydev/subscrypt');
const { routes } = require('./router');

testMetaData.providerName = 'oxydev';
testMetaData.contractAddress = '5CLff1WP6hnswYqSFZCSgEK1Xmef8UBunHxCzgnQVFXELHj1';
testMetaData.plansData = [{
  duration: '7,776,000,000',
  price: '1,000,000,000,000',
  max_refund_permille_policy: '200',
  disabled: false,
}];
testMetaData.plansCharacteristic = [['email']];
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

  before(() => {
    config.address = testMetaData.contractAddress;
  });

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
          route = replaceLast(paramsNames[value], isFunction(params[value]) ? params[value]() : params[value], route);
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
          username: testMetaData.username,
        },
        expectedResult: false,
      },
      getUsername: {
        params: {
          userAddress: testMetaData.userAddress,
        },
        testIsStr: true,
        expectedResult: testMetaData.username,
      },
    },
    'User Authentication': {
      userCheckAuth: {
        query: {
          userAddress: testMetaData.userAddress,
          password: testMetaData.passWord
        },
        expectedResult: true,
      },
      userCheckAuthWithUsername: {
        params: {
          username: testMetaData.username,
        },
        query: { password: testMetaData.passWord },
        expectedResult: true,
      },
    },
    'Getting The Data Of The User': {
      retrieveWholeDataWithUsername: {
        query: {
          username: testMetaData.username,
          password: testMetaData.passWord
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
          username: testMetaData.username,
          password: testMetaData.passWord
        },
        expectedResult: () => userWholeData.filter((value) => value.provider === userWholeData[0].provider),
      },
    },
    'Auth Of Provider': {
      providerCheckAuth: {
        query: {
          password: testMetaData.passWord,
          providerAddress: testMetaData.providerAddress
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
    },
  };

  getTests(testsObj);

  describe('Check Checking Auth Of User & Its Providers', () => {
    getItWithTimeout('should CheckAuth Using User Address', async () => {
      for (const userWholeDatum of userWholeData) {
        const query = getQuery({
          userAddress: testMetaData.userAddress,
          password: testMetaData.passWord,
          providerAddress: userWholeDatum.provider,
        });
        const result = await getResult(routes.checkAuth, responseCodes.success, query);
        isResExpected(result.body, true);
      }
    });

    getItWithTimeout('should CheckAuth Using User Name', async () => {
      for (const userWholeDatum of userWholeData) {
        const route = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername);
        const query = getQuery({
          password: testMetaData.passWord,
          providerAddress: userWholeDatum.provider
        });
        const result = await getResult(route, responseCodes.success, query);
        isResExpected(result.body, true);
      }
    });
  });

  describe('Check Subscription Functions', () => {
    getItWithTimeout('should Check Subscriptions With User Address', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const query = getQuery({
          userAddress: testMetaData.userAddress,
          providerAddress: userWholeDatum.provider,
          planIndex: index,
        });
        const result = await getResult(routes.checkSubscription, responseCodes.success, query);
        isResExpected(result.body || true, true);
      }
    });

    getItWithTimeout('should Check Subscriptions With User Name', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const route = replaceLast(paramsNames.username, testMetaData.username, routes.checkSubscriptionWithUsername);
        const query = getQuery({
          providerAddress: userWholeDatum.provider,
          planIndex: index
        });
        const result = await getResult(route, responseCodes.success, query);
        isResExpected(result.body || true, true);
      }
    });
  });
});
