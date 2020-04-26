import React from 'react';
import { ApiDataProvider } from '../context/api-context';
import AppRouter from '../router/AppRouter';

const App = () => {
  return (
    <ApiDataProvider>
      <AppRouter />
    </ApiDataProvider>
  );
}

export default App;
