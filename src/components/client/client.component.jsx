import React, { useState } from 'react'
import CustomButton from "../customButton/customButton.component"
import AddBtn from "../addBtn/addBtn.component"
import "./client.styles.css"
import {  Redirect,withRouter } from 'react-router-dom'

const Client = ({uid,id,fullName,currentCredit,paymentBalance,lastLogInAt,username,createdAt,match}) =>
{
    const [reroute,setreroute] = useState(false)
    return(
        <div className="displayClient">
            {reroute ? <Redirect to={{pathname:`${match.path}/EditClient`,state:uid}} /> : null}
            <p className="client-name">{fullName}</p>
            <div className="client-wallet">
                <p className="wallet-gap">{currentCredit}</p>
                <AddBtn clientName={fullName} purpose="wallet" id={id}/>
            </div>
            <div className="client-payment">
                <p className="payment-gap">{paymentBalance}</p>
                <AddBtn clientName={fullName} purpose="payment" id={id}/>
            </div>
            <p className="client-LastLogIn">{lastLogInAt}</p>
            <p className="client-username">{username}</p>
            <p className="client-createdAt">{createdAt}</p>
            <div className="client-edit-btn" onClick={()=>{setreroute(true)}}>
                <CustomButton btnText="Edit"/>
            </div>
        </div>
    );
}

export default withRouter(Client)