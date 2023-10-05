class App {
  // eg. {"todo:added: [cb, cb2, cb3]"}
  /** @typedef {string} EventName */

  /**
   * @private
   * @type {Object.<EventName, Array<function>>}
   */
  _events = {};

  /** Subscribe to an event with a callback
   *
   * @param {EventName} event - The name of the event
   * @param {function} cb - The callback function to be executed
   * @return {function} - Return the unsubscribe method
   */
  subscribe(event, cb) {
    console.log(`App: someone just subscribed to ${event}`);

    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(cb);

    //unsubscribe
    return () => {
      console.log(`App: someone just unsubscribed from ${event}`);

      if (this._events[event]) {
        // @ts-expect-error
        this._events[event] = this._events[event].filter((f) => f !== cb);
      }
    };
  }

  /** publish data to event and execute callbacks
   * @param {EventName} event - The name of the event
   * @param {*} data - Any data
   */
  publish(event, data) {
    console.log(`App: Broadcasting ${event} with ${data}`);

    if (this._events[event]) {
      // @ts-expect-error
      this._events[event].forEach((f) => {
        f(data);
      });
    }
  }
}

export const createLuxApp = () => new App();
