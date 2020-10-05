import React from 'react'
import { Route, Redirect } from "react-router-dom";


function PrivateRoute({ authenticated, component: Component, ...rest }) {
    return (
        <Route exact {...rest} render={(props) => (
            authenticated === true
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}>
            
        </Route>
    )
}

export default PrivateRoute
