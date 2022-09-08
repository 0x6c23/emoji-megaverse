import React, {useContext} from 'react';
import {MegaverseGridContext} from '/contexts/MegaverseGridContext/index.js';
import {EmojiRenderer} from '/components/EmojiRenderer/index.js';

/**
 * Generic button which renders an emoji
 * @param {?function(string, object): null} clickHandler - onClick function
 * @param {?function(any): *} onMouseEnter - onClick function
 * @param {?function(any): *} onMouseLeave - onClick function
 * @param {string} classes - additional tailwind classes specifically for the button
 * @param {Object} emoji - emoji to render
 */
const EmojiButton = ({
  clickHandler = () => null,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
  classes = '',
  emojiObject,
}) => {
  const {emoji, ...opts} = emojiObject;

  const /** function(): boolean= */ {getEditorActive}
      = useContext(MegaverseGridContext);

  return (
      <>
        <button
            data-testid={'emoji-button'}
            onMouseEnter={ () => onMouseEnter(emoji) }
            onMouseLeave={ () => onMouseLeave(emoji) }
            onClick={ () => clickHandler(emoji, {}) }
            className={ 'relative rounded-md p-1 bg-transparent ' +
            (getEditorActive() ? ' hover:bg-purple-200 ' : '') + classes }>
          <EmojiRenderer emoji={ emoji } options={ opts } />
        </button>
      </>
  );
};

export {EmojiButton};
