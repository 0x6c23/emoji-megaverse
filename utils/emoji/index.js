import {debounce} from '/utils/debounce/index.js';

const EMOJI_MAP = {
  'POLYANET': '🪐',
  'SOLOON': '🌙',
  'COMETH': '☄️',
  'SPACE': '🌌',
};

/**
 * Lists available options for each emoji
 * @type {Object<Object<string, string[]>>}
 */
const EMOJI_OPTIONS = {
  'COMETH': {
    'defaults': {
      'direction': 'down',
    },
    'direction': ['left', 'up', 'right', 'down'],
  },
  'SOLOON': {
    'defaults': {
      'color': 'white',
    },
    'color': ['red', 'blue', 'purple', 'white'],
  },
};

/* for simpler processing, could build a function to get those */
const EMOJI_OPTION_KEYS = {
  direction: undefined,
  color: undefined,
};

const DEFAULT_EMOJI = 'SPACE';

/**
 * Given the number of rows and cols create a 2D array and fill it with
 * random strings (emojis)
 * @param {number} rows - number of rows in 2d array
 * @param {number} cols - number of cols in 2d array
 * @param {?string} emoji - optional emoji to set the fields to, otherwise random
 * @returns {!Array<Array<Object<{string, string}>>>} - 2D array filled with random emojis
 */
const createEmojiArray = (rows, cols, emoji = null) => {
  let arr = [];
  for (let y = 0; y < rows; y++) {
    arr[y] = [];
    for (let x = 0; x < cols; x++) {
      arr[y][x] = {
        emoji: emoji ? emoji : Object.keys(EMOJI_MAP)[Math.floor(
            Math.random() * Object.keys(EMOJI_MAP).length)],
      };
    }
  }
  return arr;
};

/**
 * Scanline animation used after mount
 * @param {number} row - is the current row
 * @param {number} rows - is the total number of rows
 * @param {number} cols - is the total number of cols
 * @param {function(number, number, string): null} setFn - is the function used to set an emoji at pos x,y
 * @param {?function()} cb - optional callback function
 */
const emojiAnimation = (row = 0, rows, cols, setFn, cb = null) => {
  for (let x = 0; x < cols; x++) {
    const /** function()= */ debounced = debounce({
          [x * 5 + 5]: () => setFn(
              x,
              row,
              'POLYANET',
          ),
          [x * 5 + 25]: () => setFn(
              x,
              row,
              'SPACE',
          ),
          [x * 5 + 250]: () => setFn(
              x,
              row,
              'SOLOON',
          ),
          [x * 5 + 500]: () => setFn(
              x,
              row,
              'COMETH',
          ),
          [x * 5 + 750]: () => setFn(
              x,
              row,
              'SPACE',
          ),
        },
    );
    debounced();
  }

  if (row < rows - 1) {
    const /** function()= */ debounced = debounce({
      '10': () => emojiAnimation(row + 1, rows, cols, setFn, cb),
    });
    return debounced();
  }

  cb && cb();
};

export {
  EMOJI_MAP,
  EMOJI_OPTIONS,
  DEFAULT_EMOJI,
  EMOJI_OPTION_KEYS,
  createEmojiArray,
  emojiAnimation,
};
