import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApiDataProvider } from '../context/api-context';
import { Main } from './pages/main/main';
import { CityDetails } from './pages/cityDetails/CityDetails';

function App() {
  return (
    <ApiDataProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/:city/:id">
            <CityDetails />
          </Route>
        </Switch>
      </Router>
    </ApiDataProvider>
  );
}

export default App;
