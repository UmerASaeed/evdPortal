import React from "react"
import CustomButton from "../customButton/customButton.component"
import "./staff.styles.css"

const StaffObj = ({fullName,userName,createdAt,permissions}) =>
{
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
            <p className="staff-name">{fullName}</p>
            <p className="staff-username">{userName}</p>
            <p className="staff-createdAt">{createdAt}</p>
            <p className="staff-permissions">{perms}</p>
            <div className="staff-EditBtn">
                <CustomButton btnText="Edit"/>
            </div>
        </div>
    );
}

export default StaffObj