import React, { useState } from "react"
import { Redirect, withRouter } from "react-router-dom"
import CustomButton from "../customButton/customButton.component"
import "./staff.styles.css"

const StaffObj = ({id,fullName,userName,createdAt,permissions,match}) =>
{
    const [reroute,setreoroute] = useState(false)
    const perms = permissions.map((permission,index)=>{
        if (index%2===0)
        {
            return permission.name + "," + "\n"
        }
        else
        {
            return permission.name + "," + " "
        }
    })
    return(
        <div className='displayStaff'>
            {reroute ? <Redirect to={{pathname:`${match.path}/EditStaff`,state:id}}/> : null}
            <p className="staff-name">{fullName}</p>
            <p className="staff-username">{userName}</p>
            <p className="staff-createdAt">{createdAt}</p>
            <p className="staff-permissions">{perms}</p>
            <div className="staff-EditBtn" onClick={()=>{setreoroute(true)}}>
                <CustomButton btnText="Edit"/>
            </div>
        </div>
    );
}

export default withRouter(StaffObj)