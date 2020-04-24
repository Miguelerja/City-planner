import React, { useEffect, useReducer } from 'react';
import { default as api } from '../utils/api';
import { ApiPostCall, ApiDataProviderProps, Data } from '../types/types';

type Action = { type: string, payload: Data };
type Dispatch = (action: Action) => void;

export const apiStateContext = React.createContext<Data>({loading: true, data: []});
export const apiDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function apiReducer(state: Data, action: Action) {
  switch (action.type) {
    case 'get': {
      return {...state, loading: action.payload.loading, data: action.payload.data};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const ApiDataProvider = ({children}: ApiDataProviderProps) => {
  const [state, dispatch] = useReducer(apiReducer, {loading: true, data: []})

  const getData = async () => {
    const data = await api.getList();
    dispatch({
      type: 'get',
      payload: {
        loading: false,
        data,
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <apiStateContext.Provider value={state}>
      <apiDispatchContext.Provider value={dispatch}>
        {children}
      </apiDispatchContext.Provider>
    </apiStateContext.Provider>
  );
}

export const useApiPostData = async (data: ApiPostCall) => {
  const response = await api.postListItem(data);
  return response;
}
