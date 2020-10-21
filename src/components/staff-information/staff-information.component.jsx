import React, { useState } from 'react';
import { connect } from 'react-redux';
import {UpdateStaffInfo} from "../../redux/staff/staff-actions";
import "./staff-info.styles.css"

const StaffInfo = ({UpdateInfo,createStaff}) =>
{
    const [staffInfo,setStaffInfo] = useState({staffName:"",staffUserName:"",staffPass:""})

    const updateStaffInfo = (event) =>
    {
        const {name,value} = event.target;
        setStaffInfo({...staffInfo,[name]:value});
    }

    if (createStaff)
    {
        
    }

    return(
    <div className="staff-info">
        <h2 className="info-text">Information</h2>
            <div className="s-n">
                <p className="staff-n-inp">Staff Name</p>
                <input type="text" placeholder=" Staff Name" className="staff-name-inp" name="staffName" onChange={updateStaffInfo} />
            </div>
            <div className="s-u">
                <p className="staff-username-inp">Username</p>
                <input type="text" placeholder=" username" name="staffUserName" className="staff-user-inp" onChange={updateStaffInfo}/>
            </div>
            <div className="s-p">
                <p className="staff-pass">Password</p>
                <input type="password" placeholder=" ******" name="staffPass" className="staff-pass-inp" onChange={updateStaffInfo}/>
            </div>
    </div>
    );
}

const mapStateToProps = state =>
{
    return{
        createStaff:state.staff.createStaff
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        UpdateInfo: (staffInfo) => dispatch(UpdateStaffInfo(staffInfo))
    }
}

export default connect(null,mapDispatchToProps)(StaffInfo);

