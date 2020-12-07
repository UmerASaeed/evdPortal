import React,{useState} from 'react'
import { connect } from 'react-redux'
import CustomButton from "../../components/customButton/customButton.component"
import {editBatch} from "../../redux/vouchers/vouchers-actions"
import "./editBatch.styles.css"

const EditBatch = ({editBatch:{data},editBatchAction}) =>
{
    const [batch,setBatch] = useState({BatchFileID:data.batchFilesID,BatchNumber:"",ExpiryDate:"",IssueDate:"",ItemPrice:null,TotalPrice:null,supplierId:null})

    const handleChange = (e) =>
    {
        let {name,value} = e.target
        if(name === "ItemPrice" || name === "TotalPrice" )
        {
            value = parseInt(value)
        }

        setBatch({...batch,[name]:value})
    }

    const editVocuher = () =>
    {
        editBatchAction(batch)
    }

    return(
        <div className="EditBatch">
            <div className="editBatch-BatchName"> Batch: {data.BatchNumber}</div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Expiry Date</p>
                <input type="date" name="ExpiryDate" className="eB-option" onChange={handleChange}/>
            </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Issue Date</p>
                <input type="date" name="IssueDate" className="eB-option" onChange={handleChange}/>
            </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Batch Name</p>
                <input type="text" style={{width:"140px"}} name="BatchNumber" placeholder={data.BatchNumber} className="eB-option" onChange={handleChange}/>
            </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Vendor</p>
                <select style={{width:"150px",height:"25px"}} className="eB-option">
                    <option>Select Vendor</option>
                </select>
            </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Item Price</p>
                <input type="text" style={{width:"140px"}} name="ItemPrice" placeholder="Item Price" className="eB-option" onChange={handleChange}/>
            </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Cost</p>
                <input type="text" style={{width:"140px"}} placeholder="Cost" name="TotalPrice" className="eB-option" onChange={handleChange}/>
            </div>
            <div className="cB-editBatch" onClick={editVocuher}>
                <CustomButton btnText ="Update Voucher"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        editBatchAction:(batch)=>dispatch(editBatch((batch)))
    }
}

const mapStateToProps = state =>
{
    return{
        editBatch:state.vouchers.editBatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditBatch)