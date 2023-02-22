import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function UsersNav() {
  let { authToken } = useContext(AuthContext)
  let [usersData, setUsersData] = useState([])
  let getUsers = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    setUsersData(data)
  }
  getUsers()
  return (
    <nav>
      <div className="users">
        {usersData.map((user, idx) => (
          <div className="user">
            <Link key={idx} to={`/chat/${user.id}`} >{user.username}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
}