const sqlite3 = require('sqlite3')
  .verbose();
const fs = require('fs');

const providersPath = 'uploads/uploadProviders/';

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw err;
  }
});

function initDb() {
  db.run('CREATE TABLE IF NOT EXISTS "users" ("ID" INTEGER,"user_address" TEXT UNIQUE ,PRIMARY KEY("id"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS "providers" ("ID" INTEGER,"provider_address" TEXT UNIQUE, "profile_pic_id" TEXT UNIQUE,"providerName" TEXT, "description" TEXT, PRIMARY KEY("ID"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS "products" ("ID" INTEGER, "provider_id" INTEGER, "description" TEXT, "planName" TEXT, "plan_index" INTEGER, PRIMARY KEY("ID"),FOREIGN KEY("provider_id") REFERENCES "providers"("ID"))',
    () => {
    });
  db.run('CREATE TABLE IF NOT EXISTS _product_user_relationships (user_reference INTEGER, product_reference INTEGER, "start_time" INTEGER , "duration" INTEGER)',
    () => {
    });
}

initDb();

function addUser(userAddress) {
  const insert = 'INSERT OR IGNORE INTO users (user_address) VALUES (?)';
  db.run(insert, [userAddress]);
}

function addProvider(providerAddress) {
  const insert = 'INSERT OR IGNORE INTO providers (provider_address) VALUES (?)';
  db.run(insert, [providerAddress]);
}

function addProduct(providerAddress, planIndex, fallback = undefined) {
  const query = 'select products.description, planName from products'
    + ' join providers on provider_id = providers.ID \n'
    + ' where provider_address = ? and plan_index = ?';
  db.get(query, [providerAddress, planIndex], (err, resp) => {
    if (resp === undefined) {
      const insert = 'INSERT OR IGNORE INTO products (provider_id, plan_index) VALUES ((SELECT id from providers WHERE provider_address=?), ?)';
      if (fallback === undefined) {
        db.run(insert, [providerAddress, planIndex]);
      } else {
        db.run(insert, [providerAddress, planIndex], fallback);
      }
    }
  });
}

function addSubscription(userAddress, providerAddress, planIndex, startTime, duration) {
  const insert = 'INSERT OR IGNORE INTO _product_user_relationships (user_reference, product_reference, start_time, duration) VALUES ((SELECT id from users WHERE user_address=?), (SELECT id from products WHERE provider_id = (SELECT id from providers WHERE provider_address=?) and plan_index=?), ?)';
  db.run(insert, [userAddress, providerAddress, planIndex, startTime, duration]);
}

function getUsers(providerAddress, res) {
  const insert = 'SELECT user_address, finish_time, provider_address, plan_index from users \n'
    + 'join _product_user_relationships on users.id = user_reference\n'
    + 'join products on _product_user_relationships.product_reference = products.ID\n'
    + 'join providers on provider_id = providers.ID \n'
    + 'where provider_address = ?';
  return db.all(insert, [providerAddress], (err, rows) => {
    if (err) {
      res.status(400)
        .json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
}

function getUsersOfPlan(providerAddress, planIndex, res) {
  const insert = 'SELECT user_address, finish_time, provider_address, plan_index from users \n'
    + 'join _product_user_relationships on users.id = user_reference\n'
    + 'join products on _product_user_relationships.product_reference = products.ID\n'
    + 'join providers on provider_id = providers.ID \n'
    + 'where provider_address = ? and plan_index = ?';
  return db.all(insert, [providerAddress, planIndex], (err, rows) => {
    if (err) {
      res.status(400)
        .json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
}

function setProviderProfile(providerAddress, description, name, fileID) {
  addProvider(providerAddress);
  const insert = 'UPDATE providers SET  (profile_pic_id,providerName, description) = (?,?, ?) where provider_address = (?)';
  db.run(insert, [fileID, name, description, providerAddress]);
}

function updateProductDescription(providerAddress, name, planIndex, description) {
  function fallback() {
    const insert = 'UPDATE products SET (planName, description) = (?, ?)'
      + ' where provider_id = (SELECT ID from providers WHERE provider_address = (?)) and plan_index = (?)';
    db.run(insert, [description, name, providerAddress, planIndex]);
  }

  addProduct(providerAddress, planIndex, fallback);
}

function getPic(path, res) {
  try {
    const file = fs.createReadStream(path);
    const filename = (new Date()).toISOString();
    res.setHeader('Content-Disposition', `attachment: filename="${filename}"`);
    file.pipe(res);
  } catch (err) {
    res.sendStatus(400);
  }
}

function getProviderProfile(providerAddress, res) {
  const insert = 'select profile_pic_id from providers where provider_address = (?)';
  db.get(insert, [providerAddress], (error, row) => {
    const path = providersPath + row.profile_pic_id;
    getPic(path, res);
  });
}

function getProviderDescription(providerAddress, res) {
  const insert = 'select description, providerName from providers where provider_address = (?)';
  db.get(insert, [providerAddress], (error, row) => {
    res.status(400)
      .json({
        description: row.description,
        name: row.providerName,
      });
  });
}

// function getUserProfile(providerAddress, res) {
//   const insert = 'select profile_id from users where user_address = (?)';
//   return db.get(insert, [providerAddress], (error, row) => {
//     const path = usersPath + row.profile_id;
//     getPic(path, res);
//   });
// }
//
function getProductDescription(providerAddress, planIndex, res) {
  const insert = 'select products.description, planName from products'
    + ' join providers on provider_id = providers.ID \n'
    + ' where provider_address = ? and plan_index = ?';
  return db.get(insert, [providerAddress, planIndex], (error, row) => {
    res.status(400)
      .json({
        description: row.description,
        name: row.planName,
      });
  });
}

module.exports = {
  getProviderProfile,
  updateProductDescription,
  getProviderDescription,
  getProductDescription,
  setProviderProfile,
  addUser,
  addProvider,
  addProduct,
  addSubscription,
  getUsers,
  getUsersOfPlan,
};
