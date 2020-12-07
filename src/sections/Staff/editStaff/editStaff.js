import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import CheckBox from "../../../components/checkBox/checkBox.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {getPerms,updateUser} from "../../../redux/clients/client-actions"


const UpdateStaff = ({perms,getPerms,updateUser,staffUpdated,location}) =>
{
    const [clientInfo,setClientInfo] = useState({Fullname:"",UserName:"",password:"",email:"",VATNumber:""})
    const [permIds,setPermIds] = useState({})
    const [reroute,setReroute] = useState(false)

    const permChecked = (id) =>
    {
        if (permIds[id])
        {
            setPermIds({...permIds,[id]:false})
        }
        else
        {
            setPermIds({...permIds,[id]:true})
        }
    }

    useEffect(()=>
    {
        getPerms()
    },[getPerms])

    const handleChange = (e) =>
    {
        const {name,value} = e.target
        setClientInfo({...clientInfo,[name]:value})
    }

    const createClient = () =>
    {  
        let permArray = []
        Object.entries(permIds).forEach(perm=>
        {
            if(perm[1])
            {
                permArray.push(parseInt(perm[0]))
            }
        })
        let client = {
            userID:location.state,
            Fullname:clientInfo.Fullname,
            UserName:clientInfo.UserName,
            email:clientInfo.email,
            VATNumber:clientInfo.VATNumber,
            Permissions:permArray

        }
        updateUser(client)
    }

    return(
        <div className='addClientPage'>
            {staffUpdated || reroute? <Redirect to="/Staff"/> : null}
            <div className="subText addClient-subText">
                <div style={{marginRight:"15px"}} onClick={()=>setReroute(true)}>
                    <BackBtn/>
                </div>
                Staff/Edit Staff
            </div>
            <div className="client-container addclient-container">
                <div className="sub-left addClient-subLeft">
                    <div className="info">
                        <h2 className="info-text"  style={{marginLeft:"9%"}}>Information</h2>
                            <div className="info-client">
                                <p className="info-client-name">Staff Name</p>
                                <input type="text" name="Fullname" placeholder=" Staff Name" className="clientName" onChange={handleChange}/>
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
                    </div>
                    <h2 className="permission-text"  style={{marginLeft:"9%"}}>Permissions</h2>
                    <div className="permission">
                    {
                       perms ? perms.map((perm,index)=>
                       {
                           if(!perm.forCustomer)
                           {
                            return  <div className="perm-row" key={index}>                  
                                        <div className="perm">
                                            <div onClick={()=>permChecked(perm.id)}> <CheckBox/></div>
                                            <p className="checkOption">{perm.name}</p>
                                        </div>
                                    </div>        
                           }
                       }) : null
                    }
                    
                    </div>
                </div>
            </div>
            <div className="createClientBtn" onClick={createClient}>
                <CustomButton btnText="Update Staff"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        getPerms:()=>dispatch(getPerms()),
        updateUser:(client)=>dispatch(updateUser(client))
    }
}

const mapStateToProps = state =>
{
    return{
        perms:state.clients.perms,
        staffUpdated:state.staff.staffUpdated
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateStaff);


