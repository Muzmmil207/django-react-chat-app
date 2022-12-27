import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function HomePage(){
    let {user} = useContext(AuthContext)
    if (!user){
        return <Navigate replace to="/login"/>
    } else{
        return (

            <div><p>you are log in</p></div>
        )
    }
  
}

