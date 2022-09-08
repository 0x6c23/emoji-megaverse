import React, {createContext, useRef, useState} from 'react';

export const SecretCodeContext = createContext({});

export const SecretCodeContextProvider = ({
  children,
}) => {
  const [state, setState] = useState({
    isActive: false, // true after code was entered
  });

  const stateRef = useRef();
  stateRef.current = state;

  /* sets the current active state. */
  const setIsActive = val => {
    setState(prev => ({
      ...prev,
      isActive: val,
    }));
  };

  /* returns the current active state */
  const getIsActive = () => {
    return stateRef.current.isActive;
  };

  const value = {
    setIsActive,
    getIsActive
  };

  return (
      <SecretCodeContext.Provider value={ value }>
        { children }
      </SecretCodeContext.Provider>
  );
};
