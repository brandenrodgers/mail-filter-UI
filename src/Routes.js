import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './containers/App';
import NotFound from './components/NotFound';
import UsersContainer from './containers/UsersContainer';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} >
          <IndexRoute component={UsersContainer} />
          <Route path="home" component={UsersContainer} />
          <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes;