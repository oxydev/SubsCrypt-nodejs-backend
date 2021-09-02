const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
const db = require('../databaseWrapper/database');

chai.use(chaiHttp);
describe('profile tests', () => {
  beforeEach(async () => {
    await db.truncate();
  });

  it('it should check provider profile', async () => {
    let res = await chai.request(server)
      .post('/profile/newProviderRegister')
      .send({
        providerAddress: 'Profile1',
        description: 'des1',
        providerName: 'name',
      });
    res.should.have.status(200);

    res = await chai.request(server)
      .get('/profile/getProviderDescription/Profile1');
    res.should.have.status(200);

    res.body.should.be.eql({
      description: 'des1',
      name: 'name',
    });
  });

  it('it should check provider profile', async () => {
    let res = await chai.request(server)
      .patch('/profile/updateProductProfile')
      .send({
        providerAddress: 'Profile1',
        description: 'des1',
        planName: 'name',
        planIndex: 0,
      });
    res.should.have.status(200);

    res = await chai.request(server)
      .get('/profile/getProductDescription/Profile1/0');
    res.should.have.status(200);

    res.body.should.be.eql({
      description: 'des1',
      name: 'name',
    });
  });
});
