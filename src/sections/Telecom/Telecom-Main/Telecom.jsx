import React from "react"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {TelecomTitles} from "../../../assets/titles"
import "./telecom.styles.css"

const Telecom = () =>
{
    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Telecom</h2>
                    <div className="options">
                        <input type="search" placeholder="Search" className="searchBar"/>
                        <CustomButton btnText="Manage Categories" nav="ManageProducts" />
                        <div className="nbsp"></div>
                        <CustomButton btnText="Add new Telecom" nav="addTelecom" />
                    </div>
                </div>
            <SubSection titles={TelecomTitles}/>
        </div>
    );
}

export default Telecom;