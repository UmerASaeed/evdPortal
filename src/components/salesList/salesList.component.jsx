import React,{ useState} from "react"
import CustomButton from "../customButton/customButton.component"
import SalesPopUp from "../salesPopUp/salesPopUp.component"
import {fetchListDetailsStart,setCurrentOrder,getDownloadFileLink,cancelSale} from "../../redux/sales/sales.actions"
import { connect } from "react-redux"
import EyeLogo from "../../assets/eye.png"
import { useHistory, withRouter } from "react-router-dom"
import "./salesList.styles.css"

const SalesListComp = ({sale,fetchListDetailsStart,OrderDetails,match,setCurrentOrder,getDownloadFileLink,cancelSale}) =>
{
    const [SalesPopUpVal,setSalesPopUpVal] = useState(false)
    
    const history = useHistory()

    const closePopUp = () =>
    {
        setSalesPopUpVal(false)
    }

    const openPopUp = async () =>
    {
        fetchListDetailsStart(sale.orderId)
        setSalesPopUpVal(true)
    }

    const salesVouchers = () =>
    {
        setCurrentOrder(sale.orderId)
        history.push(`${match.path}/ViewVouchers`)
    }

    const downloadFile = () =>
    {
        let order = {
            OrderId:sale.orderId
        }
        getDownloadFileLink(order)
    } 
    
    const CancelSale = () =>
    {
        cancelSale(sale.orderId)
    }

    return(
        <div className="sales-ListOrders">
            <div className="sales-clientName sales-width">{sale.customerName}</div>
            <div className="sales-time sales-width">{sale.saleTime}</div>
            <div className="sales-refrenceNo sales-width" onClick={openPopUp}>
                {sale.orderId}
                <img src={EyeLogo} height="15px" style={{marginLeft:"10px"}}/>
            </div>
            <div className="sales-vouchers sales-width" onClick={salesVouchers}>
                View
                <img src={EyeLogo} height="15px" style={{marginLeft:"10px"}}/>
            </div>
            <div className="salesPopUpVal">
               { SalesPopUpVal ? OrderDetails ? <SalesPopUp close={closePopUp} details={OrderDetails} /> : null : null}
            </div>
            <div className="sales-status sales-width">{sale.customerDownloads === 0 ? "Not yet Downloaded by Client" : "Client Downloaded(`${sale.customerDownloads}`)"}</div>
            <div className="sales-requestedBy sales-width">{sale.requestedBy}</div>
            <div className="sales-requestedUser sales-width">{sale.requesterUser}</div>
            <div className="sales-fileDownload sales-width" onClick={downloadFile}>
                <CustomButton btnText="download"/>
            </div>
            <div className="sales-cancel sales-width" onClick={CancelSale}>
                <CustomButton btnText="cancel" del={true}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        fetchListDetailsStart:(orderId)=>dispatch(fetchListDetailsStart(orderId)),
        setCurrentOrder:(orderId)=>dispatch(setCurrentOrder(orderId)),
        getDownloadFileLink:(orderId)=>dispatch(getDownloadFileLink(orderId)),
        cancelSale:(orderId)=>dispatch(cancelSale(orderId))
    }
}

const mapStateToProps = state =>
{
    return{
        OrderDetails:state.sales.OrderDetails
    }
}
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SalesListComp))