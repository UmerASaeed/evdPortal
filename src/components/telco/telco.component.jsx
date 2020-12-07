import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import CustomButton from "../customButton/customButton.component"
import {setCurrentTelco,DeleteTelcoStart,fetchTelecomStart,UploadLogo} from "../../redux/telecom/telecom-actions"
import {telcoManualUpdate} from "../../utils/fetching"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import WriteBtn from "../../assets/writeBtn.png"
import "./telco.styles.css"
import { useHistory } from 'react-router-dom'

const Telco = ({seq,enName,arName,imgSrc,telcoId,setCurrentTelco,DeleteTelcoStart,telcos,fetchTelecomStart,UploadLogo}) =>
{
    const nameRef = useRef()
    const nameArRef = useRef()
    const logoRef = useRef()
    const [edit,setEdit] = useState({name:false,nameAr:false})
    const [editTelco,setEditTelco] = useState({TelCoID:telcoId,name:enName,nameAra:arName,seqNo:seq})
    const [first,setFirst] = useState(false)
    const [img,setImg] = useState(false)
    const history = useHistory()

    const telcoEditPressed= () =>
    {
        let TelcoInfo={
            enName,
            telcoId
        }
        setCurrentTelco(TelcoInfo)
    }


    useEffect(()=>
    {
        if(first)
        {
            const update = async () =>
            {
                const resp = await telcoManualUpdate(editTelco)
                if (resp.status === 200)
                {
                    fetchTelecomStart()
                }
                
            }
            update()
        }
        else
        {
            setFirst(true)
        }

    },[editTelco])

    const nameEditPressed = () =>
    {
        nameRef.current.readOnly = false
        setEdit({...edit,name:true})
    } 

    const nameArEditPressed = () =>
    {
        nameArRef.current.readOnly = false
        setEdit({...edit,nameAr:true})
    } 
    
    const EditValue = (e) =>
    {
        const {name,value} = e.target
        if(name === "name")
        {
            nameRef.current.value = value
            nameRef.current.readOnly = true
            setEdit({...edit,name:false})
            setEditTelco({...editTelco,name:value})
        }
        else 
        {
            nameArRef.current.readOnly = true
            setEdit({...edit,nameAr:false})
            setEditTelco({...editTelco,nameAra:value})
        }
    } 
    
    const updateLogo = () =>
    {
        logoRef.current.click()
    }

    const getLogo = (e) =>
    {
        const fileList = e.target.files;
        let bodyFormData = new FormData()
        bodyFormData.append('image',fileList[0])
        bodyFormData.append("telCoId",telcoId)
        UploadLogo(bodyFormData)
        history.go()
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
            <div className="telco-name-en">
                <input type="text" ref={nameRef} name ="name" className={!edit.name ? "edit-name" :"edit-name-clicked"} defaultValue={editTelco.name} readOnly={true} onBlur={EditValue}/>
                <img src={WriteBtn} height="15px" onClick={nameEditPressed}/>
            </div>
            <div className="telco-name-ar">
                <input type="text" ref={nameArRef} name ="nameAr" dir="rtl" className={!edit.nameAr ? "edit-name" :"edit-name-clicked"} defaultValue={editTelco.nameAra} readOnly={true} onBlur={EditValue}/>
                <img src={WriteBtn} height="15px" onClick={nameArEditPressed}/>
            </div>
            <div className="telco-logo">
                <img src={imgSrc} alt="logo" height="38px" width="74px"/>
                <input type="file" ref={logoRef} style={{display:"none"}} onChange={getLogo}/>
                <img src={WriteBtn} height="15px" style={{marginLeft:"5px"}} onClick={updateLogo}/>
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
        DeleteTelcoStart:(telcoId)=>dispatch(DeleteTelcoStart(telcoId)),
        fetchTelecomStart:()=>dispatch(fetchTelecomStart()),
        UploadLogo:(body)=>dispatch(UploadLogo(body))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Telco)