const { DataTypes, Sequelize } = require('sequelize');

const DBSOURCE = '/usr/src/app/db.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DBSOURCE,
  logging: false,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
});

const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  provider_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profile_pic_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  providerName: DataTypes.STRING,
  description: DataTypes.STRING,
  total_income: DataTypes.INTEGER,
}, {
  timestamps: false,
});

const Subscription = sequelize.define('Subscription', {
  start_time: DataTypes.INTEGER,
  duration: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  characteristics: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('characteristics')
        .split(';');
    },
    set(val) {
      this.setDataValue('characteristics', val.join(';'));
    },
  },
}, {
  timestamps: false,
});

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  description: DataTypes.STRING,
  planName: DataTypes.STRING,
  plan_index: DataTypes.INTEGER,

}, {
  timestamps: false,
});

async function initDb() {
  Plan.belongsTo(Provider);
  Provider.hasMany(Plan);

  Subscription.belongsTo(User);
  User.hasMany(Subscription);

  Subscription.belongsTo(Plan);
  Plan.hasMany(Subscription);

  await sequelize.sync();
}

initDb();

async function addUser(userAddress) {
  await User.findOrCreate({
    where: {
      user_address: userAddress,
    },
    defaults: {
      user_address: userAddress,
    },
  });
}

async function addProvider(providerAddress) {
  await Provider.findOrCreate({
    where: {
      provider_address: providerAddress,
    },
    defaults: {
      provider_address: providerAddress,
      total_income: 0,
    },
  });
}

async function findProvider(providerAddress) {
  return Provider.findOne({
    where: {
      provider_address: providerAddress,
    },
  });
}

async function findPlan(providerAddress, planIndex) {
  return Plan.findOne({
    where: {
      plan_index: planIndex,
    },
    include: [{
      model: Provider,
      where: {
        provider_address: providerAddress,
      },
    }],
  });
}

async function addPlan(providerAddress, planIndex, name, description) {
  await addProvider(providerAddress);
  const provider = await findProvider(providerAddress);
  let plan = await findPlan(providerAddress, planIndex);
  if (plan == null) {
    plan = await Plan.create({
      plan_index: planIndex,
      planName: name,
      description,
    });
    await plan.setProvider(provider);
  }
  return plan;
}

async function addSubscription(
  userAddress,
  providerAddress,
  planIndex,
  startTime,
  duration,
  price,
  characteristics,
) {
  await addProvider(providerAddress);
  const provider = await findProvider(providerAddress);
  let plan = await findPlan(providerAddress, planIndex);
  if (plan == null) {
    plan = await Plan.create({
      plan_index: planIndex,
    });
    await plan.setProvider(provider);
  }
  await addUser(userAddress);
  const user = await User.findOne({
    where: {
      user_address: userAddress,
    },
  });
  provider.total_income += price;
  const subscription = await Subscription.create({
    start_time: startTime,
    duration,
    price,
    characteristics,
  });
  await subscription.setUser(user);
  await subscription.setPlan(plan);
  await provider.save();
}

async function getUsers(providerAddress) {
  const u = await Provider.findOne({
    where: {
      provider_address: providerAddress,
    },
    include: [{
      model: Plan,
      include: [{
        model: Subscription,
        include: [{
          model: User,
        }],
      }],
    }],
  });

  const subscriptions = [];

  u.Plans.forEach((plan) => {
    plan.Subscriptions.forEach((subscription) => {
      subscriptions.push({
        plan_index: plan.plan_index,
        start_time: subscription.start_time,
        duration: subscription.duration,
        provider_address: providerAddress,
        user_address: subscription.User.user_address,
        price: subscription.price,
        characteristics: subscription.characteristics,
      });
    });
  });

  return subscriptions;
}

async function getProviderCustomIncome(providerAddress, startTime, finishTime) {
  const subscriptions = await getUsers(providerAddress);
  let income = 0;
  subscriptions.forEach((subscription) => {
    if (subscription.start_time >= startTime && subscription.start_time < finishTime) {
      income += subscription.price;
    }
  });

  return income;
}

async function getProviderIncome(providerAddress) {
  const provider = await findProvider(providerAddress);
  return provider.total_income;
}

async function getUsersOfPlan(providerAddress, planIndex) {
  const p = await Plan.findOne({
    where: {
      plan_index: planIndex,
    },
    include: [{
      model: Provider,
      where: {
        provider_address: providerAddress,
      },
    }, {
      model: Subscription,
      include: [{
        model: User,
      }],
    }],
  });

  const subscriptions = [];

  p.Subscriptions.forEach((subscription) => {
    subscriptions.push({
      plan_index: planIndex,
      start_time: subscription.start_time,
      duration: subscription.duration,
      provider_address: providerAddress,
      user_address: subscription.User.user_address,
      price: subscription.price,
      characteristics: subscription.characteristics,
    });
  });
  return subscriptions;
}

async function getPlanCustomIncome(providerAddress, planIndex, startTime, finishTime) {
  const subscriptions = await getUsersOfPlan(providerAddress, planIndex);

  let income = 0;
  subscriptions.forEach((subscription) => {
    if (subscription.start_time >= startTime && subscription.start_time < finishTime) {
      income += subscription.price;
    }
  });

  return income;
}

async function getPlanIncome(providerAddress, planIndex) {
  const subscriptions = await getUsersOfPlan(providerAddress, planIndex);
  let income = 0;
  subscriptions.forEach((subscription) => {
    income += subscription.price;
  });
  return income;
}

async function setProviderProfile(providerAddress, description, name, fileID) {
  await addProvider(providerAddress);
  const provider = await Provider.findOne({
    where: {
      provider_address: providerAddress,
    },
  });
  provider.providerName = name;
  provider.description = description;
  provider.profile_pic_id = fileID;
  await provider.save();
}

async function updateProductDescription(providerAddress, name, planIndex, description) {
  const plan = await addPlan(providerAddress, planIndex);
  plan.planName = name;
  plan.description = description;
  await plan.save();
}

async function getProviderProfile(providerAddress) {
  const provider = await findProvider(providerAddress);
  return provider.profile_pic_id;
}

async function getProviderDescription(providerAddress) {
  const provider = await findProvider(providerAddress);
  return [
    provider.description != null ? provider.description : null,
    provider.providerName != null ? provider.providerName : null,
  ];
}

async function getProductDescription(providerAddress, planIndex) {
  const plan = await findPlan(providerAddress, planIndex);

  return [plan.description, plan.planName];
}

module.exports = {
  getProviderProfile,
  updateProductDescription,
  getProviderDescription,
  getProductDescription,
  setProviderProfile,
  getProviderIncome,
  getProviderCustomIncome,
  getPlanCustomIncome,
  getPlanIncome,
  addUser,
  addProvider,
  addPlan,
  addSubscription,
  getUsers,
  getUsersOfPlan,
};
