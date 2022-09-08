import React from 'react';

const ArcadeHeader = function() {
  return (
      <div className={ 'absolute top-52 left-1/2 transform -translate-x-1/2' }>
        <h1
            className={ 'select-none arcade -mt-28 mb-12 lg:mb-28 ml-56 text-[25px] lg:text-[50px] rotate-[-15deg] text-purple-300 ' }>
          Build your own
        </h1>
        <h1
            className="select-none -mt-14 lg:-mt-48 retro-font pointer-events-none font-normal
            tracking-[12px] text-white">
          Megaverse
        </h1>
      </div>
  );
};

export {ArcadeHeader};
