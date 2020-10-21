import React, { useState } from 'react'
import { connect } from 'react-redux'
import {UpdateStart,UpdateWalletStart,UpdatePaymentStart} from "../../redux/clients/client-actions"
import CustomButton from "../customButton/customButton.component"
import "./client-popUp.styles.css"

const ClientPopUp = ({clientName,purpose,id,updateStart,updateWalletStart,updatePaymentStart}) =>
{
    const [clientId,setClientId] = useState(0)
    const [amount,setAmount] = useState(0)
    const [description,setDescription] = useState("")

    const onAmountChange = (event)=>
    {
        let {value}=event.target
        value= parseInt(value)
        setClientId(id)
        setAmount(value)
    } 

    const onDescriptionChange = (event)=>
    {
        const {value}=event.target
        setDescription(value)
    } 


    const UpdateWallet1 = () =>
    {
        let clientDetail = {
            id:clientId,
            amount,
            description
        }
        updateStart()
        updateWalletStart(clientDetail)
    }

    const Updatepayment = () =>
    {
        let clientDetail = {
            id:clientId,
            amount,
            description
        }
        updateStart()
        updatePaymentStart(clientDetail)
    }

    return(
        <div className={purpose==="payment"? "popUpPaymentContent" :"popUpContent"}>
            <p className="popUpClientName" >Client: {clientName}</p>
            <br/>
            <div className="wallet-fields">
                <div className="wallet-field1">
                    <p>Enter amount to add</p>
                    <input className="enter-amount" type="text" onChange={onAmountChange}/>
                </div>
                {
                    purpose === "payment" ? 
                    <div className="wallet-fieldMid">
                        <p>Payment Mode</p>
                        <input className="enter-mode" type="text" value="Bank" readOnly/>
                    </div>
                    : null
                }
                <div className="wallet-field2">
                    <p>Description</p>
                    <input className="field2-description" type="text" onChange={onDescriptionChange}/>
                </div>
                <br/>
            <div className="popUpBtn-addWallet">
                {
                    purpose === "payment" ? <CustomButton btnText="Recieve Payment" click={Updatepayment}/> : purpose === "wallet" ? <CustomButton btnText="Add to wallet" click={UpdateWallet1}/> :null
                }
            </div>
            </div>
        </div>    
    );
}


const mapDispatchToProps = dispatch =>
{
    return{
        updateStart:()=>dispatch(UpdateStart()),
        updateWalletStart:(customerDetail)=>dispatch(UpdateWalletStart(customerDetail)),
        updatePaymentStart:(customerDetail)=>dispatch(UpdatePaymentStart(customerDetail))
    }
}

export default connect(null,mapDispatchToProps)(ClientPopUp)