import React from 'react'
import SubSection from "../../components/subSection/subSection.component"
import CustomButton from "../../components/customButton/customButton.component"
import {ClientTitles} from "../../assets/titles"
import "./clients.styles.css"

const Clients = () =>
{
    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Clients</h2>
                    <div className="options">
                        <input type="search" placeholder="Search" className="searchBar"/>
                        <CustomButton btnText="Add new client"/>
                    </div>
                </div>
            <SubSection titles={ClientTitles}/>
        </div>
    );
}

export default Clients