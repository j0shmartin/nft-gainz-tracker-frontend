import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const [auth,setAuth] = useState()
    const [loginResponse,setLoginResponse] = useState()
    const database = "https://nft-gainz.herokuapp.com/"
    let username
    
    const navigate = useNavigate()
    const location = useLocation()

   
    

    useEffect(async ()=>{
        console.log(loginResponse)
        if(loginResponse=="Success"){
            
            await fetch(`${database}users/isAuth`,{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "x-access-token": localStorage.getItem("token")
                }
            })
            .then(res => {
                res.json()
                console.log(res)
            })
            .then(data => data.isAuth ? username = data.username : null)
        }
    }, [loginResponse])

    
        const [userLogin, setUserLogin] = useState({username:"", password:""});
        
        const handleChange = (event) => {
            setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
        };
        
        const handleLogin = async (event) => {
            event.preventDefault()
            
            await fetch(`${database}auth/login`, {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userLogin)
            })
            .then(response=>response.json())
            .then(data=>localStorage.setItem("token", data.token))
            .then(navigate(`/${userLogin.username}`))

        }




    
        return (
            
        <form onSubmit={event => handleLogin(event)}>
            <input required
            name="username"
            onChange={handleChange}
            value = {userLogin.username}
            type="username"/>
            <input required
            name="password"
            onChange={handleChange}
            value={userLogin.password}
            type="password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
    
}

export default Login