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
import Sales from "../../sections/Sales/sales-main"
import SalesVouchers from "../../sections/Sales/SalesVouchers/SalesVouchers"
import NewSale from "../../sections/Sales/newSale/newSale"
import VendorsMain from "../../sections/Vendors/Vendors-Main/vendorsMain"
import NewVendor from "../../sections/Vendors/NewVendor/newVendor"
import EditVendor from "../../sections/Vendors/EditVendor/editVendor"
import GlobalSearch from "../../sections/Search/searchMain"
import DownloadReport from "../../sections/reports/downloadReport/reportsMain"
import SalesReport from "../../sections/reports/salesReport/salesReport"
import WalletReport from "../../sections/reports/walletReport/walletReport"
import PaymentReport from "../../sections/reports/paymentReport/paymentReport"
import PurchaseReport from "../../sections/reports/purchaseReport/purchaseReport"
import InventoryUsage from "../../sections/reports/invenUsage/invenUsage"
import InventoryReport from "../../sections/reports/inventoryReport/inventoryReport"
import UpdateClient from "../../sections/Clients/EditUser/editUser"
import UpdateStaff from "../../sections/Staff/editStaff/editStaff"
import "./adminPage.css"

const AdminPage = ({currentSection}) => 
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
                        <Route exact path="/" render={()=>currentSection ? <Redirect to = {`${currentSection}`}/> : null } />
                        <Route exact path="/Clients" component={Clients}/>
                        <Route exact path="/Clients/addClient" component={AddClient}/>
                        <Route exact path="/Clients/EditClient" component={UpdateClient}/>
                        <Route exact path="/Staff" component={Staff} />
                        <Route exact path="/Staff/addStaff" component={addStaff}/>
                        <Route exact path="/Staff/EditStaff" component={UpdateStaff}/>
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
                        <Route exact path="/Sales" component={Sales}/>
                        <Route exact path="/Sales/ViewVouchers" component={SalesVouchers}/>
                        <Route exact path="/Sales/NewSale" component={NewSale}/>
                        <Route exact path="/Vendors" component={VendorsMain}/>
                        <Route exact path="/Vendors/NewVendor" component={NewVendor}/>
                        <Route exact path="/Vendors/EditVendor" component={EditVendor}/>
                        <Route exact path="/Search" component={GlobalSearch}/>
                        <Route exact path="/Reports" component={DownloadReport}/>
                        <Route exact path="/Reports/SalesReport" component={SalesReport}/>
                        <Route exact path="/Reports/WalletReport" component={WalletReport}/>
                        <Route exact path="/Reports/PaymentReport" component={PaymentReport}/>
                        <Route exact path="/Reports/PurchaseReport" component={PurchaseReport}/>
                        <Route exact path="/Reports/InventoryUsage" component={InventoryUsage}/>
                        <Route exact path="/Reports/InventoryReport" component={InventoryReport}/>
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

 