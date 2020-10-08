import React from 'react'
import {ManageProds} from "../../../assets/titles"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import "./ManageProducts.styles.css"
const ManageProducts = () =>
{
    return(
        <div className="content">
            <div className="subHeader">
                <h2 className="subText">Telecom/Manage Products:</h2>
                <div className="options">
                    <CustomButton btnText="Add new Product" />
                </div>
            </div>
            <SubSection titles={ManageProds}/>           
        </div>
    );
}

export default ManageProducts