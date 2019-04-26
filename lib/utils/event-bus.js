const events = require('events');

class EventBus extends events.EventEmitter {




}

let bus = new EventBus();

module.exports = bus;