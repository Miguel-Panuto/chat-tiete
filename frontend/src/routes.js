import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Chat}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;