import React, { useEffect } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import Navigator from "../../components/Navigator/navigator.component"
import Header from "../../components/Header/header.component"
import Clients from "../../sections/Clients/Clients-Main/clients"
import AddClient from "../../sections/Clients/AddClient/AddClient"
import Staff from "../../sections/Staff/StaffScreen/Staff"
import addStaff from "../../sections/Staff/AddStaff/addStaff"
import Telecom from "../../sections/Telecom/Telecom-Main/Telecom"
import ManageProducts from "../../sections/Telecom/ManageProducts/ManageProducts"
import Addtelecom from "../../sections/Telecom/AddTelecom/Addtelecom"
import AddProduct from "../../sections/Telecom/addProduct/addProduct"
import VouchersMain from "../../sections/Vouchers/Vouchers-Main/vouchersMain"
import UploadVouchers from "../../sections/Vouchers/Upload-Vouchers/upload-vouchers"
import ViewBatch from "../../sections/Vouchers/viewBatch/viewBatch"
import Prices from "../../sections/Prices/Prices-Main"
import Restrictions from "../../sections/Restrictions/Restrictions-Main"
import CreateRestriction from  "../../sections/Restrictions/createRestriction/CreateRestriction"
import {Login} from "../../utils/fetching"

import "./adminPage.css"

const AdminPage = ({currentSection}) => 
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
                        <Route exact path="/" render={()=>currentSection ? <Redirect to = {`${currentSection}`}/> : null } />
                        <Route exact path="/Clients" component={Clients}/>
                        <Route exact path="/Clients/addClient" component={AddClient}/>
                        <Route exact path="/Staff" component={Staff} />
                        <Route exact path="/Staff/addStaff" component={addStaff}/>
                        <Route exact path="/Telecom" component={Telecom}/>
                        <Route exact path="/Telecom/ManageProducts" component={ManageProducts}/>
                        <Route exact path="/Telecom/addTelecom" component={Addtelecom}/>
                        <Route exact path="/Telecom/ManageProducts/addProduct" component={AddProduct}/>
                        <Route exact path="/Vouchers" component={VouchersMain}/>
                        <Route exact path="/Vouchers/UploadBatch" component={UploadVouchers}/>
                        <Route exact path="/Vouchers/ViewBatch" component={ViewBatch}/>
                        <Route exact path="/Prices" component={Prices}/>
                        <Route exact path="/Restrictions" component={Restrictions}/>
                        <Route exact path="/Restrictions/NewRestriction" component={CreateRestriction}/>
                    </Switch>
                </div>
            </div>
        );   
}

const mapStateToProps = state =>
{
    return{
        currentSection:state.section.currentSection
    }
}

export default connect(mapStateToProps)(AdminPage);

 