import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import {MegaverseGridContext} from '/contexts/MegaverseGridContext/index.js';
import {getValidJson} from '/utils/json/index.js';
import {resetMap} from '/utils/map/index.js';

const SecretToolBar = () => {
  const {setEmojiMap, setGridSize, resetEmojiGrid} = useContext(
      MegaverseGridContext);

  const handleSelectPhase = async (/* number= */ phase) => {
    if (phase === 1) setGridSize({rows: 11, cols: 11});
    else if (phase === 2) setGridSize({rows: 30, cols: 30});

    /* clear old map before uploading new one */
    resetEmojiGrid();

    try {
      if(phase === 2) {
        await resetMap();
      }
      const res = await fetch(`/api/map/${ phase }`);
      if (res.ok) {
        const json = await res.json();
        const /** object|boolean= */parsed = getValidJson(json);
        if (parsed) {
          setEmojiMap(parsed);
        }
        else {
          toast.error('Could not parse API response');
        }
      }
      else {
        toast.error(`[${ res.status }]: Something went wrong!`);
      }
    } catch {
      resetEmojiGrid();
      toast.error("Something went wrong")
    }
  };

  return (
      <div className={ 'h-44 lg:h-2/4 w-2/4 lg:w-44 select-none' }>
        <div className={ 'flex flex-row lg:flex-col gap-4 h-full justify-between' }>
          <button
              onClick={ () => handleSelectPhase(1) }
              className={ 'transform hover:scale-105 transition-all' }>
            <img src={ '/arcade/secret_phase-1.png' }
                 className={ 'rounded-md  w-64 shadow-xl border border-1' } />
          </button>
          <button
              onClick={ () => handleSelectPhase(2) }
              className={ 'transform hover:scale-105 transition-all' }>
            <img src={ '/arcade/secret_phase-2.png' }
                 className={ 'rounded-md  w-64 shadow-xl border border-1' } />
          </button>
        </div>
      </div>
  );
};

export {SecretToolBar};
