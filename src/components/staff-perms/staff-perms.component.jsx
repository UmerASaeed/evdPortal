import React from 'react'
import CheckBox from "../checkBox/checkBox.component"
import "./staff-perms.styles.css"

const StaffPerms = () =>
{
    return(
        <div className="staff-permission">
            <div className="first-three-staff-perms">
                <div className="AddClients" >
                    <CheckBox/>
                    <p className="checkOption-staff">Add new clients</p>
                </div>
                <br/>
                <div className="ManageWallet" >
                    <CheckBox/>
                    <p className="checkOption-staff">Manage Client Wallet</p>
                </div>
                <br/>
                <div className="ReportC" >
                    <CheckBox/>
                    <p className="checkOption-staff">View Report C</p>
                </div>
            </div>  
            <div className="second-three-staff-perms">
                <div className="ReportA" >
                    <CheckBox/>
                    <p className="checkOption-staff">View Report A</p>
                </div>
                <br/>
                <div className="ReportB" >
                    <CheckBox/>
                    <p className="checkOption-staff">View Report B</p>
                </div>
                <br/>
                <div className="UploadVoucher" >
                    <CheckBox/>
                    <p className="checkOption-staff">Can Upload Voucher</p>
                </div>
            </div>   
            </div>
    );
}

export default StaffPerms