import React from "react"
import { connect } from "react-redux"
import {useHistory,withRouter} from "react-router-dom"
import CustomButton from "../customButton/customButton.component"
import {setEditBatch,setCurrentBatch} from "../../redux/vouchers/vouchers-actions"
import SwitchBtn from "../Switch/switch.component"
import "./batchList.styles.css"

const BatchList = ({time,telcoName,categoryName,nameEn,quantity,used,batchNumber,supplierName,totalPrice,expiryDate,fileName,batchFilesID,setEditBatch,match,setCurrentBatch}) =>
{

    let history = useHistory()
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
            <div className="batch-option batch-name">{batchNumber}</div>
            <div className="batch-option batch-vendor">{!supplierName ? 'N/A' : supplierName }</div>
            <div className="batch-option batch-cost">{}</div>
            <div className="batch-option batch-totalCost">{totalPrice}</div>
            <div className="batch-option batch-expiryDate">{expiryDate}</div>
            <div className="batch-option batch-fileName">{fileName}</div>
            <div className="batch-option batch-active">
                <SwitchBtn/>
            </div>
            <div className="batch-option viewBatch" onClick={openViewBatch} >
                <CustomButton btnText="View"/>
            </div>
            <div className="batch-option batch-edit" onClick={()=>{setEditBatch(true)}}>
                <CustomButton btnText="edit"/>
            </div>
            <div className="batch-option batch-cancel">
                <CustomButton btnText="cancel" del={true}/>
            </div>            
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        setEditBatch:(status) => dispatch(setEditBatch(status)),
        setCurrentBatch:(batchID) => dispatch(setCurrentBatch(batchID))
    }
}

export default withRouter(connect(null,mapDispatchToProps)(BatchList))