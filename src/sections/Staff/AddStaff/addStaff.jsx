import React from 'react'
import SubSection from '../../../components/subSection/subSection.component'
import CheckBox from "../../../components/checkBox/checkBox.component"
import "./addStaff.styles.css" 
import CustomButton from "../../../components/customButton/customButton.component"

const AddStaff = () =>
{
    return(
        <div className="content">
            <div className='title'>
                <h2>Staff / Add New Staff</h2>
            </div>
            <SubSection half={true}>
                <div className="info">
                    <h2 className="info-text">Information</h2>
                        <div className="staff">
                            <p>Staff Name</p>
                            <input type="text" placeholder=" Staff Name" className="staff-inp"/>
                        </div>
                        <div className="username">
                            <p>Username</p>
                            <input type="text" placeholder=" username" className="user-inp"/>
                        </div>
                        <div className="pass">
                            <p>Password</p>
                            <input type="password" placeholder=" ******" className="pass-inp"/>
                        </div>
                </div>
                <h2 className="permission-text">Permissions</h2>
                <div className="permission">
                    <div className="first-two">
                        <div className="AddClients" >
                            <CheckBox/>
                            <p className="checkOption">Add new clients</p>
                        </div>
                        <div className="ReportA" >
                            <CheckBox/>
                            <p className="checkOption">View Report A</p>
                        </div>
                    </div>  
                    <br/> 
                    <div className="second-two">
                        <div className="ManageWallet" >
                            <CheckBox/>
                            <p className="checkOption">Manage Client Wallet</p>
                        </div>
                        <div className="ReportB" >
                            <CheckBox/>
                            <p className="checkOption">View Report B</p>
                        </div>
                    </div> 
                    <br/>
                    <div className="second-two">
                        <div className="ReportC" >
                            <CheckBox/>
                            <p className="checkOption">View Report C</p>
                        </div>
                        <div className="UploadVoucher" >
                            <CheckBox/>
                            <p className="checkOption">Can Upload Voucher</p>
                        </div>
                    </div>   
                </div>
            </SubSection>
            <div className="cstmBtn">
                <CustomButton btnText="CREATE NEW STAFF" />
            </div>
        </div>
    );
}

export default AddStaff