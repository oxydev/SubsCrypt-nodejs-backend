window = global;
const {MAIN_ROUTE} = require("./router");

const chai = require('chai');

const {expect} = chai;
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

const {testMetaData, config} = require('@oxydev/subscrypt')
const {routes} = require('./router')

const paramsNames = {
    userAddress: 'address',
    username: 'username',
    providerAddress: 'providerAddress',
    planIndex: 'planIndex'
}
const responseCodes = {
    success: 200
}
describe('Getting Data Test', () => {
    let userWholeData;

    before(() => {
        //todo
        // Init Timeout
        // Init Contract Address
        config.address = testMetaData.contractAddress;
    })

    let replaceLast = (find, replace, string) => {
        var lastIndex = string.lastIndexOf(find);

        if (lastIndex === -1) {
            return string;
        }

        var beginString = string.substring(0, lastIndex);
        var endString = string.substring(lastIndex + find.length);

        return beginString + replace + endString;
    }

    let getItWithTimeout = (name, func) => {
        it(name, func).timeout(testMetaData.REQUEST_TIMEOUT);
    }

    let getResult = async (route, status, query) => {
        let res = await chai.request(server)
            .get(MAIN_ROUTE + routes.isConnected)
            .query(query)
        expect(res).to.have.status(status)
        return res;
    }

    let isResExpected = (res, object) => {
        expect(res.body.message).to.equal(object);
    }

    let isResObject = (res) => {
        expect(res.body).to.be.an('object');
    }

    let isResSuccess = (res) => isResExpected(res, testMetaData.SUCCESS_STATUS)

    let getQuery = (userAddress, phrase, providerAddress, planIndex) => {
        return {userAddress, phrase, providerAddress, planIndex}
    }

    getItWithTimeout('should be Connected', async () => {
        await getResult(routes.isConnected, responseCodes.success)
    })

    describe('Check UserName And UserAddress Validity', () => {
        getItWithTimeout('should User Be Available', async (done) => {
            let route = replaceLast(paramsNames.username, username, routes.isUsernameAvailable)
            let query = {}
            let result = await getResult(route, responseCodes.success, query)
            isResSuccess(result)
            done();
        });

        getItWithTimeout('should The Address Be For The User', async (done) => {
            let route = replaceLast(paramsNames.userAddress, username, routes.getUsername)
            let query = {}
            let result = await getResult(route, responseCodes.success, query)
            isResSuccess(result)
            isResExpected(result, username)
            done();
        });
    })

    describe('Check User Authentication', (done) => {
        getItWithTimeout('should Authenticate User Address With Password', async () => {
            let query = getQuery(testMetaData.userAddress, testMetaData.passWord)
            let result = await getResult(routes.userCheckAuth, responseCodes.success, query)
            isResObject(result)
            isResSuccess(result)
            done();
        })

        getItWithTimeout('should Authenticate Username With Password', async () => {
            let newUrl = replaceLast(paramsNames.username, testMetaData.username, routes.userCheckAuthWithUsername)
            let query = getQuery(null, passWord)
            let result = await getResult(newUrl, responseCodes.success, query)
            isResObject(result)
            isResSuccess(result)
            done();
        })
    })

    describe('Check Getting The Data Of The User', (done) => {
        getItWithTimeout('should Retrieve Whole Data', async () => {
            let query = getQuery(testMetaData.username, testMetaData.passWord)
            let result = await getResult(routes.retrieveWholeDataWithUsername, responseCodes.success, query)
            isResObject(result)
            userWholeData = result.body.message;
            done();
        })

        getItWithTimeout('should Retrieve Data', async () => {
            let route = replaceLast(paramsNames.providerAddress, userWholeData[0].provider, routes.retrieveDataWithUsername)
            let query = getQuery(testMetaData.username, testMetaData.passWord)
            let result = await getResult(route, responseCodes.success, query)
            let expectedResult = userWholeData.filter(value => value.provider === userWholeData[0].provider)
            isResObject(result)
            isResExpected(result, expectedResult)
        })
    })

    describe('Check Checking Auth Of User & Its Providers', () => {
        getItWithTimeout('should CheckAuth Using User Address', async () => {
            for (let userWholeDatum of userWholeData) {
                let query = getQuery(userAddress, passWord, userWholeDatum.provider)
                let result = getResult(routes.checkAuth, responseCodes.success, query)
                isResObject(result)
                isResSuccess(result)
            }
        })

        getItWithTimeout('should CheckAuth Using User Name', async () => {
            for (let userWholeDatum of userWholeData) {
                let route = replaceLast(paramsNames.username, username, routes.userCheckAuthWithUsername)
                let query = getQuery(null, passWord, userWholeDatum.provider)
                let result = await getResult(route, responseCodes.success, query)
                isResSuccess(result)
            }
        })
    })

    describe('Check Auth Of Provider', () => {
        getItWithTimeout('should CheckAuth Using Provider Address', async () => {
            let query = getQuery(null, passWord, userAddress)
            let result = await getResult(routes.providerCheckAuth, responseCodes.success, query)
            isResSuccess(result)
        })

        getItWithTimeout('should CheckAuth Using Provider Username', async function () {
            let route = replaceLast(paramsNames.username, username, routes.providerCheckAuthWithUsername)
            let query = getQuery(null, passWord, null)
            let result = await getResult(route, responseCodes.success, query)
            isResSuccess(result)
        })
    })

    describe('Check Subscription Functions', () => {
        getItWithTimeout('should Check Subscriptions With User Address', async () => {
            for (let [index, userWholeDatum] of userWholeData.entries()) {
                let query = getQuery(userAddress, null, userWholeDatum.provider, index)
                let result = await getResult(routes.checkSubscription, responseCodes.success, query)
                isResSuccess(result)
            }
        })

        getItWithTimeout('should Check Subscriptions With User Name', async () => {
            for (let [index, userWholeDatum] of userWholeData.entries()) {
                let route = replaceLast(paramsNames.username, username, routes.checkSubscriptionWithUsername)
                let query = getQuery(null, null, userWholeDatum.provider, index)
                let result = await getResult(route, responseCodes.success, query)
                isResSuccess(result)
            }
        })
    })

    describe('Check Getting Plan Data Funcs', () => {
        let planDataWithIndex0 = {
            "duration": "20,000,000",
            "active_session_limit": "1",
            "price": "1,000",
            "max_refund_permille_policy": "100",
            "disabled": false
        }
        let planCharacteristicWithIndex0 = '';

        getItWithTimeout('should Get Plan Data', async () => {
            let route = replaceLast(paramsNames.providerAddress, userAddress, routes.getPlanData)
            route = replaceLast(paramsNames.planIndex, '0', route)
            let query = {}
            let result = await getResult(route, responseCodes.success, query)
            isResSuccess(result)
            isResExpected(result, planDataWithIndex0)
        })

        getItWithTimeout('should Get Plan Characteristic', async () => {
            let route = replaceLast(paramsNames.providerAddress, userAddress, routes.getPlanCharacteristics)
            route = replaceLast(paramsNames.planIndex, '0', route)
            let query = {}
            let result = await getResult(route, responseCodes.success, query)
            isResSuccess(result)
            isResExpected(result, planCharacteristicWithIndex0)
            assert.deepEqual(result.result, planCharacteristicWithIndex0)
        })
    })
})
