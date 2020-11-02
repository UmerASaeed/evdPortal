import React from 'react'
import { connect } from 'react-redux'
import {closePopUp} from "../../redux/popUp/popUp-actions"
import {setEditBatch} from "../../redux/vouchers/vouchers-actions"
import ManageCat from "../manageCategories/manageCategories.component"
import EditBatch from "../editBatchDetails/editBatch.component"
import ClientPopUp from "../client-popUp/clientPopUp.component"
import "./popUp.styles.css"

const PopUp = ({header,clientName,purpose,id,ClosePopUp,closeVal,popUpType,setEditBatch}) =>
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
                            if (popUpType === 'editBatch')
                            {
                                setEditBatch(false)
                            }
                            else
                            {
                                ClosePopUp()
                            }
                        }}>X</button>
                    }
                </div>
                {
                    popUpType === "manageCategories" ? <ManageCat/> 
                    :popUpType === "editBatch" ? <EditBatch/>
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
        ClosePopUp:()=>dispatch(closePopUp()),
        setEditBatch:(status) => dispatch(setEditBatch(status))  
    }
}

export default connect(null,mapDispatchToProps)(PopUp);