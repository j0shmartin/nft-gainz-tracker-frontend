import React from "react";
import { useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div>
            <button
            onClick={handleLogout}
            type="button"
            name="logout"
            >Logout</button>
        </div>
    )
}

export default Logout