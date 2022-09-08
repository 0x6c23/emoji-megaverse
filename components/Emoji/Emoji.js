import React from 'react';

/**
 * Emoji base class. Why use composition? It's preferred in react over inheritance:
 * https://reactjs.org/docs/composition-vs-inheritance.html
 * @param {?string} classes - additional tailwind classes to apply
 * @param {?Object} style - additional style to apply
 * @param emoji - string representation of emoji
 */
const Emoji = ({
  classes = '',
  style = {},
  emoji = 'SPACE',
}) => {
  /*
   * Why do we use images?
   * 1. Animations!
   * 2. Streamline emojis across platforms (different emojis for apple, windows, etc.)
   *      - Unified experience across all devices
   *      - Especially important for options like direction, e.g. the apple comet
   *      points top-left while all others point bottom-left. This introduces unnecessary complexity
   * We lose nice font scaling though :(
   * We could use a sprite-sheet here, but that seemed overkill for 4 emojis
   * */
  return (
      <>
        <div className={ classes } style={ style }>
          <img alt={'emoji-image'} className={ 'w-8 object-contain' } src={ `/emojis/${ emoji.toLowerCase() }.png` } />
        </div>
      </>
  );
};

export {Emoji};
