/**
 * Debounce multiple functions after another at the given times
 * @param {Object<string, function>} waitFunctionMap - is a map of delays and functions
 * @returns {(function(): void)|*} - is a function handler to execute the debounced fns
 */
const debounce = (waitFunctionMap) => {
  const /** !Object<string, function> */ timeouts = {};
  const /** !Array<string> */ delays = Object.keys(waitFunctionMap); // last argument

  return function() {
    delays.forEach(delay => {
      clearTimeout(timeouts[delay]);

      const /** Function */ currentFn = waitFunctionMap[delay];

      if (typeof currentFn !== 'function') return;

      const /** Number */ waitInMS = parseInt(delay);
      if (!waitInMS) return;

      timeouts[delay] = setTimeout(
          () => currentFn.apply(this, arguments), waitInMS);
    });
  };
};

export {debounce};
