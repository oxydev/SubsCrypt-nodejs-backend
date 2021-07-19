const db = require('../databaseWrapper/database');

async function getProviderData(req, res) {
  try {
    const users = await db.getUsers(req.params.providerAddress);
    const usersCount = users.length;
    const income = await db.getProviderIncome(req.params.providerAddress);
    res.status(200)
      .json({
        income,
        usersCount,
      });
  } catch (err) {
    res.status(404)
      .json({ message: 'there is no such provider' });
  }
}

async function getProviderCustomIncome(req, res) {
  try {
    const income = await db.getProviderCustomIncome(
      req.params.providerAddress,
      req.params.start,
      req.params.finish,
    );
    res.status(200)
      .json({
        income,
      });
  } catch (err) {
    res.status(404)
      .json({ message: 'there is no such provider' });
  }
}

async function getPlanIncome(req, res) {
  try {
    const userCount = (await db.getUsersOfPlan(
      req.params.providerAddress,
      req.params.planIndex,
    )).length;
    const income = await db.getPlanIncome(
      req.params.providerAddress,
      req.params.planIndex,
    );
    res.status(200)
      .json({
        income,
        userCount,
      });
  } catch (err) {
    res.status(404)
      .json({ message: 'there is no such provider or plan' });
  }
}

async function getPlanCustomIncome(req, res) {
  try {
    const income = await db.getPlanCustomIncome(
      req.params.providerAddress,
      req.params.planIndex,
      req.params.start,
      req.params.finish,
    );
    res.status(200)
      .json({
        income,
      });
  } catch (err) {
    res.status(404)
      .json({ message: 'there is no such provider or plan' });
  }
}

async function getUsers(req, res) {
  try {
    const subscriptions = await db.getUsers(req.params.providerAddress);
    res.status(200)
      .json({
        subscriptions,
      });
  } catch (e) {
    res.status(400)
      .json({
        e,
      });
  }
}

async function getUsersOfPlan(req, res) {
  try {
    const subscriptions = await db.getUsersOfPlan(req.params.providerAddress, req.params.planIndex);
    res.status(200)
      .json({
        subscriptions,
      });
  } catch (e) {
    res.status(400)
      .json({
        e,
      });
  }
}

module.exports = {
  getPlanIncome,
  getProviderData,
  getProviderCustomIncome,
  getPlanCustomIncome,
  getUsers,
  getUsersOfPlan,
};
