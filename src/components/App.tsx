import React from 'react';
import { ApiDataProvider } from '../context/api-context';
import Container from './container/container';

function App() {
  return (
    <ApiDataProvider>
      <Container />
    </ApiDataProvider>
  );
}

export default App;
