import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function Navbar() {
  let { user, logoutUser } = useContext(AuthContext)

  return (
    <header>
      <div className="home">
        <Link to="/">Home</Link>
      </div>
      <nav className="home">
        {user ? (

          <p onClick={logoutUser} >Logout</p>
        ) : (
          <div className="auth">
            <Link to="/register">regster</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>

      {user && <p>Hello {user.id}</p>}
    </header>
  );
}