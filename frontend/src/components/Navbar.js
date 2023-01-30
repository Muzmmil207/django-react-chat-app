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
      <nav className="menu">
        <span><i class="bi bi-menu-app-fill"></i></span>

        {user ? (
          <ul>
            <li><Link onClick={logoutUser} >Logout</Link></li>
          </ul>
        ) : (
          <ul>
            <li><Link to="/register">register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        )}


      </nav>
    </header>
  );
}