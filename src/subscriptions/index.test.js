const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
const db = require('../databaseWrapper/database');

chai.use(chaiHttp);
describe('subscriptions tests', () => {
  beforeEach(async () => {
    await db.truncate();
  });

  it('it should GET all the users', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );

    let res = await chai.request(server)
      .get('/subscriptions/getUsers/ProviderAddress1');
    res.should.have.status(200);
    res.body.should.be.eql({
      subscriptions: [{
        plan_index: 0,
        start_time: 100,
        duration: 1000,
        provider_address: 'ProviderAddress1',
        user_address: 'user1',
        price: 10,
        characteristics: ['c1', 'c2'],
      }],
    });

    res = await chai.request(server)
      .get('/subscriptions/getUsers/ProviderAddress12');
    res.should.have.status(400);
  });

  it('it should GET all the users of the plan', async () => {
    await db.addPlan('ProviderAddress1',
      0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );

    let res = await chai.request(server)
      .get('/subscriptions/getUsers/ProviderAddress1/0');
    res.should.have.status(200);
    res.body.should.be.eql({
      subscriptions: [{
        plan_index: '0',
        start_time: 100,
        duration: 1000,
        provider_address: 'ProviderAddress1',
        user_address: 'user1',
        price: 10,
        characteristics: ['c1', 'c2'],
      }],
    });

    res = await chai.request(server)
      .get('/subscriptions/getUsers/ProviderAddress13/0');
    res.should.have.status(400);
  });

  it('it should GET Provider data', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );
    let res = await chai.request(server)
      .get('/subscriptions/getProviderData/ProviderAddress1');
    res.should.have.status(200);
    res.body.should.be.eql({
      income: 10,
      usersCount: 1,
    });

    res = await chai.request(server)
      .get('/subscriptions/getProviderData/ProviderAddress12');
    res.should.have.status(404);
  });

  it('it should check provider custom income', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );
    let res = await chai.request(server)
      .get('/subscriptions/getProviderCustomIncome/ProviderAddress1/99/105');
    res.should.have.status(200);
    res.body.should.be
      .eql({
        income: 10,
      });

    res = await chai.request(server)
      .get('/subscriptions/getProviderCustomIncome/ProviderAddress1/104/105');
    res.should.have.status(200);
    res.body.should.be
      .eql({
        income: 0,
      });

    res = await chai.request(server)
      .get('/subscriptions/getProviderCustomIncome/ProviderAddress231/104/105');
    res.should.have.status(404);
  });

  it('it should check getPlanIncome', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );
    let res = await chai.request(server)
      .get('/subscriptions/getPlanIncome/ProviderAddress1/0');
    res.should.have.status(200);
    res.body.should.be.eql({
      income: 10,
      userCount: 1,
    });
    res = await chai.request(server)
      .get('/subscriptions/getPlanIncome/ProviderAddress1/1');
    res.should.have.status(404);
    res.body.should.be
      .eql({ message: 'there is no such provider or plan' });
  });

  it('it should getPlanIncomeCustomIncome', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p1', 'des1');
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );
    let res = await chai.request(server)
      .get('/subscriptions/getPlanIncomeCustomIncome/ProviderAddress1/0/99/105');
    res.should.have.status(200);
    res.body.should.be
      .eql({
        income: 10,
      });

    res = await chai.request(server)
      .get('/subscriptions/getPlanIncomeCustomIncome/ProviderAddress1/0/101/105');
    res.should.have.status(200);
    res.body.should.be
      .eql({
        income: 0,
      });

    res = await chai.request(server)
      .get('/subscriptions/getPlanIncomeCustomIncome/ProviderAddress1/1/101/105');
    res.should.have.status(404);
  });
});
