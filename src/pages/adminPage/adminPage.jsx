import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Navigator from "../../components/Navigator/navigator.component"
import Header from "../../components/Header/header.component"
import Clients from "../../sections/Clients/clients"
import Staff from "../../sections/Staff/Staff"

import "./adminPage.css"

const AdminPage = () => 
{
        return(
            <div className="admin">
                <div className='leftSide'>
                    <Navigator/>
                </div>
                <div className="rightSide">
                    <div className='head'>
                        <Header/>   
                    </div>
                    <Switch>
                        <Route exact path="/" render={()=><h1 className="filler">Select a Field!</h1>}/>
                        <Route exact path="/Clients" component={Clients}/>
                        <Route exact path="/Staff" component={Staff} />
                    </Switch>
                </div>
            </div>
        );   
}

export default AdminPage;

 