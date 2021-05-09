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

    it('should ', function () {
        chai.request(server)
            .get(MAIN_ROUTE + routes.isConnected)
            .end(((err, res) => {
                expect(res).to.have.status(200)
            }))
    });

    describe('Check User Authentication', (done) => {
        it('should Authenticate User Address With Password', async function () {
            // let result = await subscryptDataGetter.userCheckAuth(userAddress, passWord);
            // assert.equal(result.status, SUCCESS_STATUS);
            chai.request(server)
                .get(MAIN_ROUTE + routes.userCheckAuth)
                .query({userAddress: testMetaData.userAddress, phrase: testMetaData.passWord})
                .end(((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal(testMetaData.SUCCESS_STATUS);
                    done();
                }))
        }).timeout(testMetaData.REQUEST_TIMEOUT);

        it('should Authenticate Username With Password', async function () {
            // let result = await subscryptDataGetter.userCheckAuthWithUsername(userName, passWord);
            // assert.equal(result.status, SUCCESS_STATUS);
            let newUrl = replaceLast('username', testMetaData.username, routes.userCheckAuthWithUsername)
            chai.request(server)
                .get(MAIN_ROUTE + newUrl)
                .query({passPhrase: testMetaData.passWord})
                .end(((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal(testMetaData.SUCCESS_STATUS);
                    done();
                }))
        }).timeout(testMetaData.REQUEST_TIMEOUT);
    })
})
