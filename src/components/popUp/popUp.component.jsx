import React from 'react'
import { connect } from 'react-redux'
import {closePopUp} from "../../redux/popUp/popUp-actions"
import ManageCat from "../manageCategories/manageCategories.component"
import ClientPopUp from "../client-popUp/clientPopUp.component"
import "./popUp.styles.css"

const PopUp = ({header,clientName,purpose,id,ClosePopUp,closeVal,popUpType}) =>
{
   
    return(
        <div className = "popUp">
        {   closeVal ? null :
            <div>
                <div className="popUp-header">
                    <p className="header-name">{header}</p>
                    {
                        popUpType === "manageCategories" ? null :  
                        <button className='cross-btn' onClick={()=>
                        {  
                            ClosePopUp()
                        }}>X</button>
                    }
                </div>
                {
                    popUpType === "manageCategories" ? <ManageCat/>
                    :<ClientPopUp clientName={clientName} purpose={purpose} id={id}/>
                }
              
            </div>
        }    
        </div>
    );
}

const mapDispatchToProps = dispatch =>
{
    return{
        ClosePopUp:()=>dispatch(closePopUp())    
    }
}

export default connect(null,mapDispatchToProps)(PopUp);