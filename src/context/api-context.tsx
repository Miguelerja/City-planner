import React, { useState, useEffect } from 'react';
import { default as api } from '../utils/api';

interface ApiResponse {
  id: number,
  title: string,
  content: string,
  lat: string,
  long: string,
  image_url: string,
  created_at: string,
  updated_at: string
};

type Provider<T> = React.ComponentType<{
  value: T;
  children: React.ReactNode;
}>;

interface ApiDataProviderProps {
  children?: React.ReactNode;
}

type Data = {loading: boolean, data: Array<ApiResponse>};

export const apiDataContext = React.createContext<Data>({loading: true, data: []});

export const ApiDataProvider = ({children}: ApiDataProviderProps) => {
  const [loading, setLoading] = useState(true);
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
