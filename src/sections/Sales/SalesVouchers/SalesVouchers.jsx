import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SubSection from "../../../components/subSection/subSection.component"
import {fetchSaleVoucherStart} from "../../../redux/sales/sales.actions"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import SaleVouchersComp from "../../../components/saleVouchers/saleVouchers.component"
import "./SalesVouchers.styles.css"
import { useHistory } from 'react-router-dom'

const SalesVouchers = ({currentOrder,fetchSaleVoucherStart,saleVouchers}) =>
{

    const history = useHistory()
    useEffect(()=>
    {
        if(currentOrder)
        {
            fetchSaleVoucherStart(currentOrder)
        }
    },[currentOrder])

    
    return(
        <div className="content">
            <div className="subText addClient-subText subHeader">
                <div style={{marginRight:"15px"}} onClick={()=>history.goBack()}>
                    <BackBtn/>
                </div>
                Sales/View Vouchers: {currentOrder}
            </div>
            <SubSection>
                <div className="salesVouchers">
                    <div className="salesVouchers-clientInfo">
                        <div className="salesVouchers-client">
                            <div style={{fontFamily:"HelveticaNeueCyr-Bold",fontSize:"18px"}}>Client</div>
                            <div className="salesVouchers-clientVal">{saleVouchers ? saleVouchers.clientName : null}</div>
                        </div>
                        <div className="salesVouchers-Reference">
                            <div style={{fontFamily:"HelveticaNeueCyr-Bold" ,fontSize:"18px"}}>Reference #</div>
                            <div  className="salesVouchers-refVal">{saleVouchers ? saleVouchers.orderId : null}</div>
                        </div>
                        <div className="salesVouchers-DownloadTime">
                            <div style={{fontFamily:"HelveticaNeueCyr-Bold" ,fontSize:"18px"}}>Download Time</div>
                            <div  className="salesVouchers-dtVal">{"filler"}</div>
                        </div>
                    </div>
                    <div className="salesVouchers-items">
                    {
                        saleVouchers ? saleVouchers.items.map((item,index)=>
                        {
                            return <SaleVouchersComp key={index} item={item}/>
                        }) : null
                    }
                    </div>
                </div>
            </SubSection>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        fetchSaleVoucherStart:(orderId) => dispatch(fetchSaleVoucherStart(orderId))
    }
}

const mapStateToProps = state =>
{
    return{
        currentOrder:state.sales.currentOrder,
        saleVouchers:state.sales.saleVouchers
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SalesVouchers)