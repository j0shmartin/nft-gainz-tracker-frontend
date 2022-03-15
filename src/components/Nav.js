import React, {useState} from "react"
import { Link } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";

const Nav = (props) => {
   return (
       <div>
           <ul>
                <li><Link to='/'>Home</Link></li>
       </ul>
       <Login />
       <Logout />
       </div>
   )

};

export default Nav