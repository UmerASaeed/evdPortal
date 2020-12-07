import React, { useRef } from 'react'
import { connect } from 'react-redux'
import {closePopUp} from "../../redux/popUp/popUp-actions"
import {setEditBatch} from "../../redux/vouchers/vouchers-actions"
import ManageCat from "../manageCategories/manageCategories.component"
import EditBatch from "../editBatchDetails/editBatch.component"
import ClientPopUp from "../client-popUp/clientPopUp.component"
import "./popUp.styles.css"
import { useHistory } from 'react-router-dom'

const PopUp = ({header,clientName,purpose,id,ClosePopUp,closeVal,popUpType,setEditBatch,editBatchStatus}) =>
{
    
    const btnRef = useRef()
    const history = useHistory()

    if(editBatchStatus)
    {
        btnRef.current.click()
        history.go()
    }

    return(
        <div className = "popUp">
        {   closeVal ? null :
            <div>
                <div className="popUp-header">
                    <p className="header-name">{header}</p>
                    {
                        popUpType === "manageCategories" ? null :  
                        <button className='cross-btn' ref={btnRef} onClick={()=>
                        {  
                            if (popUpType === 'editBatch')
                            {
                                setEditBatch({data:{},status:false})
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

const mapStateToProps = state =>
{
    return{
        editBatchStatus:state.vouchers.editBatchStatus
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PopUp);