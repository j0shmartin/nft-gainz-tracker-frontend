import React from "react";

async function IsAuth() {
    
    const database = "https://nft-gainz.herokuapp.com/"
    const response = await fetch(`${database}users/isAuth`, {
       headers: {
          "x-access-token": localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*"
       }
    });
    const data = await response.json();
    const isAuth = await data.isAuth;
    return isAuth;
 
 }

 export default IsAuth
    