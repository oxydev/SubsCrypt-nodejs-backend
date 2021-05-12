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

  const getQuery = ({username=null, userAddress=null, password=null, providerAddress=null, planIndex=null}) => ({
    username, userAddress, phrase: password, providerAddress, planIndex,
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
      const query = getQuery({userAddress: testMetaData.userAddress, password: testMetaData.passWord});
      const result = await getResult(routes.userCheckAuth, responseCodes.success, query);
      isResExpected(result, true);
    });

    getItWithTimeout('should Authenticate Username With Password', async () => {
      const newUrl = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername);
      const query = getQuery({password: testMetaData.passWord});
      const result = await getResult(newUrl, responseCodes.success, query);
      isResExpected(result, true);
    });
  });

  describe('Check Getting The Data Of The User', () => {
    getItWithTimeout('should Retrieve Whole Data', async () => {
      const query = getQuery({username: testMetaData.username, password: testMetaData.passWord});
      const result = await getResult(routes.retrieveWholeDataWithUsername, responseCodes.success, query);
      userWholeData = result.body;
    });

    getItWithTimeout('should Retrieve Data', async () => {
      const route = replaceLast(paramsNames.providerAddress, userWholeData[0].provider, routes.retrieveDataWithUsername);
      const query = getQuery({username: testMetaData.username, password: testMetaData.passWord});
      const result = await getResult(route, responseCodes.success, query);
      const expectedResult = userWholeData.filter((value) => value.provider === userWholeData[0].provider);
      isResExpected(result, expectedResult);
    });
  });

  describe('Check Checking Auth Of User & Its Providers', () => {
    getItWithTimeout('should CheckAuth Using User Address', async () => {
      for (const userWholeDatum of userWholeData) {
        const query = getQuery({userAddress: testMetaData.userAddress, password: testMetaData.passWord, providerAddress: userWholeDatum.provider});
        const result = await getResult(routes.checkAuth, responseCodes.success, query);
        isResExpected(result, true);
      }
    });

    getItWithTimeout('should CheckAuth Using User Name', async () => {
      for (const userWholeDatum of userWholeData) {
        const route = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername);
        const query = getQuery({password: testMetaData.passWord, providerAddress: userWholeDatum.provider});
        const result = await getResult(route, responseCodes.success, query);
        isResExpected(result, true);
      }
    });
  });

  describe('Check Auth Of Provider', () => {
    getItWithTimeout('should CheckAuth Using Provider Address', async () => {
      const query = getQuery({password: testMetaData.passWord, providerAddress: testMetaData.providerAddress});
      const result = await getResult(routes.providerCheckAuth, responseCodes.success, query);
      isResExpected(result, true)
    });

    getItWithTimeout('should CheckAuth Using Provider Username', async () => {
      const route = replaceLast(paramsNames.username, testMetaData.providerName, routes.providerCheckAuthWithUsername);
      const query = getQuery({password: testMetaData.passWord});
      const result = await getResult(route, responseCodes.success, query);
      isResExpected(result, true)
    });
  });

  describe('Check Subscription Functions', () => {
    getItWithTimeout('should Check Subscriptions With User Address', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const query = getQuery({userAddress: testMetaData.userAddress, providerAddress: userWholeDatum.provider, planIndex: index});
        const result = await getResult(routes.checkSubscription, responseCodes.success, query);
        isResExpected(result, false)
      }
    });

    getItWithTimeout('should Check Subscriptions With User Name', async () => {
      for (const [index, userWholeDatum] of userWholeData.entries()) {
        const route = replaceLast(paramsNames.username, testMetaData.username, routes.checkSubscriptionWithUsername);
        const query = getQuery({providerAddress: userWholeDatum.provider, planIndex: index});
        const result = await getResult(route, responseCodes.success, query);
        isResExpected(result, false)
      }
    });
  });

  describe('Check Getting Plan Data Funcs', () => {
    getItWithTimeout('should Get Plan Data', async () => {
      let route = replaceLast(paramsNames.providerAddress, testMetaData.providerAddress, routes.getPlanData);
      route = replaceLast(paramsNames.planIndex, '0', route);
      const query = {};
      const result = await getResult(route, responseCodes.success, query);
      isResExpected(result, testMetaData.planDataWithIndex0);
    });

    getItWithTimeout('should Get Plan Characteristic', async () => {
      let route = replaceLast(paramsNames.providerAddress, testMetaData.providerAddress, routes.getPlanCharacteristics);
      route = replaceLast(paramsNames.planIndex, '0', route);
      const query = {};
      const result = await getResult(route, responseCodes.success, query);
      isResExpected(result, testMetaData.planCharacteristicWithIndex0);
    });
  });
});
