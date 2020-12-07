import React, { useEffect } from "react"
import CustomButton from "../../components/customButton/customButton.component"
import SubSection from "../../components/subSection/subSection.component"
import {SalesTitles} from "../../assets/titles"
import SalesListComp from "../../components/salesList/salesList.component"
import {fetchSaleListStart,clearFileLink} from "../../redux/sales/sales.actions"
import Spinner from "../../components/spinner/spinner.component"
import { connect } from "react-redux"
import { useHistory, withRouter } from "react-router-dom"

const Sales = ({fetchSaleListStart,salesList,match,fileLink,clearFileLink,cancelSaleStatus}) =>
{
    const history = useHistory()

    useEffect(()=>
    {
        fetchSaleListStart()
    },[])

    useEffect(()=>
    {
        if(fileLink)
        {
            let url = "http://localhost/StaffApp/api/Order/" + fileLink       
            window.open(url,'Download')
            clearFileLink()
        }

    },[fileLink])

    useEffect(()=>
    {
        if(cancelSaleStatus)
        {
            history.go()
        }

    },[cancelSaleStatus])
    
    return(
        <div className="content">
            <div className="subHeader">
                <h2 className="subText">Sales</h2>
                <div className="options" onClick={()=>{history.push(`${match.path}/NewSale`)}}>
                    <CustomButton btnText="New Sale"/>
                </div>
            </div>
            <SubSection titles={SalesTitles} salesTitles={true}>
            {
                salesList ? salesList.map((sale,index) =>
                {
                   return <SalesListComp sale={sale} key={index}/>
                }) : <Spinner/>
            }
            </SubSection>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        fetchSaleListStart:()=>dispatch(fetchSaleListStart()),
        clearFileLink:()=>dispatch(clearFileLink())
    }
}

const mapStateToProps = state =>
{
    return{
        salesList:state.sales.salesList,
        fileLink:state.sales.downloadFileLink,
        cancelSaleStatus:state.sales.cancelSaleStatus
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Sales));