/*

const emitter = new Emitter();

// 1. Support subscribing to events.
const sub = emitter.subscribe('event_name', callback);

// 2. Support emitting events.
// This particular example should lead to the `callback` above being invoked with `first_value` and `second_value` as parameters.
emitter.emit('event_name', 'first_value', 'second_value');

// 3. Support unsubscribing existing subscriptions by releasing them.
sub.release(); // `sub` is the reference returned by `subscribe` above



// Event emitter
// Three requirements:
// - Subscribe
// - Emit events
// - release subscriptions

*/


class Emitter {

  constructor() {
    this.handlers = [];

    // this.handlers = {
    //   [eventName]: []
    // };
  }

  //   O(1)
  subscribe(eventName, callback) {
    // Check for legal eventNames and callback
    this.handlers.push({
      event: eventName,
      callback,
    });

    return {release: this._release.bind(this, eventName, callback)};
  }

  // O(n) with n = number of handlers added
  emit(eventName, ...args) {
    // Check for legal eventNames and callback
    let handlers = this.handlers.filter((handler) => handler.event === eventName);

    if(handlers.length) {
      handlers.forEach((handler) => {
        handler.callback.apply(null, args);
      });
    }
  }

  //   O(n) with n = number of handlers added
  _release(eventName, cb) {
    // Check for legal eventNames and callback
    this.handlers = this.handlers.filter((handler) => {
        return ((handler.event !== eventName) && (handler.callback !== cb))
    });
  }

}