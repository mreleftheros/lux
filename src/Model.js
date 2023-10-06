/** @typedef {(data: any) => any} Cb */

/** Model
 * @param {string} elementName - HTML element name with lux-model attribute
 * @param {any} state - State of the model
 * @param {{_subscribe: (event: string, cb: Cb) => function, _publish: (event: string, data: any) => void}} _internals - Internal private functions
 */
export const Model = (elementName, state, { _subscribe, _publish }) => {
  /** @type {HTMLElement | null} */
  const _element = document.querySelector(`[lux-model=${elementName}]`);
  const _state = state;
  if (!_element) {
    throw new Error("Couldn't find lux model with name " + elementName);
  }

  /** Listen for custom events and fire a callback
   * @param {string} event - Event name
   * @param {Cb} cb - Callback to be fired
   */
  const listenFor = (event, cb) => _subscribe(event, cb);

  return {
    get element() {
      return _element;
    },
    listenFor,
  };
};
