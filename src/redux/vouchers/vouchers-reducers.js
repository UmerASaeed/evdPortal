import VoucherActionTypes from "./vouchers-types"

const INITIAL_STATE = {
    isFetchingBatchList:false,
    batchList:null,
    errorFetchingBatchList:null,
    editBatch:{},
    uploadingVoucher:false,
    uploadingVoucherDetails:null,
    uploadingVoucherErrors:null,
    voucherUploaded:false,
    productId:null,
    currentBatch:null,
    fetchingVouchers:false,
    batchVouchers:null,
    fetchingVouchersError:null,
    deleteVoucherList:{},
    deleteVoucherStart:false,
    deleteVoucherSuccess:false,
    deleteVoucherError:null,
    editBatchStatus:false
}


const VoucherReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case VoucherActionTypes.FETCH_BATCHLIST_START:
        return{
            ...state,
            isFetchingBatchList:true
        }
        case VoucherActionTypes.FETCH_BATCHLIST_SUCCESS:
        return{
            ...state,
            isFetchingBatchList:false,
            batchList:action.payload,
            errorFetchingBatchList:"",
            editBatchStatus:false
        }
        case VoucherActionTypes.FETCH_BATCHLIST_FAILED:
        return{
            ...state,
            isFetchingBatchList:false,
            errorFetchingBatchList:action.payload   
        }
        case VoucherActionTypes.SET_EDIT_BATCH:
        return{
            ...state,
            editBatch:action.payload
        }
        // case VoucherActionTypes.UPLOAD_VOUCHER_START:
        // return{
        //     ...state,
        //     uploadingVoucher:true,
        //     uploadingVoucherDetails:action.payload
        // }
        case VoucherActionTypes.UPLOAD_VOUCHER_ERRORS:
        return{
            ...state,
            uploadingVoucherErrors:action.payload
        }
        case VoucherActionTypes.PRODUCT_ID_SUCCESS:
        return{
            ...state,
            productId:action.payload
        }
        case VoucherActionTypes.CONFIRM_UPLOAD_STATUS:
        return{
            ...state,
            voucherUploaded:true   
        }
        case VoucherActionTypes.SET_CURRENT_BATCH:
        return{
            ...state,
            currentBatch:action.payload
        }
        case VoucherActionTypes.FETCH_VOUCHERS_START:
        return{
            ...state,
            fetchingVouchers:true
        }
        case VoucherActionTypes.FETCH_VOUCHERS_SUCCESS:
        return{
            ...state,
            fetchingVouchers:false,
            batchVouchers:action.payload,
            deleteVoucherSuccess:false
        }
        case VoucherActionTypes.FETCH_VOUCHERS_FAILED:
        return{
            ...state,
            fetchingVouchers:false,
            fetchingVouchersError:action.payload
        }
        case VoucherActionTypes.TOGGLE_DELETE_VOUCHER:
        return{
            ...state,
            deleteVoucherList:{...state.deleteVoucherList,[action.payload.voucherId]:action.payload.status}  
        }
        case VoucherActionTypes.DELETE_VOUCHERS_START:
        return{
            ...state,
            deleteVoucherStart:true    
        }
        case VoucherActionTypes.DELETE_VOUCHERS_SUCCESS:
        return{
            ...state,
            deleteVoucherSuccess:true, 
            deleteVoucherStart:false    
        }
        case VoucherActionTypes.DELETE_VOUCHERS_FAILED:
        return{
            ...state,
            deleteVoucherError:action.payload, 
            deleteVoucherStart:false    
        }
        case VoucherActionTypes.CLEAR_VOUCHER_ERRORS:
        return{
            ...state,
            uploadingVoucherErrors:null   
        }
        case VoucherActionTypes.CLEAR_PRODUCT_ID:
        return{
            ...state,
            productId:null
        }
        case VoucherActionTypes.EDIT_BATCH_STATUS:
            return{
                ...state,
                editBatchStatus:true
            }
        default:
            return state;
    }
}

export default VoucherReducer