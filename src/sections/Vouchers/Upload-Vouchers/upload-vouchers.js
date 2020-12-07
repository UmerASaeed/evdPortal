import React,{useEffect, useState} from "react"
import { connect } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import CustomButton from "../../../components/customButton/customButton.component"
import {uploadVoucherStart,getProductId,ConfirmUpload,ClearVoucherErrors,ClearProdIdError} from "../../../redux/vouchers/vouchers-actions"
import SearchDD from "../../../components/SearchDrpDwn/SearchDD.component"
import {GetVendors} from "../../../redux/vendors/vendors.actions"
import "./upload-vouchers.styles.css"

const UploadVouchers = ({uploadVoucherStart,getProductId,productId,uploadingVoucherErrors,ConfirmUpload,voucherUploaded,ClearVoucherErrors,ClearProdIdError,GetVendors,vendors}) =>
{
    const [fileDetails,setFileDetails] = useState({telecom:"",product:"",expiryDate:null,batchName:"",vendor:"",cost:null,BatchNumber:null,issueDate:null,itemPrice:null})
    const [uploadedFile,setUploadFile] = useState(null);
    const [clicked,setClicked] = useState(true)
    const [fileDropped,setFileDropped] = useState(false)
    const [inputAllVal,setInputAllVal] = useState(false)
    const history = useHistory()

    useEffect(()=>
    {
        GetVendors()
    },[])

    const onValchange = (e) =>
    {
        const {name,value} = e.target
        if (name==="telecom" || name==="product")
        {
            ClearProdIdError()
            ClearVoucherErrors()
        }
        setFileDetails({...fileDetails,[name]:value})
    }

    const scanFile = () =>
    {
        setClicked(clicked => !clicked)
        let data = {
            telecom:fileDetails.telecom,
            product:fileDetails.product
        }
        getProductId(data)
    }

    useEffect(()=>
    {
        if (productId!==null && productId!=="No such Brand or Product")
        {
            let bodyFormData = new FormData()
            bodyFormData.append('file',uploadedFile)
            bodyFormData.append("SupplierID",fileDetails.vendor)
            bodyFormData.append("ProductID",productId)
            ClearProdIdError()
            uploadVoucherStart(bodyFormData)
        }    
    },[productId,clicked])

    useEffect(()=>
    {
        ClearVoucherErrors()
    },[])

    const check = (e) =>
    {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const drop = (e) =>
    {   
        e.stopPropagation()
        e.preventDefault()
        ClearVoucherErrors()
        setFileDropped(true)
        setUploadFile(e.dataTransfer.items[0].getAsFile())
    }
    
    const confirmUpload = () =>
    {
        if (!fileDetails.expiryDate || !fileDetails.issueDate || !fileDetails.BatchNumber || !fileDetails.itemPrice || !fileDetails.cost )
        {
            setInputAllVal(true)
        }
        else
        {
            let fileData = {
                batchFileID:uploadingVoucherErrors.batchFileID,
                quantity:uploadingVoucherErrors.quantity,
                expiryDate:fileDetails.expiryDate,
                issueDate:fileDetails.issueDate,
                BatchNumber:fileDetails.BatchNumber,
                itemPrice:parseInt(fileDetails.itemPrice),
                totalPrice:parseInt(fileDetails.cost)
            }
            setInputAllVal(false)
            ConfirmUpload(fileData)
        }   
    }

    const SelectedOption = (option) =>
    {
        if(option.value === null)
        {
            setFileDetails({...fileDetails,vendor:null})
        }
        else
        {
            setFileDetails({...fileDetails,vendor:parseInt(option.value)})
        }
    }


    return(
        <div className='content'>
                <div className="subText addClient-subText">
                <div style={{marginRight:"15px"}} onClick={()=>history.goBack()}>
                    <BackBtn/>
                </div>
                Vouchers/Upload Batch
                </div>
                <div className="client-container">
                <div className="sub-left"> 
                    <div className='select-file'>
                        <p className="select-file-heading">1.Select File</p>
                        <div className={fileDropped ? "dropped-voucher-file"  : "drop-voucher-file"} onDragOver={check} onDrop={drop}>
                            <div className="dropFile">{fileDropped ? uploadedFile.name : "Drop File Here"}</div>
                        </div>
                    </div> 
                    <div className="uv-file-details">
                        <p className="file-detail-heading">2.File Details</p>
                        <div className="file-details-options">
                            <div className="uv-options">
                                <div className="uv-header">Telecom</div>
                                <input type="text" placeholder="Select Telecom" name="telecom" className="uv-option" onChange={onValchange}/>
                            </div> 
                            <br/>
                            <div className="uv-options">
                                <div className="uv-header">Product</div>
                                <input type="text" placeholder="Select Product" name="product" className="uv-option" onChange={onValchange}/>
                            </div>
                            <br/> 
                            <div className="uv-options">
                                <div className="uv-header">Expiry Date</div>
                                <input type="date"  name="expiryDate" className={inputAllVal ? "uv-option1" : "uv-option"} onChange={onValchange}/>
                            </div>
                            <br/>
                            <div className="uv-options">
                                <div className="uv-header">Issue Date</div>
                                <input type="date"  name="issueDate" className={inputAllVal ? "uv-option1" : "uv-option"} onChange={onValchange}/>
                            </div>
                            <br/>
                            <div className="uv-options">
                                <div className="uv-header">Batch Name</div>
                                <input type="text" placeholder="Batch Number" name="BatchNumber" className={inputAllVal ? "uv-option1" : "uv-option"} onChange={onValchange}/>
                            </div>
                            <br/>  
                            <div className="uv-options">
                                <div className="uv-header">Vendor</div>
                                <SearchDD placeholder="Vendor" SelectedOption={SelectedOption}  type="vendor" data={vendors ? vendors : []}/>
                            </div>
                            <br/>  
                            <div className="uv-options">
                                <div className="uv-header">Item Price</div>
                                <input type="text" placeholder="Item Price" name="itemPrice" className={inputAllVal ? "uv-option1" : "uv-option"} onChange={onValchange}/>
                            </div>  
                            <br/>
                            <div className="uv-options">
                                <div className="uv-header">Cost</div>
                                <input type="text" placeholder="Cost" name="cost" className={inputAllVal ? "uv-option1" : "uv-option"} onChange={onValchange}/>
                            </div>  
                        </div>
                        <div className="uv-scanFile-btn" onClick={()=>scanFile()}>
                            <CustomButton btnText="scan file"/>
                        </div>
                    </div>
                </div>
                <div className="sub-right">
                    <div className="uv-scan-result">
                        <p className="file-detail-heading">3.Scan Result</p>
                        { 
                            uploadingVoucherErrors ? uploadingVoucherErrors.error ? 
                            <div className="uv-scan-result-content">
                                <br/>
                                <div>File Name: {uploadedFile ? `${uploadedFile.name}` : null}</div>
                                <br/>
                                {
                                    uploadingVoucherErrors.errorType === "duplicateWithin" 
                                    ? 
                                    <div>
                                        <div className="warning-withinFiles">
                                            <div className="uv-warning-text">
                                                Warning: {`${uploadingVoucherErrors.files.length}`} duplicates within file found
                                            </div>
                                        </div>
                                        <div className="warning-withinFiles-filesInfo">
                                            <div className="warning1-headers">
                                                <div className="warning1-header">SN</div>
                                                <div className="warning1-header" >VN</div>
                                            </div>
                                            {
                                                uploadingVoucherErrors.files.map((file,index)=>
                                                {
                                                    return <div className="warning1-files" key={index}>
                                                                <div className="w1-fileSN">{file.serialNo}</div>
                                                                <div className="w1-fileVN" style={{color:"#FF4D4D"}}>{file.pin}</div>
                                                        </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    uploadingVoucherErrors.errorType === "duplicateWithExistingBatch"
                                    ? 
                                    <div>
                                    <div className="warning-Files">
                                        <div className="uv-warning-text">
                                            Warning: {`${uploadingVoucherErrors.files.length}`} duplicates with already existing batch found
                                        </div>
                                    </div>
                                    <div className="warning-filesInfo">
                                        <div className="warning2-headers">
                                            <div className="warning2-header">SN</div>
                                            <div className="warning2-header">VN</div>
                                            <div className="warning2-header">Brand</div>
                                            <div className="warning2-header">Product</div>
                                            <div className="warning2-header">Batch Name</div>
                                            <div className="warning2-header">Upload Date</div>
                                        </div>
                                        {uploadingVoucherErrors.files.map((file,index)=> {
                                            return  <div className="warning2-files" key={index}>
                                                        <div className="w2-fileSN w2-file-option">{file.serialNo}</div>
                                                        <div className="w2-fileVN w2-file-option">{file.pin}</div>
                                                        <div className="w2-fileBrand w2-file-option">{fileDetails.telecom}</div>
                                                        <div className="w2-fileBrand w2-file-option">{fileDetails.product}</div>
                                                        <div className="w2-fileBatchName w2-file-option">{file.duplicateBatchNo}</div>
                                                        <div className="w2-uploadDate w2-file-option">{file.duplicateFileCreatedAt}</div>
                                                    </div>
                                        })
                                        }
                                    </div>
                                    </div>
                                    : null 
                                }

                            </div> 
                            : uploadingVoucherErrors.internalError ? 
                                <div className="other-warnings">
                                    <div className="other-warning-text">
                                        Warning: {uploadingVoucherErrors.errorType}
                                    </div>
                                </div>
                            : null : null
                        }
                        {
                            productId ? productId === "No such Brand or Product"
                             ? <div className="other-warnings">
                                    <div className="other-warning-text">
                                        Warning: No such Brand or Product
                                    </div>
                                </div>
                            : null : null
                        }
                        {
                            uploadingVoucherErrors ? !uploadingVoucherErrors.internalError && !uploadingVoucherErrors.error ? 
                            <div className="confirm-voucher-upload" onClick={confirmUpload}>
                                <CustomButton btnText="Confirm & upload file"/>
                            </div>
                            : null : null
                        }    
                    </div>
                </div>
                </div>
        </div>
    )
}

const mapStateToProps = state =>
{
    return{
        productId:state.vouchers.productId,
        uploadingVoucherErrors:state.vouchers.uploadingVoucherErrors,
        voucherUploaded:state.vouchers.voucherUploaded,
        vendors:state.vendors.vendorsList
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        uploadVoucherStart:(bodyData)=>dispatch(uploadVoucherStart(bodyData)),
        getProductId:(data)=>dispatch(getProductId(data)),
        ConfirmUpload:(data)=>dispatch(ConfirmUpload(data)),
        ClearVoucherErrors:()=>dispatch(ClearVoucherErrors()),
        ClearProdIdError:()=>dispatch(ClearProdIdError()),
        GetVendors:()=>dispatch(GetVendors())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadVouchers)
