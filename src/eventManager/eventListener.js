const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');

db.initDb();

subscrypt.config.address = '5HrHYMF5o1Jxdr7gQsQGkGuUJTYYLKchaL8pSXg7RUieBwND';
subscrypt.getEvents((events) => {
  // Loop through the Vec<EventRecord>
  events.forEach(async (record) => {
    // Extract the phase, event and the event types
    const { event } = record;

    const abi = await subscrypt.abiInstance();
    if (event.method === 'ContractEmitted') {
      const eventDecoded = abi.decodeEvent(event.data[1]);
      if (eventDecoded.event.identifier === 'AddPlanEvent') { // owner(address) , duration(int) , price(int)
        db.addProvider(eventDecoded.args[0].toString());
        db.addProduct(eventDecoded.args[0].toString(), eventDecoded.args[3].toNumber());
      } else if (eventDecoded.event.identifier === 'SubscribeEvent') { // provider(address), plan_index(int), subscription_time,duration
        db.addUser(eventDecoded.args[2].toString());
        db.addSubscription(eventDecoded.args[2].toString(), eventDecoded.args[0].toString(),
          eventDecoded.args[1].toNumber(),
          eventDecoded.args[3].toNumber(), eventDecoded.args[4].toNumber());
      } else if (eventDecoded.event.identifier === 'ProviderRegisterEvent') { // providerAddress
        db.addProvider(eventDecoded.args[0].toString());
      }
    }
  });
});
