import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const Main = lazy(() => import('../pages/main/main'));
const CityDetails = lazy(() => import('../pages/cityDetails/CityDetails'));
const Error404 = lazy(() => import('../pages/404/Error404'));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={Loading}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:city/:id" component={CityDetails} />
          <Route component={Error404} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
