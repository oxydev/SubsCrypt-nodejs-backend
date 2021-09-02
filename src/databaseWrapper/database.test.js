// import chai, { assert } from 'chai';
// import { where } from 'sequelize';
const chai = require('chai');

const { expect } = chai;
const db = require('./database');

describe('database tests', () => {
  beforeEach(async () => {
    await db.truncate();
  });

  async function createSubscription() {
    await db.addSubscription(
      'user1',
      'ProviderAddress1',
      0,
      100,
      1000,
      10,
      ['c1', 'c2'],
    );
    expect(await db.Plan.count())
      .to
      .equal(1);
    expect(await db.Provider.count())
      .to
      .equal(1);
    expect(await db.User.count())
      .to
      .equal(1);
    expect(await db.Subscription.count())
      .to
      .equal(1);
    expect(await db.getUsers('ProviderAddress1'))
      .to
      .deep
      .equal([{
        plan_index: 0,
        start_time: 100,
        duration: 1000,
        provider_address: 'ProviderAddress1',
        user_address: 'user1',
        price: 10,
        characteristics: ['c1', 'c2'],
      }]);
    expect(await db.getUsersOfPlan('ProviderAddress1', 0))
      .to
      .deep
      .equal([{
        plan_index: 0,
        start_time: 100,
        duration: 1000,
        provider_address: 'ProviderAddress1',
        user_address: 'user1',
        price: 10,
        characteristics: ['c1', 'c2'],
      }]);
  }

  it('should create a user', async () => {
    await db.addUser(
      'Address1',
    );
    const user = await db.User.findOne();
    expect(user.user_address)
      .to
      .equal('Address1');
    expect(await db.User.count())
      .to
      .equal(1);
  });
  it('should not create a duplicate user', async () => {
    await db.addUser(
      'Address1',
    );
    const user = await db.User.findOne();
    expect(user.user_address)
      .to
      .equal('Address1');
    expect(await db.User.count())
      .to
      .equal(1);

    await db.addUser(
      'Address1',
    );
    expect(await db.User.count())
      .to
      .equal(1);
    await db.addUser(
      'Address2',
    );
    expect(await db.User.count())
      .to
      .equal(2);
  });
  it('should create a provider', async () => {
    await db.addProvider(
      'ProviderAddress1',
    );
    const provider = await db.Provider.findOne();
    expect(provider.provider_address)
      .to
      .equal('ProviderAddress1');
  });
  it('should find a provider', async () => {
    await db.addProvider(
      'ProviderAddress1',
    );
    const user = await db.findProvider('ProviderAddress1');
    expect(user.provider_address)
      .to
      .equal('ProviderAddress1');
  });
  it('should create a plan', async () => {
    await db.addPlan('ProviderAddress1', 0, 'plan1', 'hi this is plan 1');
    expect(await db.Plan.count())
      .to
      .equal(1);
    expect(await db.Provider.count())
      .to
      .equal(1);
    let description = await db.getProductDescription('ProviderAddress1', 0);
    expect(description[0])
      .to
      .equal('hi this is plan 1');
    expect(description[1])
      .to
      .equal('plan1');
    await db.updateProductDescription('ProviderAddress1', 'p1', 0, 'this is p1');
    description = await db.getProductDescription('ProviderAddress1', 0);
    expect(description[0])
      .to
      .equal('this is p1');
    expect(description[1])
      .to
      .equal('p1');
  });
  it('should create a subscription', async () => {
    await db.addPlan('ProviderAddress1', 0, 'p0', 'plan0');
    await createSubscription();
  });
  it('should check provider income', async () => {
    await createSubscription();
    expect(await db.getPlanIncome('ProviderAddress1', 0))
      .to
      .equal(10);
    expect(await db.getPlanCustomIncome('ProviderAddress1', 0, 99, 101))
      .to
      .equal(10);
    expect(await db.getProviderIncome('ProviderAddress1'))
      .to
      .equal(10);
    expect(await db.getPlanCustomIncome('ProviderAddress1', 0, 101, 105))
      .to
      .equal(0);
    expect(await db.getProviderCustomIncome('ProviderAddress1', 101, 105))
      .to
      .equal(0);
    expect(await db.getProviderCustomIncome('ProviderAddress1', 99, 101))
      .to
      .equal(10);
  });
  it('should set provider Profile', async () => {
    await db.setProviderProfile('ProviderAddress1', 'des', 'provider name', 'picture id');
    expect(await db.getProviderProfile('ProviderAddress1'))
      .to
      .equal('picture id');
    let providerProfile = await db.getProviderDescription('ProviderAddress1');
    expect(providerProfile[0])
      .to
      .equal('des');
    expect(providerProfile[1])
      .to
      .equal('provider name');
    await db.setProviderProfile('ProviderAddress1', null, null, 'picture id');
    providerProfile = await db.getProviderDescription('ProviderAddress1');
    expect(providerProfile[0])
      .to
      .equal(null);
    expect(providerProfile[1])
      .to
      .equal(null);
  });
});
