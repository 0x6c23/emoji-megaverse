import {timer} from '/utils/api/timer/index.js';
import {throwIfNotSuccessful} from '/utils/error/index.js';

/**
 * Fetches the current goal from the API server
 * @returns {Promise<JSON>} - the JSON response containing the current goal
 */
const getCurrentGoal = async () => {
  const res = await fetch(
      `${ process.env.API_BASE_URL }/map/${ process.env.CANDIDATE_ID }/goal`);
  await throwIfNotSuccessful(res, 'Could not fetch goal!');
  return await res.json();
};

/**
 * Given the parameters return a 2D map forming a
 * centered diagonal cross using POLYANETS. Empty space = SPACE
 * @param {number} rows - num of rows
 * @param {number} cols - num of columns
 * @param {number} padding - padding around the cross
 * @returns {Promise<Array<Array<Object<string, string>>>>} - 2D map of planets
 */
const drawDiagonalCross = async (rows, cols, padding = 2) => {
  const returnArr = [];
  for (let y = 0; y < cols; y++) {
    returnArr[y] = [];
    for (let x = 0; x < rows; x++) {
      if (
          x >= padding &&
          y >= padding &&
          y < cols - padding &&
          x < rows - padding
      ) {
        if (x === y) {
          /* diagonal top-left to bottom-right */
          returnArr[y][x] = {emoji: 'POLYANET'};
        }
        else if (x + y === Math.floor((rows + cols) / 2) - 1) {
          /* diagonal bottom-left to top-right */
          returnArr[y][x] = {emoji: 'POLYANET'};
        }
        else {
          returnArr[y][x] = {emoji: 'SPACE'};
        }
      }
      else {
        returnArr[y][x] = {emoji: 'SPACE'};
      }
    }
  }
  return returnArr;
};

/**
 * Fetches the current map state from the API server
 * @returns {Promise<JSON>} - the JSON response containing the current map
 */
const getCurrentMap = async () => {
  const res = await fetch(
      `${ process.env.API_BASE_URL }/map/${ process.env.CANDIDATE_ID }`);
  await throwIfNotSuccessful(res, 'Could not get current map from API');
  return await res.json();
};

const deleteCurrentMap = async () => {
  const currentMap = await getCurrentMap();
  // {map: { content: [[]]}
  // type: 0 = polyanet, 1 = soloon, 2 = cometh
  const {map} = currentMap;
  if (!map || !map?.content?.length) throw 'Could not fetch map';

  const ENDPOINT_TYPE_MAP = {
    0: 'polyanets',
    1: 'soloons',
    2: 'comeths',
  };

  for (let y = 0; y < map.content.length; y++) {
    for (let x = 0; x < map.content[y].length; x++) {
      /* we don't need to 'delete' space(s) */
      if (map.content[y][x] !== null) {
        await timer(100); // be nice to APIs <3

        const res = await fetch(
            `${ process.env.API_BASE_URL }/${ ENDPOINT_TYPE_MAP[map.content[y][x].type] }`,
            {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
              },
              redirect: 'follow',
              body: JSON.stringify({
                'candidateId': process.env.CANDIDATE_ID,
                'row': y,
                'column': x,
              }),
            },
        );

        await throwIfNotSuccessful(res, 'Could not delete map!');
      }
    }
  }
};

const postCurrentMap = async (map) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const {emoji, ...opts} = map[y][x];
      /* space === empty/ no emoji */
      if (emoji !== 'SPACE') {

        await timer(100); // be nice to APIs <3

        const res = await fetch(
            `${ process.env.API_BASE_URL }/${ emoji.toLowerCase() }s`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              redirect: 'follow',
              body: JSON.stringify({
                'candidateId': process.env.CANDIDATE_ID,
                'row': y,
                'column': x,
                ...opts,
              }),
            });

        await throwIfNotSuccessful(res, 'Could not post map!');
      }
    }
  }
};

export {
  getCurrentGoal,
  getCurrentMap,
  drawDiagonalCross,
  postCurrentMap,
  deleteCurrentMap,
};
