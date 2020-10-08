import React, { useEffect,useState } from 'react'
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {StaffTitles} from "../../../assets/titles"
import {FetchStaffStart} from "../../../redux/staff/staff-actions"
import StaffObj from "../../../components/staff/staff.component"
import Spinner from "../../../components/spinner/spinner.component"
import "./Staff.styles.css"
import { connect } from 'react-redux'

const Staff = ({fetchStaff,staff,isFetching}) =>
{
    const [searchFor,setSearchFor] = useState("")
    let FilteredStaffs;
    let staffs;

    useEffect(()=>
    {
        fetchStaff()
    },[fetchStaff])


    const searchStaff = (event) =>
    {
        const {value} = event.target
        setSearchFor(value)
    }

    if (staff)
    {
        staffs = staff.data.filter(staff=>staff.isCustomer===false) 
    }


    if (staff)
    {
        FilteredStaffs = staffs.filter(staff =>
        {
            return staff.fullName.toLowerCase().includes(searchFor) 
        })
    }

    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Staff</h2>
                    <div className="options">
                        <input type="search" placeholder="Search" className="searchBar" onChange={searchStaff}/>
                        <CustomButton btnText="Add new staff" nav="addStaff" />
                    </div>
                </div>
            <SubSection titles={StaffTitles}>
            {
                isFetching ?
                <Spinner/>
                :staffs ? FilteredStaffs.map((staff,index)=>
                {
                    return <StaffObj key={index} fullName={staff.fullName} userName={staff.userName} createdAt={staff.createdAt} permissions={staff.permissions}/> 
                }):null
            }
            </SubSection>
        </div>
    );
}

const mapStateToProps = state =>
{
    return{
        staff:state.staff.StaffData,
        isFetching:state.staff.isfetching
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        fetchStaff:()=>dispatch(FetchStaffStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Staff);