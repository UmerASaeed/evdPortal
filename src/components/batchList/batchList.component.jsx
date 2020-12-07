import React from "react"
import { connect } from "react-redux"
import {useHistory,withRouter} from "react-router-dom"
import CustomButton from "../customButton/customButton.component"
import {setEditBatch,setCurrentBatch,updateBatchActivation,CancelBatch} from "../../redux/vouchers/vouchers-actions"
import SwitchBtn from "../Switch/switch.component"
import "./batchList.styles.css"

const BatchList = ({time,telcoName,categoryName,nameEn,quantity,used,BatchNumber,supplierName,totalPrice,expiryDate,fileName,batchFilesID,setEditBatch,match,setCurrentBatch,active,updateBatchActivation,CancelBatch,itemPrice}) =>
{

    let history = useHistory()

    const updateActivation = () =>
    {
        let BatchInfo = {
            batchFileID:batchFilesID,
            Activate:!active
        }
        updateBatchActivation(BatchInfo)
    }

    const cancelBatch = () =>
    {
        CancelBatch(batchFilesID)
    }

    const openViewBatch = () =>
    {  
        setCurrentBatch(batchFilesID)
        history.push(`${match.path}/ViewBatch`)
    }

    return(
        <div className="vouchers-batchList">
            <div className="batch-option">
                <div className='batch-time'>{time}</div>
            </div>
            <div className="batch-option batch-brand">{telcoName}</div>
            <div className="batch-option batch-category">{categoryName}</div>
            <div className="batch-option batch-product">{nameEn}</div>
            <div className="batch-option batch-quantity">{quantity}</div>
            <div className="batch-option batch-used">{used}</div>
            <div className="batch-option batch-name">{BatchNumber}</div>
            <div className="batch-option batch-vendor">{!supplierName ? 'N/A' : supplierName }</div>
            <div className="batch-option batch-cost">{itemPrice}</div>
            <div className="batch-option batch-totalCost">{totalPrice}</div>
            <div className="batch-option batch-expiryDate">{expiryDate}</div>
            <div className="batch-option batch-fileName">{fileName}</div>
            <div className="batch-option batch-active" onClick={updateActivation}>
                <SwitchBtn checkVal={active}/>
            </div>
            <div className="batch-option viewBatch" onClick={openViewBatch} >
                <CustomButton btnText="View"/>
            </div>
            <div className="batch-option batch-edit" onClick={()=>{setEditBatch({data:{BatchNumber,batchFilesID},status:true})}}>
                <CustomButton btnText="edit"/>
            </div>
            <div className="batch-option batch-cancel" onClick={cancelBatch}>
                <CustomButton btnText="cancel" del={true}/>
            </div>            
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        setEditBatch:(status) => dispatch(setEditBatch(status)),
        setCurrentBatch:(batchID) => dispatch(setCurrentBatch(batchID)),
        updateBatchActivation:(batch) => dispatch(updateBatchActivation(batch)),
        CancelBatch:(id)=>dispatch(CancelBatch(id))
    }
}

export default withRouter(connect(null,mapDispatchToProps)(BatchList))