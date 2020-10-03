import React from 'react'
import SubSection from "../../components/subSection/subSection.component"
import CustomButton from "../../components/customButton/customButton.component"
import {StaffTitles} from "../../assets/titles"
import "./Staff.styles.css"

const Staff = () =>
{
    return(
        // <div className="content">
        //     <div className="subHeader">
        //             <h2 className="subText">Staff</h2>
        //             <div className="options">
        //                 <input type="search" placeholder="Search" className="searchBar"/>
        //                 <CustomButton btnText="Add new staff"/>
        //             </div>
        //         </div>
        //     <SubSection titles={StaffTitles}/>
        // </div>
        <div>
            <h1 style={{color:'#5495FD'}}>{'<---'}</h1>
        </div>
    );
}

export default Staff;