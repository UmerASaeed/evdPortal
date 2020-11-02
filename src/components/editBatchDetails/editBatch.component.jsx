import React from 'react'
import "./editBatch.styles.css"

const EditBatch = () =>
{
    return(
        <div className="EditBatch">
            <div className="editBatch-BatchName"> Batch: </div>
            <div className="editBatch-expiryDate">
                <p className="eB-header">Expiry Date</p>
                <input type="date" className="eB-option"/>
            </div>
        </div>
    )
}

export default EditBatch