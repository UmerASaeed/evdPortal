import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect ,useHistory} from "react-router-dom"
import CheckBox from "../../../components/checkBox/checkBox.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import {getPerms,createClient} from "../../../redux/clients/client-actions"

const AddStaff = ({perms,getPerms,CreateClient,staffCreated}) =>
{
    const [clientInfo,setClientInfo] = useState({Fullname:"",UserName:"",password:"",email:"",VATNumber:""})
    const [permIds,setPermIds] = useState({})
    const history = useHistory()
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
        if (clientInfo.Fullname === "" || clientInfo.UserName === "" || clientInfo.password ==="" || clientInfo.email === "" )
        {
            console.log("Please Add All fields")
        } 
        else
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
                Fullname:clientInfo.Fullname,
                UserName:clientInfo.UserName,
                password:clientInfo.password,
                email:clientInfo.email,
                VATNumber:clientInfo.VATNumber,
                isCustomer:false,
                Permissions:permArray

            }
            CreateClient(client)
        }
    }

    return(
        <div className='addClientPage'>
            {staffCreated ? <Redirect to="/Staff"/> : null}
            <div className="subText addClient-subText">
                <div style={{marginRight:"15px"}} onClick={()=>history.goBack()}>
                    <BackBtn/>
                </div>
                Staff/Add New Staff
            </div>
            <div className="client-container addclient-container">
                <div className="sub-left addClient-subLeft">
                    <div className="info">
                        <h2 className="info-text" style={{marginLeft:"9%"}}>Information</h2>
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
                            <div className="pass-client">
                                <p className="client-pass">Password</p>
                                <input type="password" name="password" placeholder=" ******" className="client-pass-inp" onChange={handleChange} />
                            </div>
                    </div>
                    <h2 className="permission-text" style={{marginLeft:"9%"}}>Permissions</h2>
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
                <CustomButton btnText="Create New Staff"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        getPerms:()=>dispatch(getPerms()),
        CreateClient:(client)=>dispatch(createClient(client))
    }
}

const mapStateToProps = state =>
{
    return{
        perms:state.clients.perms,
        staffCreated:state.staff.staffCreated
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddStaff);


