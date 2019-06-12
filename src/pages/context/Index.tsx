import React, { useReducer, useContext } from 'react';
import reducer from '../../store/reducer'
import initialState from '../../store/state'

const CountContext = React.createContext<any>([])

export const Provider = ({ children }: { children:any }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const contextValue = useContext(CountContext);
  return contextValue;
};
