import React, { useEffect } from "react"
import { connect } from "react-redux"
import {VouchersList} from "../../../assets/titles"
import {FetchBatchStart} from "../../../redux/vouchers/vouchers-actions"
import { useHistory,withRouter } from 'react-router-dom'
import SubSection from "../../../components/subSection/subSection.component"
import BatchList from "../../../components/batchList/batchList.component"
import PopUp from "../../../components/popUp/popUp.component"
import CustomButton from "../../../components/customButton/customButton.component"

import "./vouchersMain.styles.css"

const VouchersMain = ({FetchBatchStart,batchList,editBatch,match}) =>
{
    const history = useHistory()
    useEffect(()=>
    {
        FetchBatchStart()
    },[FetchBatchStart])

    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Vouchers</h2>
                    <div className="options">
                        <div className="upload-voucher-btn" onClick={()=>history.push(`${match.path}/UploadBatch`)}>
                            <CustomButton btnText="upload"/>
                        </div>
                    </div>
            </div>
            <SubSection titles={VouchersList} vouchersTitle={true}>
            {
               batchList ? batchList.map((batch,index)=>
                   {
                     return <BatchList key={index} time={batch.time} telcoName={batch.telcoName} categoryName={batch.categoryName} nameEn={batch.nameEn} quantity={batch.quantity} used={batch.used} supplierName={batch.supplierName} totalPrice={batch.totalPrice} expiryDate={batch.expiryDate} fileName={batch.fileName} batchFilesID={batch.batchFilesId} active={batch.active} BatchNumber = {batch.batchNumber} itemPrice = {batch.itemPrice}/>
                   }
               ) : null
            }  
            { editBatch.status ? <div className="edit-batch-popup-position"><PopUp header="Edit Batch Details" popUpType="editBatch"/></div> : null }
            </SubSection>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        FetchBatchStart:()=>dispatch(FetchBatchStart())
    }
} 

const mapStateToProps = state =>
{
    return{
        batchList:state.vouchers.batchList,
        editBatch:state.vouchers.editBatch
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VouchersMain))