const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw err;
  }
});

function initDb() {
  db.run('CREATE TABLE IF NOT EXISTS "users" ("ID" INTEGER,"user_address" TEXT UNIQUE,PRIMARY KEY("id"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS "providers" ("ID" INTEGER,"provider_address" TEXT UNIQUE, PRIMARY KEY("ID"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS "products" ("ID" INTEGER, "provider_id" INTEGER, "plan_index" INTEGER, PRIMARY KEY("ID"),FOREIGN KEY("provider_id") REFERENCES "providers"("ID"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS _product_user_relationships (user_reference INTEGER, product_reference INTEGER, "finish_time"\tINTEGER)',
    () => {
    });
}

function addUser(userAddress) {
  const insert = 'INSERT OR IGNORE INTO users (user_address) VALUES (?)';
  db.run(insert, [userAddress]);
}

function addProvider(providerAddress) {
  const insert = 'INSERT OR IGNORE INTO providers (provider_address) VALUES (?)';
  db.run(insert, [providerAddress]);
}

function addProduct(providerAddress, planIndex) {
  const insert = 'INSERT INTO products (provider_id, plan_id) VALUES ((SELECT id from providers WHERE provider_address=?), ?)';
  db.run(insert, [providerAddress, planIndex]);
}

function addSubscription(userAddress, providerAddress, planIndex) {
  const insert = 'INSERT INTO _product_user_relationships (user_reference, product_reference) VALUES ((SELECT id from users WHERE user_address=?), (SELECT id from products WHERE product_reference = (SELECT id from providers WHERE provider_address=?) plan_index=?))';
  db.run(insert, [userAddress, providerAddress, planIndex]);
}

function getUsers(providerAddress) {
  const insert = 'SELECT user_address from users \n'
        + 'join _product_user_relationships on users.id = user_reference\n'
        + 'join products on _product_user_relationships.product_reference = products.ID\n'
        + 'join providers on provider_id = providers.ID \n'
        + 'where provider_address = ?';
  db.run(insert, [providerAddress]);
}

function getUsersOfPlan(providerAddress, planIndex) {
  const insert = 'SELECT user_address from users \n'
        + 'join _product_user_relationships on users.id = user_reference\n'
        + 'join products on _product_user_relationships.product_reference = products.ID\n'
        + 'join providers on provider_id = providers.ID \n'
        + 'where provider_address = ? and plan_id = ?';
  db.run(insert, [providerAddress, planIndex]);
}

module.exports = {
  initDb,
  addUser,
  addProvider,
  addProduct,
  addSubscription,
  getUsers,
  getUsersOfPlan,
};
