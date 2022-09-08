import {throwIfNotSuccessful} from '/utils/error/index.js';

const resetMap = async () => {
  const res = await fetch('/api/map', {
    method: 'DELETE',
  });
  await throwIfNotSuccessful(res, '/api/map DELETE request failed');
};

/**
 * Uploads the current map to the crossmint api
 * @param {Array<Array<Object<string, string>>>} map - 2D representation of map
 * @returns {Promise<void>}
 */
const uploadCurrentMap = async (map) => {
  await resetMap();
  const res = await fetch('/api/map', {
    method: 'POST',
    body: JSON.stringify({
      map: map,
    }),
  });
  await throwIfNotSuccessful(res, '/api/map POST request failed');
};

export {resetMap, uploadCurrentMap};
