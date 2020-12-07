import React, { useState } from "react"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {EditVendorStart} from "../../../redux/vendors/vendors.actions"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"

const EditVendor = ({location,EditVendorStart,editVendorStatus}) =>
{
    const [vendorInfo,setVendorInfo] = useState({name:"",Desc:"",supplierId:location.state.supplierId})
    const [reroute,setreroute] = useState(false)

    const handleChange = (e)=>
    {
        const {name,value} = e.target
        setVendorInfo({...vendorInfo,[name]:value})
    }

    const editVendor = () =>
    {
        if (vendorInfo.name !== "" && vendorInfo.Desc !== "")
        {
            EditVendorStart(vendorInfo)
        }
    }

    return(
        <div className="telecom-content">
            {editVendorStatus || reroute  ? <Redirect to="/Vendors"/> : null}
           <div className="subText addClient-subText add-telco-title">
                <div style={{marginRight:"15px"}} onClick={()=>setreroute(true)}>
                    <BackBtn/>
                </div>
                Vendors / Edit Vendor
            </div>
            <SubSection quarter={true}>
            {
                <div>
                    <div className="telecom-info">
                        <h2 className="telecom-info-text">Information</h2>
                            <div className="telecom-name-en">
                                <p style={{width:"120px"}}>Vendor Name</p>
                                <input type="text" placeholder=" Vendor Name" className="tn-en" name="name" onChange={handleChange} required/>
                            </div>
                            <div className="telecom-name-ar">
                                <p style={{width:"120px"}}>Description</p>
                                <input type="text" placeholder=" Description" className="tn-ar" name="Desc" onChange={handleChange} required/>
                            </div>
                            
                    </div>
                    <div className="new-telecom" onClick={editVendor}>
                        <CustomButton btnText="Update Vendor"/>
                    </div>
                </div> 
            }    
            </SubSection>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        EditVendorStart:(vendor)=>dispatch(EditVendorStart(vendor))
    }
}

const mapStateToProps = state =>
{
    return{
        editVendorStatus:state.vendors.editVendorStatus
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditVendor))