import React, {useContext, useEffect} from 'react';
import {MegaverseGridContext} from '/contexts/MegaverseGridContext/index.js';
import {createEmojiArray, emojiAnimation} from '/utils/emoji/index.js';
import {GridRaster} from './GridRaster.js';

/**
 * Main function for rendering the MegaverseGrid
 */
const MegaverseGrid = () => {
  const {
    setEmojiMap, setEmojiAtPos, getActiveEmojiBrush,
    setEditorActive, getEditorActive, getActiveBrushOptions, getGridSize,
  } = useContext(MegaverseGridContext);

  const {rows, cols} = getGridSize();

  /* emoji animation on mount */
  useEffect(() => {
    const /** Array<Array<string>> */ emptyMap = createEmojiArray(rows, cols);
    setEmojiMap(emptyMap);

    /* execute next frame */
    setTimeout(() => {
      emojiAnimation(0, rows, cols, setEmojiAtPos);
      /* enable editor after anim */
      setTimeout(() => {
        setEditorActive(true);
      }, 800);
    }, 0);
  }, []);

  /**
   * Function which is called whenever an emoji in the grid is clicked
   * Changes the clicked emoji to the current brush
   * @param {number} x
   * @param {number} y
   */
  const changeEmoji = (x, y) => {
    if (!getEditorActive()) return;
    const /** string= */ activeEmojiBrush = getActiveEmojiBrush();
    const /** Object= */ activeBrushOptions = getActiveBrushOptions();
    setEmojiAtPos(x, y, activeEmojiBrush, activeBrushOptions);
  };

  return <GridRaster rows={ rows } cols={ cols } changeEmoji={ changeEmoji } />;
};

export {MegaverseGrid};
