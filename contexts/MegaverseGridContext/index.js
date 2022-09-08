import React, {createContext, useRef, useState} from 'react';
import {
  createEmojiArray,
  EMOJI_OPTION_KEYS,
  DEFAULT_EMOJI,
} from '/utils/emoji/index.js';

export const MegaverseGridContext = createContext({});

export const MegaverseGridContextProvider = ({
  children,
}) => {
  const [state, setState] = useState({
    gridSize: {rows: 11, cols: 11},
    isEditorActive: false, // if emojis can be edited
    emojiMap: [], // 2d array of emojis positions
    activeEmojiBrush: 'COMETH', // currently selected emoji
    activeBrushOptions: {}, // options for the current selected emoji brush
  });

  const stateRef = useRef();
  stateRef.current = state;

  /* set editor to active so emojis can be changed */
  const setEditorActive = (isActive) => {
    setState(prev => ({
      ...prev,
      isEditorActive: isActive,
    }));
  };

  /* sets the active brush options, i.e. direction, color */
  const setActiveBrushOptions = (options) => {
    setState(prev => ({
      ...prev,
      activeBrushOptions: options,
    }));
  };

  /* returns current active brush options */
  const getActiveBrushOptions = () => {
    return stateRef.current.activeBrushOptions;
  };

  /* returns current gridSize */
  const getGridSize = () => {
    return /** Object<string, number> */ stateRef.current.gridSize;
  };

  /* sets the gridSize  */
  const setGridSize = (gridSize) => {
    setState(prev => ({
      ...prev,
      gridSize: gridSize,
    }));
  };

  /* returns current active state of editor */
  const getEditorActive = () => {
    return stateRef.current.isEditorActive;
  };

  /* returns the currently active emoji */
  const getActiveEmojiBrush = () => {
    return /**string=*/ stateRef.current.activeEmojiBrush;
  };

  /* sets the currently active emoji  */
  const setActiveEmojiBrush = (emoji) => {
    setState(prev => ({
      ...prev,
      activeEmojiBrush: emoji,
    }));
  };

  /* returns the current emoji-map (2D array) */
  const getEmojiMap = () => {
    return /** Array<Array<Object<string,string>>> */stateRef.current.emojiMap;
  };

  /* sets the current emoji map (2D array) */
  const setEmojiMap = value => {
    setState(prev => ({
      ...prev,
      emojiMap: value,
    }));
  };

  /* changes the emoji at the given x,y position */
  const setEmojiAtPos = (x, y, emoji, options) => {
    if (!stateRef.current.emojiMap[x]) return;

    /* need to override the options every time or they linger */
    const _options = {
      ...EMOJI_OPTION_KEYS,
      ...options,
    };

    setState(prev => {
      let tmpState = {...prev};
      tmpState.emojiMap[x][y] = {
        ...tmpState.emojiMap[x][y],
        emoji: emoji,
        ..._options,
      };
      return tmpState;
    });
  };

  /* returns the emoji at the given x,y position */
  const getEmojiAtPos = (x, y) => {
    return stateRef.current.emojiMap[x]
        ? stateRef.current.emojiMap[x][y] ?? {emoji: DEFAULT_EMOJI}
        : {emoji: DEFAULT_EMOJI};
  };

  /* resets the grid to the initial value */
  const resetEmojiGrid = () => {
    const emojiMap = createEmojiArray(
        stateRef.current.gridSize.rows,
        stateRef.current.gridSize.cols,
        'SPACE',
    );
    setState(prev => ({
      ...prev,
      emojiMap: emojiMap,
    }));
  };

  const value = {
    getEmojiMap,
    getGridSize,
    getActiveEmojiBrush,
    getEmojiAtPos,
    getEditorActive,
    getActiveBrushOptions,
    setGridSize,
    setActiveBrushOptions,
    setEditorActive,
    setEmojiMap,
    setEmojiAtPos,
    setActiveEmojiBrush,
    resetEmojiGrid,
  };

  return (
      <MegaverseGridContext.Provider value={ value }>
        { children }
      </MegaverseGridContext.Provider>
  );
};
