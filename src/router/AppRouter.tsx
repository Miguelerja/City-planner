import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Main } from '../pages/main/main';
import { CityDetails } from '../pages/cityDetails/CityDetails';
import { Error404 } from '../pages/404/Error404';


export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/:city/:id">
          <CityDetails />
        </Route>
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};
