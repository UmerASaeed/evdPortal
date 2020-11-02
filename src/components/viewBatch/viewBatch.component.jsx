import React, { useState } from "react"
import GCheckBox from "../greyedOutCheckBox/greyedCheckBox.component"
import CheckBox from "../checkBox/checkBox.component"
import {toggleDeleteVouchers} from "../../redux/vouchers/vouchers-actions"
import "./viewBatch.style.css"
import { connect } from "react-redux"

const ViewBatchComp = ({seq,sn,vn,status,referenceNo,saleTime,clientName,vId,toggleDeleteVouchers}) =>
{
    const [del,setDel] = useState(true)
    const deleteVocuher = () =>
    {
        let voucherInfo = {
            voucherId:vId,
        }

        if (del)
        {
            voucherInfo.status=true
            toggleDeleteVouchers(voucherInfo)
            setDel(false)
        }
        else
        {
            voucherInfo.status=false
            toggleDeleteVouchers(voucherInfo)
            setDel(true)
        }
    }

    return(
        <div className="viewBatch-content">
            <div className="cb">
                {
                    status ? <GCheckBox/> : <div onClick={deleteVocuher}><CheckBox/> </div>
                }
            </div>
            <div className="viewBatch-seq">{seq}</div>
            <div className="viewBatch-sn">{sn}</div>
            <div className="viewBatch-vn">{vn}</div>
            <div className="viewBatch-status">{status ? "Used" : "Unused" }</div>
            <div className="viewBatch-client">{clientName}</div>
            <div className="viewBatch-ReferenceNo">{referenceNo}</div>
            <div className="viewBatch-usedTime">{saleTime}</div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        toggleDeleteVouchers:(status)=>dispatch(toggleDeleteVouchers(status))  
    }
}

export default connect(null,mapDispatchToProps)(ViewBatchComp)