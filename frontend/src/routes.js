import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Chat from './pages/Chat';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Chat}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;