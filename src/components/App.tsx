import React from 'react';
import { ApiDataProvider } from '../context/api-context';
import Container from './container/container';
import './App.css';

function App() {
  return (
    <div className="App">
      <ApiDataProvider>
        <Container />
      </ApiDataProvider>
    </div>
  );
}

export default App;
