import React from 'react';
import * as Emojis from '/components/Emoji/index.js';

/* TODO: Put somewhere else */
const EMOJI_COMPONENT_MAP = {
  'SPACE': Emojis.Space,
  'SOLOON': Emojis.Soloon,
  'COMETH': Emojis.Cometh,
  'POLYANET': Emojis.Polyanet,
};

/**
 * Switches between emojis given the input string and applies options
 * @param {string} emoji
 * @param {Object} options
 */
const EmojiRenderer = ({
  emoji = 'SPACE',
  options = {},
}) => {
  if (!EMOJI_COMPONENT_MAP[emoji]) return <p>Emoji { emoji } does not exist!</p>;
  return React.createElement(EMOJI_COMPONENT_MAP[emoji], {
    ...options,
  });
};

export {EmojiRenderer};
