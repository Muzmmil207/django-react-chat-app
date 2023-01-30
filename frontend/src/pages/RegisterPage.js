import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function RegisterPage() {
    let { registerUser } = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={registerUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password1" placeholder="Enter Password" />
                <input type="password" name="password2" placeholder="Reded Password" />
                <input type="submit" />
            </form>
        </div>
    )
}

