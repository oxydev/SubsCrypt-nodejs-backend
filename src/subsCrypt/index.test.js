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
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });
  });
});

const { testMetaData, config } = require('@oxydev/subscrypt');
const { routes } = require('./router');

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
    // todo
    // Init Timeout
    // Init Contract Address
    config.address = testMetaData.contractAddress;
  });

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
    it(name, func).timeout(testMetaData.REQUEST_TIMEOUT * 3);
  };

  const getResult = async (route, status, query) => {
    const res = await chai.request(server)
      .get(MAIN_ROUTE + route)
      .query(query);
    expect(res).to.have.status(status);
    return res;
  };

  const isResExpected = (res, object) => {
    expect(res.body).to.deep.equal(object);
  };

  const isResObject = (res) => {
    expect(res.body).to.be.an('object');
  };

  const isResSuccess = (res) => {
    expect(res.body.message).to.equal(testMetaData.SUCCESS_STATUS);
  };

  const getQuery = (username, userAddress, phrase, providerAddress, planIndex) => ({
    username, userAddress, phrase, providerAddress, planIndex,
  });

  getItWithTimeout('should be Connected', async () => {
    await getResult(routes.isConnected, responseCodes.success);
  });

  describe('Check UserName And UserAddress Validity', () => {
    getItWithTimeout('should User Be Available', async () => {
      const route = replaceLast(paramsNames.username, testMetaData.username, routes.isUsernameAvailable);
      const query = {};
      const result = await getResult(route, responseCodes.success, query);
      isResExpected(result, false);
    });

    // getItWithTimeout('should The Address Be For The User', async (done) => {
    //   const route = replaceLast(paramsNames.userAddress, testMetaData.username, routes.getUsername);
    //   const query = {};
    //   const result = await getResult(route, responseCodes.success, query);
    //   isResObject(result);
    //   isResExpected(result, testMetaData.username);
    //   done();
    // });
  });

  describe('Check User Authentication', () => {
    getItWithTimeout('should Authenticate User Address With Password', async () => {
      const query = getQuery(null, testMetaData.userAddress, testMetaData.passWord);
      const result = await getResult(routes.userCheckAuth, responseCodes.success, query);
      isResExpected(result, true);
    });

    getItWithTimeout('should Authenticate Username With Password', async () => {
      const newUrl = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername);
      const query = getQuery(null, null, testMetaData.passWord);
      const result = await getResult(newUrl, responseCodes.success, query);
      isResExpected(result, true);
    });
  });

  describe('Check Getting The Data Of The User', () => {
    getItWithTimeout('should Retrieve Whole Data', async () => {
      const query = getQuery(testMetaData.username, null, testMetaData.passWord);
      const result = await getResult(routes.retrieveWholeDataWithUsername, responseCodes.success, query);

      userWholeData = result.body;
    });

    getItWithTimeout('should Retrieve Data', async () => {
      const route = replaceLast(paramsNames.providerAddress, userWholeData[0].provider, routes.retrieveDataWithUsername);
      const query = getQuery(testMetaData.username, null, testMetaData.passWord);
      const result = await getResult(route, responseCodes.success, query);
      const expectedResult = userWholeData.filter((value) => value.provider === userWholeData[0].provider);
      isResExpected(result, expectedResult);
    });
  });

  describe('Check Checking Auth Of User & Its Providers', () => {
    getItWithTimeout('should CheckAuth Using User Address', async () => {
      for (const userWholeDatum of userWholeData) {
        const query = getQuery(null, testMetaData.userAddress, testMetaData.passWord, userWholeDatum.provider);
        const result = await getResult(routes.checkAuth, responseCodes.success, query);
        isResExpected(result, true);
      }
    });

    getItWithTimeout('should CheckAuth Using User Name', async () => {
      for (const userWholeDatum of userWholeData) {
        const route = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername);
        const query = getQuery(null, null, testMetaData.passWord, userWholeDatum.provider);
        const result = await getResult(route, responseCodes.success, query);
        isResSuccess(result);
      }
    });
  });

  describe('Check Auth Of Provider', () => {
    getItWithTimeout('should CheckAuth Using Provider Address', async () => {
      const query = getQuery(null, passWord, userAddress);
      const result = await getResult(routes.providerCheckAuth, responseCodes.success, query);
      isResSuccess(result);
    });

    getItWithTimeout('should CheckAuth Using Provider Username', async () => {
      const route = replaceLast(paramsNames.username, username, routes.providerCheckAuthWithUsername);
      const query = getQuery(null, passWord, null);
      const result = await getResult(route, responseCodes.success, query);
      isResSuccess(result);
    });
  });

  describe('Check Subscription Functions', () => {
    getItWithTimeout('should Check Subscriptions With User Address', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const query = getQuery(userAddress, null, userWholeDatum.provider, index);
        const result = await getResult(routes.checkSubscription, responseCodes.success, query);
        isResSuccess(result);
      }
    });

    getItWithTimeout('should Check Subscriptions With User Name', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const route = replaceLast(paramsNames.username, username, routes.checkSubscriptionWithUsername);
        const query = getQuery(null, null, userWholeDatum.provider, index);
        const result = await getResult(route, responseCodes.success, query);
        isResSuccess(result);
      }
    });
  });

  describe('Check Getting Plan Data Funcs', () => {
    const planDataWithIndex0 = {
      duration: '20,000,000',
      active_session_limit: '1',
      price: '1,000',
      max_refund_permille_policy: '100',
      disabled: false,
    };
    const planCharacteristicWithIndex0 = '';

    getItWithTimeout('should Get Plan Data', async () => {
      let route = replaceLast(paramsNames.providerAddress, userAddress, routes.getPlanData);
      route = replaceLast(paramsNames.planIndex, '0', route);
      const query = {};
      const result = await getResult(route, responseCodes.success, query);
      isResSuccess(result);
      isResExpected(result, planDataWithIndex0);
    });

    getItWithTimeout('should Get Plan Characteristic', async () => {
      let route = replaceLast(paramsNames.providerAddress, userAddress, routes.getPlanCharacteristics);
      route = replaceLast(paramsNames.planIndex, '0', route);
      const query = {};
      const result = await getResult(route, responseCodes.success, query);
      isResSuccess(result);
      isResExpected(result, planCharacteristicWithIndex0);
      assert.deepEqual(result.result, planCharacteristicWithIndex0);
    });
  });
});
