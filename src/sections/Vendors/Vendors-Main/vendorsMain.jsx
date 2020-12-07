import React, { useEffect, useState } from "react"
import CustomButton from "../../../components/customButton/customButton.component"
import SubSection from "../../../components/subSection/subSection.component"
import {VendorTitles} from "../../../assets/titles"
import Vendors from "../../../components/vendors/vendors.component"
import { connect } from "react-redux"
import {GetVendors} from "../../../redux/vendors/vendors.actions"
import Spinner from "../../../components/spinner/spinner.component"
import { useHistory, withRouter } from "react-router-dom"

const VendorsMain = ({GetVendors,vendors,match}) =>
{
    const [search,setSearch] = useState("")
    let FilteredVendors;

    let history = useHistory()

    useEffect(()=>
    {
        GetVendors()
    },[])

    const SearchResult = (e) =>
    {
        setSearch(e.target.value)
    }


    if (vendors)
    {
        FilteredVendors = vendors.filter(vendor =>
        {
            return vendor.name.toLowerCase().includes(search) 
        })
    }

    return(
        <div className="content">
            <div className="subHeader">
                <h2 className="subText">Vendors</h2>
                <div className="options">
                    <input type="search" placeholder="Search" className="searchBar" onChange={SearchResult}/>
                    <div onClick={()=>{history.push(`${match.path}/NewVendor`)}}>
                        <CustomButton btnText="Add new vendor"/>
                    </div>                    
                </div>
            </div>
            <SubSection titles={VendorTitles}>
            {
                FilteredVendors ? FilteredVendors.map((vendor,index)=>
                {
                    return <Vendors vendor={vendor} key={index}/>

                }) : <Spinner/>
            }    
            </SubSection>
        </div>
    )
}

const mapDispatchToProps  = (dispatch) =>
{
    return{
        GetVendors:()=>dispatch(GetVendors())
    }
}

const mapStateToProps = state =>
{
    return{
        vendors:state.vendors.vendorsList
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VendorsMain))