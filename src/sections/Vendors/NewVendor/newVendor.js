import React, { useState } from "react"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import {CreateVendor} from "../../../redux/vendors/vendors.actions"
import { connect } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"

const NewVendor = ({CreateVendor,createVendorStatus}) =>
{
    const [vendorInfo,setVendorInfo] = useState({name:"",Desc:""})
    const history = useHistory()
    const handleChange = (e)=>
    {
        const {name,value} = e.target
        setVendorInfo({...vendorInfo,[name]:value})
    }

    const createVendor = () =>
    {
        if (vendorInfo.name !== "" && vendorInfo.Desc !== "")
        {
            CreateVendor(vendorInfo)
        }
    }

    return(
        <div className="telecom-content">
            {createVendorStatus ? <Redirect to="/Vendors"/> : null}
            <div className="subText addClient-subText add-telco-title">
                <div style={{marginRight:"15px"}} onClick={()=>history.goBack()}>
                    <BackBtn/>
                </div>
                Vendors / Add New Vendor
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
                    <div className="new-telecom" onClick={createVendor}>
                        <CustomButton btnText="Create New Vendor"/>
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
        CreateVendor:(vendor)=>dispatch(CreateVendor(vendor))
    }
}

const mapStateToProps = state =>
{
    return{
        createVendorStatus:state.vendors.createVendorStatus
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewVendor)