import React, { useState } from "react"
import {Redirect} from "react-router-dom"
import CustomButton from "../customButton/customButton.component"
import "./vendors.styles.css"

const Vendors = ({vendor}) =>
{
    const [edit,setEdit] = useState(false)

    const editSupplier = () =>
    {
        setEdit(true) 
    }

    return(
        <div className="vendorsList">
        {   
            edit ? <Redirect to={{
                    pathname:"/Vendors/EditVendor",
                    state:{supplierId:vendor.supplierId}
                    }}/> 
                : null 
        }
            <div className="vendorName">{vendor.name}</div>
            <div className="vendor-date">{vendor.creationTime}</div>
            <div className="vendor-description">{vendor.desc}</div>
            <div className="vendor-editBtn" onClick={editSupplier}>
                <CustomButton btnText="edit" />
            </div>
        </div>
    )
}

export default Vendors