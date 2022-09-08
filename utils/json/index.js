/**
 * Given a JSON string or object return a JSON object if input is valid json
 * otherwise return false
 * @param {string|Object} json - json string or json object
 * @returns {Object|boolean}
 */
const getValidJson = (json) => {
  if (!json) return false;

  if (
      typeof json === 'object' &&
      (json?.constructor === Object || json?.constructor === Array)
  ) {
    return json;
  }

  try {
    return JSON.parse(json);
  }
  catch (e) {
    return false;
  }
};

export {getValidJson};
