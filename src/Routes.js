import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './containers/App';
import NotFound from './components/NotFound';
import RulesContainer from './containers/RulesContainer';
import EditRuleContainer from './containers/EditRuleContainer';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} >
          <IndexRoute component={RulesContainer} />
          <Route path="home" component={RulesContainer} />
          <Route path="rule(/:uuid)" component={EditRuleContainer} />
          <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes;