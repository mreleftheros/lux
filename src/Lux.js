import { Model } from "./Model.js";

/** Main
 * @return {Object<string, function>}
 */
const Lux = () => {
  /** @typedef {(data: any) => any} Cb */

  /**
   * @type {Object<string, Array<Cb>>}
   */
  // eg. {"todo:added: [cb, cb2, cb3]"}
  const _events = {};

  /** Subscribe to an event with a callback
   * @param {string} event - The name of the event
   * @param {Cb} cb - The callback function to be executed
   * @return {function} - Return the unsubscribe method
   */
  const _subscribe = (event, cb) => {
    console.log(`App: someone just subscribed to ${event}`);

    if (!_events[event]) {
      _events[event] = [];
    }

    _events[event].push(cb);

    //unsubscribe
    return () => {
      console.log(`App: someone just unsubscribed from ${event}`);

      if (_events[event]) {
        _events[event] = _events[event].filter((f) => f !== cb);
      }
    };
  };

  /** publish data to event and execute callbacks
   * @param {string} event - The name of the event
   * @param {*} data - Any data
   * @return {void}
   */
  const _publish = (event, data) => {
    console.log(`App: Broadcasting ${event} with ${data}`);

    if (_events[event])
      _events[event].forEach((f) => {
        f(data);
      });
  };

  /** Create new Model
   * @param {string} elementName - HTML element name with lux-model attribute
   * @param {any} state - State of the model
   */
  const setModel = (elementName, state) =>
    Model(elementName, state, { _subscribe, _publish });

  /** fire event with data and execute event callbacks
   * @param {string} event - The name of the event
   * @param {*} data - Any data
   * @return {void}
   */
  const fire = (event, data) => _publish(event, data);

  return {
    setModel,
    fire,
  };
};

export const setAppWithLux = () => Lux();
