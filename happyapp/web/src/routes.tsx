import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/landing/landing';
import OrfMap from './pages/maporg/orfMap';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrfMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;

