const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');

db.initDb();

subscrypt.config.address = '5HrHYMF5o1Jxdr7gQsQGkGuUJTYYLKchaL8pSXg7RUieBwND';
subscrypt.getEvents((events) => {
  console.log(`\nReceived ${events.length} events:`);

  // Loop through the Vec<EventRecord>
  events.forEach(async (record) => {
    // Extract the phase, event and the event types
    const { event } = record;

    const abi = await subscrypt.abiInstance();
    if (event.method === 'ContractEmitted') {
      const eventDecoded = abi.decodeEvent(event.data[1]);
      if (eventDecoded.event.identifier === 'AddPlanEvent') {
        console.log('AddPlanEvent');
        console.log(eventDecoded.args[0].toString());

        db.addProvider(eventDecoded.args[0].toString());
        db.addProduct(eventDecoded.args[0].toString(), eventDecoded.args[3].toNumber());
      } else if (eventDecoded.event.identifier === 'SubscribeEvent') {
        console.log('SubscribeEvent');

        console.log(eventDecoded.args);
        db.addUser(eventDecoded.args[2].toString());
        db.addSubscription(eventDecoded.args[2].toString(), eventDecoded.args[0].toString(),
          eventDecoded.args[1].toNumber(),
          eventDecoded.args[3].toNumber(), eventDecoded.args[4].toNumber());
      } else if (eventDecoded.event.identifier === 'ProviderRegisterEvent') {
        console.log('ProviderRegisterEvent');
        console.log(eventDecoded.args);
        db.addProvider(eventDecoded.args[0].toString());
      }
    }
  });
});
