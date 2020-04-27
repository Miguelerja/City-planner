import React, { useEffect, useReducer } from 'react';
import { Data, Dispatch } from '../types/types';
import { apiReducer } from './reducer/apiReducer';
import { getData } from './dispatchers/apiDispatchers';

interface ApiDataProviderProps {
  children?: React.ReactNode;
}

export const apiStateContext = React.createContext<Data>({loading: true, data: []});
export const apiDispatchContext = React.createContext<Dispatch | undefined>(undefined);

export const ApiDataProvider = ({children}: ApiDataProviderProps) => {
  const [state, dispatch] = useReducer(apiReducer, {loading: true, data: []})

  useEffect(() => {
    getData(dispatch);
  }, []);

  return (
    <apiStateContext.Provider value={state}>
      <apiDispatchContext.Provider value={dispatch}>
        {children}
      </apiDispatchContext.Provider>
    </apiStateContext.Provider>
  );
}
