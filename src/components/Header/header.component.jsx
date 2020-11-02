import React from 'react'
import { connect } from 'react-redux';
import {ReactComponent as Logout} from "../../assets/logout.svg"
import {LogOut} from "../../redux/login/login.actions"

import "./header.styles.css"
const Header = ({LogOut}) =>
{
    const logOut = () =>
    {
        LogOut()
    }

    return(
        <div className="header">
           <div className="signOut" onClick={logOut}>
                <Logout className="logo" height='40px'/>
                <p className="logOut">Sign Out</p>
           </div> 
        </div>
    );
}

const mapDispatchToProps = dispatch =>
{
    return{
        LogOut:()=>dispatch(LogOut())
    }
}

export default connect(null,mapDispatchToProps)(Header) 