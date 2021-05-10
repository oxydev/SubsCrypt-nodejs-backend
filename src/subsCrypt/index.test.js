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

    let isResObject = (res) => isResExpected(res, testMetaData.SUCCESS_STATUS)

    let isResSuccess = (res) => {
        expect(res.body.message).to.equal(testMetaData.SUCCESS_STATUS);
    }

    let getQuery = (userAddress, phrase, providerAddress) => {
        return {userAddress, phrase, providerAddress}
    }

    getItWithTimeout('should be Connected', async () => {
        await getResult(routes.isConnected, 200)
    })

    describe('Check User Authentication', (done) => {
        getItWithTimeout('should Authenticate User Address With Password', async () => {
            let query = getQuery(testMetaData.userAddress, testMetaData.passWord)
            let result = await getResult(routes.userCheckAuth, 200, query)
            isResObject(result)
            isResSuccess(result)
            done();
        })

        getItWithTimeout('should Authenticate Username With Password', async () => {
            let newUrl = replaceLast('username', testMetaData.username, routes.userCheckAuthWithUsername)
            let query = {passPhrase: testMetaData.passWord};
            let result = await getResult(newUrl, 200, query)
            isResObject(result)
            isResSuccess(result)
            done();
        })
    })

    describe('Check Getting The Data Of The User', (done) => {
        getItWithTimeout('should Retrieve Whole Data', async () => {
            let query = getQuery(testMetaData.username, testMetaData.passWord)
            let result = await getResult(routes.retrieveWholeDataWithUsername, 200, query)
            isResObject(result)
            userWholeData = result.body.message;
            done();
        })

        getItWithTimeout('should Retrieve Data', async () => {
            let route = replaceLast('providerAddress', userWholeData[0].provider, routes.retrieveDataWithUsername)
            let query = getQuery(testMetaData.username, testMetaData.passWord)
            let result = await getResult(route, 200, query)
            let expectedResult = userWholeData.filter(value => value.provider === userWholeData[0].provider)
            isResObject(result)
            isResExpected(result, expectedResult)
        })
    })

    describe('Check Checking Auth Of User & Its Providers', () => {
        getItWithTimeout('should CheckAuth Using User Address', async () => {
            for (let userWholeDatum of userWholeData) {
                let query = getQuery(userAddress, passWord, userWholeDatum.provider)
                let result = getResult(routes.checkAuth, 200, query)
                isResObject(result)
                isResSuccess(result)
            }
        })

        getItWithTimeout('should CheckAuth Using User Name', async () => {
            for (let userWholeDatum of userWholeData) {
                let route = replaceLast('username', username, routes.userCheckAuthWithUsername)
                let query = {providerAddress: userWholeDatum.provider, passPhrase: passWord}
                let result = await getResult(route, 200, query)
                isResSuccess(result)
            }
        })
    })


})
