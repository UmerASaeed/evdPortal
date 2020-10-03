import React from 'react'
import {ReactComponent as Logout} from "../../assets/logout.svg"

import "./header.styles.css"
const Header = () =>
{
    return(
        <div className="header">
           <div className="signOut">
                <Logout className="logo" height='40px'/>
                <p className="logOut">Sign Out</p>
           </div> 
        </div>
    );
}

export default Header