import React from 'react';

// Context Providers
import {MegaverseGridContextProvider} from '/contexts/MegaverseGridContext/index.js';
import {SecretCodeContextProvider} from '/contexts/SecretCodeContext/index.js';

/* pretty standard HOC to wrap the app in all contexts*/
const withContexts = Component => {
  return props => {
    return (
        <MegaverseGridContextProvider>
          <SecretCodeContextProvider>
            <Component { ...props } />
          </SecretCodeContextProvider>
        </MegaverseGridContextProvider>
    );
  };
};

export {withContexts};
