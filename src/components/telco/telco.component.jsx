import React from 'react'
import { connect } from 'react-redux'
import CustomButton from "../customButton/customButton.component"
import {setCurrentTelco,DeleteTelcoStart} from "../../redux/telecom/telecom-actions"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import "./telco.styles.css"

const Telco = ({seq,enName,arName,imgSrc,telcoId,setCurrentTelco,DeleteTelcoStart,telcos}) =>
{
    const telcoEditPressed= () =>
    {
        let TelcoInfo={
            enName,
            telcoId
        }
        setCurrentTelco(TelcoInfo)
    }

    
    const DeleteTelco = () =>
    {
        let telcoInfo = {
            telcos:null,
            telcoDelete:{
                "telCoId": telcoId
            }
        } 
        let newList = telcos.filter(telco => 
        {
            if (telco.telCoId!==telcoId)
            {
                return telco
            }
        })

        newList.forEach((telco,index) =>
        {
            telco.seqNo  = index + 1
        })
        telcoInfo.telcos = newList
        telcoInfo.size = newList.length
        DeleteTelcoStart(telcoInfo)
    }

    return(
        <div className="telcos" draggable>
            <div className="telco-sequence">
                <Drag/>
                <p style={{marginLeft:"20px"}}>{seq}</p>
            </div>
            <p className="telco-name-en">{enName}</p>
            <p className="telco-name-ar">{arName}</p>
            <div className="telco-logo">
                <img src={imgSrc} alt="logo" height="38px" width="74px"/>
            </div>
            <div className="telco-edit-btn">
                <CustomButton btnText="Edit" nav="ManageProducts" telcoEditPressed={telcoEditPressed}/>
            </div>
            <div className="telco-delete-btn">
                <CustomButton btnText="Delete" del="true" deleteTelco={DeleteTelco}/>
            </div>
        </div>        
    )
}

const mapStateToProps = state =>
{
    return{
        telcos:state.telecom.telcoList
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        setCurrentTelco:(telcoId)=>dispatch(setCurrentTelco(telcoId)),
        DeleteTelcoStart:(telcoId)=>dispatch(DeleteTelcoStart(telcoId)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Telco)