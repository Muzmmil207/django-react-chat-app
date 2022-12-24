import React, { useContext } from "react";
import {Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function PrivateRoute({children, ...rest}) {
    let {user} = useContext(AuthContext)
    console.log('it works')
    console.log(user)
    return <Route {...rest}>{children}</Route>
    // return <Route {...rest}>{!user ? <redirect to="/login"/> : children}</Route>
}
