import React from 'react';
import { ApiDataProvider } from '../context/api-context';
import { Main } from './main/main';

function App() {
  return (
    <ApiDataProvider>
      <Main />
    </ApiDataProvider>
  );
}

export default App;
