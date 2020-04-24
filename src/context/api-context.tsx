import React, { useState, useEffect } from 'react';
import { default as api } from '../utils/api';
import { ApiDataProviderProps, Data } from '../types/types';

export const apiDataContext = React.createContext<Data>({loading: true, data: []});

export const ApiDataProvider = ({children}: ApiDataProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await api.getPostList();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <apiDataContext.Provider value={{loading, data}}>
      {children}
    </apiDataContext.Provider>
  );
}
