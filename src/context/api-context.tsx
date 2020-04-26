import React, { useEffect, useReducer } from 'react';
import { default as api } from '../utils/api';
import { ApiPostCall, ApiEditCall, ApiDataProviderProps, Data } from '../types/types';

type Action = { type: string, payload: Data };
type Dispatch = (action: Action) => void;

export const apiStateContext = React.createContext<Data>({loading: true, data: []});
export const apiDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const apiReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'get': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    case 'post': {
      const updatedData = [...state.data, action.payload.data];
      return {loading: action.payload.loading, data: updatedData};
    }
    case 'edit': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    case 'delete': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
};

export const getData = async (dispatch: Dispatch) => {
  const data = await api.getList();
  dispatch({
    type: 'get',
    payload: {
      loading: false,
      data,
    }
  });
};

export const postData = async (dispatch: Dispatch | undefined, data: ApiPostCall) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  const response =  await api.postListItem(data);
  dispatch({
    type: 'post',
    payload: {
      loading: false,
      data: response,
  }});
};

export const editData = async (dispatch: Dispatch | undefined, id: number, data: ApiEditCall) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  await api.editListItem(id, data);
  const response = await api.getList();

  dispatch({
    type: 'edit',
    payload: {
      loading: false,
      data: response,
  }});
};

export const deleteData = async (dispatch: Dispatch | undefined, id: number) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  await api.deleteListItem(id);
  const updatedData = await api.getList();

  dispatch({
    type: 'delete',
    payload: {
      loading: false,
      data: updatedData,
  }});
};

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
