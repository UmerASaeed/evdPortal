import React, { useEffect } from "react"
import CustomButton from "../../../components/customButton/customButton.component"
import SubSection from "../../../components/subSection/subSection.component"
import ViewBatchComp from "../../../components/viewBatch/viewBatch.component"
import {fetchVouchersStart,deleteVouchersStart} from "../../../redux/vouchers/vouchers-actions"
import {ViewBatchList} from "../../../assets/titles"
import "./viewBatch.styles.css"
import { connect } from "react-redux"

const ViewBatch = ({currentBatch,fetchVouchersStart,batchVouchers,deleteVoucherList,deleteVouchersStart,deleteVoucherSuccess}) =>
{
    useEffect(()=>
    {
        fetchVouchersStart(currentBatch)
    },[currentBatch])

    useEffect(()=>
    {
        if (deleteVoucherSuccess)
        {
            fetchVouchersStart(currentBatch)
        }
    },[deleteVoucherSuccess])

    const deleteVouchers =  () =>
    {
        let voucherList = []
        Object.entries(deleteVoucherList).forEach(voucher=>
        {
            if (voucher[1])
            {
                voucherList.push(parseInt(voucher[0]))
            }  
        })
        deleteVouchersStart(voucherList)

    }

    return(
        <div className="content">
        <div className="subHeader">
                <h2 className="subText">Vouchers/View Batch: </h2>
                <div className="options">
                    <div className="" onClick={deleteVouchers}>
                        <CustomButton btnText="DELETE SELECTED VOUCHERS" del={true}/>
                    </div>
                </div>
        </div>
        <SubSection titles={ViewBatchList} viewBatch = {true}>
        {
             batchVouchers ? batchVouchers.map((voucher,index)=>
            {
               return <ViewBatchComp key={index} seq={index+1} sn={voucher.serialNumber} vn={voucher.voucherPin} status={voucher.sold} referenceNo={voucher.orderId} saleTime={voucher.saleTime} clientName={voucher.clientName}  vId={voucher.voucherId}/> 
            })
            : null 
        }          
        </SubSection>
    </div>
    )
}

const mapStateToProps = state =>
{
    return{
        currentBatch:state.vouchers.currentBatch,
        batchVouchers:state.vouchers.batchVouchers,
        deleteVoucherList:state.vouchers.deleteVoucherList,
        deleteVoucherSuccess:state.vouchers.deleteVoucherSuccess
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        fetchVouchersStart:(batchID)=>dispatch(fetchVouchersStart(batchID)),
        deleteVouchersStart:(voucherList)=>dispatch(deleteVouchersStart(voucherList))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewBatch);