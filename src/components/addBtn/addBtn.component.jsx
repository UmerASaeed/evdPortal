import React from "react"
import { connect } from "react-redux";
import PopUp from "../popUp/popUp.component" 
import {TogglePopUp,closePopUp} from "../../redux/popUp/popUp-actions"

import "./addBtn.styles.css"

const AddBtn = ({clientName,purpose,id,name,purp,togglePopUp,closeVal,ClosePopUp}) =>
{
    const displayPopUp = () =>
    {
        let details = {clientName,purpose}
        togglePopUp(details)
        ClosePopUp()
    }

    return(
        <div className="addBtnn">
            <div className="addBtn">
                <p className="addSign" onClick={displayPopUp}> + </p>
            </div> 
            {   
               purpose === "payment" ? 
               <div className={clientName === name && purp === "payment" ? "pop" : "popUpHidden" }>
                    <PopUp header="Receive Payment" clientName={clientName} purpose="payment" id={id} closeVal={!closeVal}/> 
                </div>
               :purpose === "wallet" ? 
               <div className={clientName === name && purp === "wallet" ? "pop" : "popUpHidden" }>
                    <PopUp header="Receive Payment" clientName={clientName} purpose="wallet" id={id} closeVal={!closeVal}/> 
                </div>
                :null
            }
         </div>
    );
}
const mapDispatchToProps = dispatch =>
{
    return{
        togglePopUp:(client,purpose)=>dispatch(TogglePopUp(client,purpose)),
        ClosePopUp:()=>dispatch(closePopUp())
    }
}

const mapStateToProps = state =>
{
    return{
        name:state.popUp.details.clientName,
        purp:state.popUp.details.purpose,
        closeVal:state.popUp.closePopUp
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBtn);