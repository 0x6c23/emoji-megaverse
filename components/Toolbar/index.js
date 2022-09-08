import React, {useContext, useState} from 'react';
import toast from 'react-hot-toast';
import {EmojiButton} from '/components/EmojiButton/index.js';
import {EMOJI_MAP, EMOJI_OPTIONS} from '/utils/emoji/index.js';
import {MegaverseGridContext} from '/contexts/MegaverseGridContext/index.js';
import {uploadCurrentMap} from '/utils/map/index.js';

const Toolbar = () => {
  const [/** ?string=*/ hovering, setHovering] = useState('');
  const [/** boolean=*/ loading, setLoading] = useState(false);

  const {setActiveEmojiBrush, getActiveEmojiBrush, getEmojiMap, resetEmojiGrid, setActiveBrushOptions} = useContext(
      MegaverseGridContext);

  /**
   * Get's called whenever a new brush is selected
   * @param {string} emoji - the selected emoji
   * @param {?Object} options - optional options like direction, color
   */
  const onBrushChange = (emoji, options = {}) => {
    /* when not applying defaults the crossmint API doesn't accept some emojs */
    setActiveBrushOptions({
      ...EMOJI_OPTIONS[emoji]?.defaults ?? {},
      ...options,
    });
    setActiveEmojiBrush(emoji);
  };

  const onUploadMap = async () => {
    setLoading(true);
    toast.success('Resetting current map and uploading new one...');

    const currentMap = getEmojiMap();
    try {
      await uploadCurrentMap(currentMap);
      toast.success('Done!');
    }
    catch (e) {
      toast.error(e.message);
    }

    setLoading(false);
  };

  /* for determining whether additional brush options are shown or not */
  const shouldShowBrushOptions = (emoji) => hovering &&
      EMOJI_OPTIONS.hasOwnProperty(emoji);

  return (
      <div className={ 'h-20 lg:h-auto w-3/4 lg:w-24 flex flex-row lg:flex-col items-center justify-center gap-2' }>

        {/* Reset button */ }
        <button onClick={ resetEmojiGrid } className={ 'h-20 w-20 bg-red-400 hover:bg-red-300 p-2 flex items-center' +
        ' justify-center rounded-md' }>
          <p className={ 'text-4xl text-purple-100 -mt-2 select-none' }>↻</p>
        </button>

        {/* Brushes */ }
        <div className={ 'flex relative flex-row lg:flex-col gap-0 lg:w-20 h-full bg-gray-100 rounded-md shadow-xl' }>
          { Object.keys(EMOJI_MAP).map(key => (
              <div
                  key={ key }
                  className={ 'relative w-full h-20 w-20 rounded-md ' +
                  (getActiveEmojiBrush() === key ?
                      'bg-green-200' :
                      '') }>

                <EmojiButton
                    onMouseEnter={ setHovering }
                    onMouseLeave={ () => setHovering(null) }
                    clickHandler={ onBrushChange }
                    classes={ 'w-full h-full flex items-center justify-center' }
                    emojiObject={ {emoji: key} } />

                {/* TODO: put into separate component? */ }
                {
                  shouldShowBrushOptions(key) && hovering === key &&
                  (
                      <div
                          onMouseEnter={ () => setHovering(key) }
                          onMouseLeave={ () => setHovering(null) }
                          className={ 'bg-gray-100 z-50 border-2 border-r-0 lg:border-r-2 border-t-2 lg:border-t-0 border-l-0 border-b-0 border-gray-600 ' +
                          'absolute h-full top-1/2 lg:top-0 lg:right-1/2 transform translate-y-10 lg:translate-y-0 -translate-x-16 lg:-translate-x-10  ' +
                          ' rounded-bl-md rounded-br-md lg:rounded-br-0 lg:rounded-tl-md flex flex-row overflow-hidden items-center' +
                          ' justify-center' }>

                        {/* Go through the options for this emoji and render*/ }
                        { Object.keys(EMOJI_OPTIONS[key]).
                                 filter(el => el !== 'defaults').
                                 map(optsKey => (
                                     <>
                                       { EMOJI_OPTIONS[key][optsKey].map(
                                           optsValue => (
                                               <EmojiButton
                                                   clickHandler={ () => onBrushChange(
                                                       key,
                                                       {[optsKey]: optsValue},
                                                   ) }
                                                   classes={ 'w-12 h-full p-6' }
                                                   emojiObject={ {emoji: key, [optsKey]: optsValue} } />
                                           )) }
                                     </>
                                 )) }
                      </div>
                  )
                }
              </div>
          )) }
        </div>

        {/* upload */ }
        <button disabled={ loading } onClick={ onUploadMap }
                className={ 'w-20 h-20 bg-green-400 hover:bg-green-300 p-2 flex ' +
                'items-center justify-center rounded-md cursor-pointer ' +
                (loading ? 'cursor-not-allowed' : '') }>
          <p className={ 'text-4xl text-purple-100 -mt-2 select-none' }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </p>
        </button>

      </div>
  );
};

export {Toolbar};
