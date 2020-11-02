import { VouchersList } from "../../assets/titles"
import VoucherActionTypes from "./vouchers-types"

export const FetchBatchStart = () =>
{
    return{
        type:VoucherActionTypes.FETCH_BATCHLIST_START
    }
}

export const FetchBatchSuccess = (BatchList) =>
{
    return{
        type:VoucherActionTypes.FETCH_BATCHLIST_SUCCESS,
        payload:BatchList
    }
}

export const FetchBatchFailed = (error) =>
{
    return{
        type:VoucherActionTypes.FETCH_BATCHLIST_FAILED,
        payload:error
    }
}

export const setEditBatch = (status) =>
{
    return{
        type:VoucherActionTypes.SET_EDIT_BATCH,
        payload:status
    }
}

export const uploadVoucherStart = (fileDetails) =>
{
    return{
        type:VoucherActionTypes.UPLOAD_VOUCHER_START,
        payload:fileDetails
    }
}

export const uploadVoucherErrors = (errors) =>
{
    return{
        type:VoucherActionTypes.UPLOAD_VOUCHER_ERRORS,
        payload:errors
    }
}

export const getProductId = (info) =>
{
    return{
        type:VoucherActionTypes.GET_PRODUCT_ID,
        payload:info
    }
}

export const prodIdSuccess = (id) =>
{
    return{
        type:VoucherActionTypes.PRODUCT_ID_SUCCESS,
        payload:id
    }
}
 
export const ConfirmUpload = (data) =>
{
    return{
        type:VoucherActionTypes.CONFIRM_UPLOAD,
        payload:data
    }
}

export const ConfirmUploadStatus = () =>
{
    return{
        type:VoucherActionTypes.CONFIRM_UPLOAD_STATUS
    }
}

export const setCurrentBatch = (batchId) =>
{
    return{
        type:VoucherActionTypes.SET_CURRENT_BATCH,
        payload:batchId
    }
}

export const fetchVouchersStart = (batchID) =>
{
    return{
        type:VoucherActionTypes.FETCH_VOUCHERS_START,
        payload:batchID
    }
}

export const fetchVouchersSuccessful = (vouchers) =>
{
    return{
        type:VoucherActionTypes.FETCH_VOUCHERS_SUCCESS,
        payload:vouchers
    }
}

export const fetchVouchersFailed = (error) =>
{
    return{
        type:VoucherActionTypes.FETCH_VOUCHERS_FAILED,
        payload:error
    }
}

export const toggleDeleteVouchers = (voucherInfo) =>
{
    return{
        type:VoucherActionTypes.TOGGLE_DELETE_VOUCHER,
        payload:voucherInfo
    }
}  

export const deleteVouchersStart = (VouchersList) =>
{
    return{
        type:VoucherActionTypes.DELETE_VOUCHERS_START,
        payload:VouchersList
    }
}

export const deleteVoucherSuccess = () =>
{
    return{
        type:VoucherActionTypes.DELETE_VOUCHERS_SUCCESS,
    }
}

export const deleteVoucherFailed = (error) =>
{
    return{
        type:VoucherActionTypes.DELETE_VOUCHERS_FAILED,
        payload:error
    }
}

export const ClearVoucherErrors = () =>
{
    return{
        type:VoucherActionTypes.CLEAR_VOUCHER_ERRORS
    }
}

export const ClearProdIdError = () =>
{
    return{
        type:VoucherActionTypes.CLEAR_PRODUCT_ID
    }
}