import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/*This will be the router*/}
            <Route path="/" exact component={Chat}/> {/*Main page*/}
            <Route path="/login" component={Login}/> {/*Login page*/}
            <Route path="/register" component={Register}/> {/*Register page*/}
        </Switch>
    </BrowserRouter>
);

export default Routes;