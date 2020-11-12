import React, { useState } from "react"
import CheckBox from "../../../components/checkBox/checkBox.component"
import CustomButton from "../../../components/customButton/customButton.component"
import "./AddClient.styles.css"

const AddClient = () =>
{
    const [clientInfo,setClientInfo] = useState({Fullname:"",UserName:"",password:"",email:"",isCustomer:false,VATNumber:"",Permissions:[]})

    const handleChange = (e) =>
    {
        const {name,value} = e.target
        setClientInfo({...clientInfo,[name]:value})
    }

    return(
        <div className='addClientPage'>
            <h2 className="subText">Clients/Add New Client</h2>
            <div className="client-container">
                <div className="sub-left">
                    <div className="info">
                        <h2 className="info-text">Information</h2>
                            <div className="info-client">
                                <p className="info-client-name">Client Name</p>
                                <input type="text" name="FullName" placeholder=" Client Name" className="clientName" onChange={handleChange}/>
                            </div>
                            <div className="vat-client">
                                <p className="vat-num">VAT #</p>
                                <input type="text" name="VATNumber" placeholder=" VAT # (optional)" className="vat" onChange={handleChange}/>
                            </div>
                            <div className="email-client">
                                <p className="pw-email">E-mail</p>
                                <input type="text" name="email" placeholder=" Password Email" className="email-pw" onChange={handleChange}/>
                            </div>
                            <div className="username-client">
                                <p className="client-username1">Username</p>
                                <input type="text" name="UserName" placeholder=" username" className="client-user-inp" onChange={handleChange}/>
                            </div>
                            <div className="pass-client">
                                <p className="client-pass">Password</p>
                                <input type="password" name="password" placeholder=" ******" className="client-pass-inp" onChange={handleChange} />
                            </div>
                    </div>
                    <br/><br/>
                    <h2 className="permission-text">Permissions</h2>
                    <br/>
                    <div className="permission">
                        <div className="first-two-client">
                            <div className="purchaseProd" >
                                <CheckBox/>
                                <p className="checkOptionpP">Purchase Products</p>
                            </div>
                            <br/>
                            <div className="downloadFiles" >
                                <CheckBox/>
                                <p className="checkOptionDF">Download Files</p>
                            </div>
                        </div>  
                        <br/> 
                        <div className="second-two-client">
                            <div className="paymentReport" >
                                    <CheckBox/>
                                    <p className="checkOptionPR">View Payments Report</p>
                            </div>
                            <br/>
                            <div className="WalletReport" >
                                <CheckBox/>
                                <p className="checkOptionWR">View Wallet Report</p>
                            </div>
                        </div>  
                    </div>
                    </div>
                    <div className="createClientBtn">
                        <CustomButton btnText="Create New Client"/>
                    </div>
            </div>
        </div>
    )
}

export default AddClient;