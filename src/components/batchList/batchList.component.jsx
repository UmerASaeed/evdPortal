import React from "react"
import CustomButton from "../customButton/customButton.component"
import "./batchList.styles.css"

const BatchList = ({time,telcoName,categoryName,nameEn,quantity,used,batchNumber,supplierName,totalPrice,expiryDate,fileName}) =>
{
    return(
        <div className="vouchers-batchList">
            <div className="batch-option batch-time">{time}</div>
            <div className="batch-option batch-brand">{telcoName}</div>
            <div className="batch-option batch-category">{categoryName}</div>
            <div className="batch-option batch-product">{nameEn}</div>
            <div className="batch-option batch-quantity">{quantity}</div>
            <div className="batch-option batch-used">{used}</div>
            <div className="batch-option batch-name">{batchNumber}</div>
            <div className="batch-option batch-vendor">{supplierName}</div>
            <div className="batch-option batch-cost">{}</div>
            <div className="batch-option batch-totalCost">{totalPrice}</div>
            <div className="batch-option batch-expiryDate">{expiryDate}</div>
            <div className="batch-option batch-fileName">{fileName}</div>
            <div className="batch-option batch-active"></div>
            <div className="batch-option viewBatch">
                <CustomButton btnText="View"/>
            </div>
            <div className="batch-option batch-edit">
                <CustomButton btnText="edit"/>
            </div>
            <div className="batch-option batch-cancel">
                <CustomButton btnText="cancel" del={true}/>
            </div>            
        </div>
    )
}

export default BatchList