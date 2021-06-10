const subscrypt = require('@oxydev/subscrypt');
const db = require('../databaseWrapper/database');

subscrypt.getEvents((events) => {
  console.log(`\nReceived ${events.length} events:`);

  // Loop through the Vec<EventRecord>
  events.forEach(async (record) => {
    // Extract the phase, event and the event types
    const { event } = record;

    const abi = await subscrypt.abiInstance();
    if (event.method === 'ContractEmitted') {
      const eventDecoded = abi.decodeEvent(event.data[1]);
      if (eventDecoded.event.identifier === 'AddPlanEvent') db.addProduct(eventDecoded.args[0], eventDecoded.args[3]);
      else if (eventDecoded.event.identifier === 'SubscribeEvent') {
        db.addUser(eventDecoded.args[2]);
        db.addSubscription(eventDecoded.args[2], eventDecoded.args[0], eventDecoded.args[1],
          eventDecoded.args[3], eventDecoded.args[4]);
      } else if (eventDecoded.event.identifier === 'ProviderRegisterEvent') db.addProvider(eventDecoded.args[0]);
    }
  });
});
