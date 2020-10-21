import React from 'react';
import SubSection from '../../../components/subSection/subSection.component';
import CustomButton from "../../../components/customButton/customButton.component";
import StaffInfo from "../../../components/staff-information/staff-information.component";
import StaffPerms from "../../../components/staff-perms/staff-perms.component";
import "./addStaff.styles.css";

const AddStaff = () =>
{
    return(
        <div className="content">
            <div className='addStaff-title'>
                <h2>Staff / Add New Staff</h2>
            </div>
            <SubSection half={true}>
                <StaffInfo/>             
                <br/>
                <h2 className="permission-text">Permissions</h2>
                <br/>
                <StaffPerms/>
            </SubSection>
            <div className="cstmBtn">
                <CustomButton btnText="CREATE NEW STAFF" />
            </div>
        </div>
    );
}

export default AddStaff