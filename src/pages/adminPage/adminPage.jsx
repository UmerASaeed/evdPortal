import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router-dom'

import Navigator from "../../components/Navigator/navigator.component"
import Header from "../../components/Header/header.component"
import Clients from "../../sections/Clients/Clients-Main/clients"
import AddClient from "../../sections/Clients/AddClient/AddClient"
import Staff from "../../sections/Staff/StaffScreen/Staff"
import addStaff from "../../sections/Staff/AddStaff/addStaff"
import Telecom from "../../sections/Telecom/Telecom-Main/Telecom"
import ManageProducts from "../../sections/Telecom/ManageProducts/ManageProducts"
import Addtelecom from "../../sections/Telecom/AddTelecom/Addtelecom"
import {Login} from "../../utils/fetching"
import "./adminPage.css"

const AdminPage = () => 
{       
        useEffect(()=>
        {
            Login()
        },[])
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
                        <Route exact path="/Clients/addClient" component={AddClient}/>
                        <Route exact path="/Staff" component={Staff} />
                        <Route exact path="/Staff/addStaff" component={addStaff}/>
                        <Route exact path="/Telecom" component={Telecom}/>
                        <Route exact path="/Telecom/ManageProducts" component={ManageProducts}/>
                        <Route exact path="/Telecom/addTelecom" component={Addtelecom}/>
                    </Switch>
                </div>
            </div>
        );   
}

export default AdminPage;

 