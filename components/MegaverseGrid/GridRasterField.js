import React, {useContext} from 'react';
import {MegaverseGridContext} from '/contexts/MegaverseGridContext/index.js';
import {EmojiButton} from '/components/EmojiButton/index.js';

/**
 * A field in GridRaster used to display emojis and listen to click events
 * @param {number} x - x position of this field
 * @param {number} y - y position of this field
 * @param {function(): null} clickHandler - is the function to be executed when field is clicked
 */
const GridRasterField = ({
  x,
  y,
  clickHandler,
}) => {
  const {getEmojiAtPos} = useContext(MegaverseGridContext);
  return <EmojiButton clickHandler={ clickHandler } emojiObject={ getEmojiAtPos(x, y) } />;
};

export {GridRasterField};
