import React from "react"
import "./AddClient.styles.css"
import CheckBox from "../../../components/checkBox/checkBox.component"

const AddClient = () =>
{
    return(
        <div className='addClientPage'>
            <h2 className="subText">Clients/Add New Client</h2>
            <div className="client-container">
                <div className="sub-left">
                    <div className="info">
                        <h2 className="info-text">Information</h2>
                            <div className="staff">
                                <p>Client Name</p>
                                <input type="text" placeholder=" Client Name" className="clientName"/>
                            </div>
                            <div className="username">
                                <p>VAT #</p>
                                <input type="text" placeholder=" VAT # (optional)" className="vat"/>
                            </div>
                            <div className="username">
                                <p>PW E-mail</p>
                                <input type="text" placeholder=" Password Email" className="user-inp"/>
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
                    <br/><br/>
                    <h2 className="permission-text">Permissions</h2>
                    <br/>
                    <div className="permission">
                        <div className="first-two-client">
                            <div className="purchaseProd" >
                                <CheckBox/>
                                <p className="checkOption ">Purchase Products</p>
                            </div>
                            <div className="paymentReport" >
                                <CheckBox/>
                                <p className="checkOption">View Payments Report</p>
                            </div>
                        </div>  
                        <br/> 
                        <div className="second-two-client">
                            <div className="downloadFiles" >
                                <CheckBox/>
                                <p className="checkOption">Download Files</p>
                            </div>
                            <div className="WalletReport" >
                                <CheckBox/>
                                <p className="checkOption">View Wallet Report</p>
                            </div>
                        </div>  
                    </div>
                    </div>
                <div className="sub-right"></div>
            </div>
        </div>
    )
}

export default AddClient;