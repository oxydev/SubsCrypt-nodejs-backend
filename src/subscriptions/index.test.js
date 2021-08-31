const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
const db = require('../databaseWrapper/database');

describe('database tests', () => {
  beforeEach(async () => {
    await db.truncate();
  });

  it('it should GET all the users', async (done) => {
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );

    chai.request(server)
      .get('/getUsers/ProviderAddress1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('subscriptions').eql([{
          plan_index: 0,
          start_time: 100,
          duration: 1000,
          provider_address: 'ProviderAddress1',
          user_address: 'user1',
          price: 10,
          characteristics: ['c1', 'c2'],
        }]);
        done();
      });
  }).timeout(400000 * 3);
});
