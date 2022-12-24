import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function Navbar() {
  let {user} = useContext(AuthContext)
  return (
    <>
    <Link to="/">Home</Link>
    <span>|</span>
    {user ? (
      <p>Logout</p>
    ) : (
      <Link to="/login">Login</Link>
    )}

    {user && <p>Hello {user.id}</p>}
    </>
  );
}