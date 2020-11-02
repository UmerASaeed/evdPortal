import {takeLatest,put,call,all} from "redux-saga/effects"
import VoucherActionTypes from "./vouchers-types"
import {FetchBatchSuccess,FetchBatchFailed,prodIdSuccess,uploadVoucherErrors,fetchVouchersSuccessful,fetchVouchersFailed,deleteVoucherSuccess,deleteVoucherFailed,ConfirmUploadStatus} from "./vouchers-actions"
import {getBatchList,ScanVoucherFile,getProductId,fetchVouchers,deleteVouchers,CUpload,updateBatchActivation,cancelBatch} from "../../utils/fetching"

export function* fetchBatchStartAsync()
{
    try {
        const resp = yield getBatchList()
        yield put(FetchBatchSuccess(resp.data))
    } catch (error) {
        yield put(FetchBatchFailed(error))
    }
}

export function* uploadVoucherStart(data)
{
    try {
        const resp = yield ScanVoucherFile(data.payload)
        if (resp)
        {
            yield put(uploadVoucherErrors(resp))
        }
    } catch (error) {
        
    }
}

export function* getProdIdStart(data)
{
    try {
        const resp = yield getProductId(data.payload) 
        yield put(prodIdSuccess(resp))
    } catch (error) {
        console.log("no such telecom or product exists")
    }
}

export function* getVouchersStart(data)
{
    try {
        const resp = yield fetchVouchers(data.payload) 
        yield put(fetchVouchersSuccessful(resp.data))
    } catch (error) {
        yield put (fetchVouchersFailed(error.message))
    }
}

export function* deleteVoucherStart(data)
{
    try {
       const resp = yield deleteVouchers(data.payload)
       if(resp.statusText==='OK')
       {
            yield put(deleteVoucherSuccess())      
       }
    } catch (error) {
        yield put(deleteVoucherFailed)
    }
}

export function* confirmUploadStart(data)
{
    try {
        yield CUpload(data.payload)
        yield put(ConfirmUploadStatus())
    } catch (error) {
        console.log(error)
    }
}

export function* updateBatchActivAsync(data)
{
    try {
        const resp = yield updateBatchActivation(data.payload)
        if (resp.statusText === 'OK')
        {
            const batchList = yield getBatchList()
            yield put(FetchBatchSuccess(batchList.data))
        }
        else
        {
            console.log("Error Updating Batch Status")
        }
    } catch (error) {
        console.log("Error Updating Batch Status")
    }
}

export function* CancelBatchStart(data)
{
    try {
        const resp = yield cancelBatch(data.payload)
        if (resp.statusText==='OK')
        {
            const batchList = yield getBatchList()
            yield put(FetchBatchSuccess(batchList.data))
        }
        else
        {
            console.log('Error Deleting Batch')
        }
    } catch (error) {
        console.log('Error Deleting Batch')
    }
}

export function* fetchBatch()
{
    yield takeLatest(VoucherActionTypes.FETCH_BATCHLIST_START,fetchBatchStartAsync)
}

export function* uploadVocuhers()
{
    yield takeLatest(VoucherActionTypes.UPLOAD_VOUCHER_START,uploadVoucherStart)
} 

export function* getProdId()
{
    yield takeLatest(VoucherActionTypes.GET_PRODUCT_ID,getProdIdStart)
}

export function* getVouchers()
{
    yield takeLatest(VoucherActionTypes.FETCH_VOUCHERS_START,getVouchersStart)
}

export function* deleteVoucher()
{
    yield takeLatest(VoucherActionTypes.DELETE_VOUCHERS_START,deleteVoucherStart)
}

export function* confirmUpload()
{
    yield takeLatest(VoucherActionTypes.CONFIRM_UPLOAD,confirmUploadStart)
}

export function* UpdateBatchActiv()
{
    yield takeLatest(VoucherActionTypes.UPDATE_BATCH_ACTIVATION,updateBatchActivAsync)
}


export function* CancelBatch() 
{
    yield takeLatest(VoucherActionTypes.CANCEL_BATCH,CancelBatchStart)
}

export function* VoucherSagas()
{
    yield all([call(fetchBatch),call(uploadVocuhers),call(getProdId),call(getVouchers),call(deleteVoucher),call(confirmUpload),call(UpdateBatchActiv),call(CancelBatch)])
}
