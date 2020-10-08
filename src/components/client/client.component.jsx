import React from 'react'
import CustomButton from "../customButton/customButton.component"
import AddBtn from "../addBtn/addBtn.component"
import "./client.styles.css"

const Client = ({id,fullName,currentCredit,paymentBalance,lastLogInAt,username,createdAt}) =>
{
    return(
        <div className="displayClient">
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
            <CustomButton btnText="Edit"/>
        </div>
    );
}

export default Client