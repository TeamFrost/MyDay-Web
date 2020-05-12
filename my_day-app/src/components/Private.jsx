import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isUserLogged = localStorage.getItem('loggedUser');

export const Private = ({ component: Component, ...res }) => (
    <Route {...res} render={props => (
        isUserLogged ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)