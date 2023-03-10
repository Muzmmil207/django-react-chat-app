import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { UsersNav } from "../components/UsersNav";


export function HomePage() {
    useEffect(() => {
        getUsers()
    }, [])

    let { user, authToken } = useContext(AuthContext)

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

    if (!user) {
        return <Navigate replace to="/login" />
    } else {
        return (
            <>
                <UsersNav />
                <Aside />
                <div>
                    {/* {usersData.map((user, idx) => (
                        <p key={idx}><Link to={`/chat/${user.id}`} >{user.username}</Link></p>
                    ))} */}

                </div>
            </>
        )
    }

}

