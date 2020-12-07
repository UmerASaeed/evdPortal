import {takeLatest,put,all,call} from "redux-saga/effects"
import {ReportActionTypes} from "./reports.types"
import {GetDwnldReportSuccess,GetWalletReportSuccess,GetPaymentReportSuccess,GetPurchaseReportSuccess,GetInvenUsageReportSuccess,GetInvenReportSuccess} from "./reports.actions"
import {fetchDownloadReport,fetchWalletReport,fetchPaymentReport,fetchPurchaseReport,fetchInventoryUsageReport,fetchInventoryReport} from "../../utils/fetching"

export function* getDwnldReportSuccess(data)
{
    try {
        const resp = yield fetchDownloadReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetDwnldReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Download Reports')
        }

    } catch (error) {
        console.log('Error getting Download Reports')
    }
}

export function* getWalletReportSuccess(data)
{
    try {
        const resp = yield fetchWalletReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetWalletReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Wallet Reports')
        }

    } catch (error) {
        console.log('Error getting Wallet Reports')
    }
}

export function* getPaymentReportSuccess(data)
{
    try {
        const resp = yield fetchPaymentReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetPaymentReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Payment Reports')
        }

    } catch (error) {
        console.log('Error getting Payment Reports')
    }
}

export function* getPurchaseReportSuccess(data)
{
    try {
        const resp = yield fetchPurchaseReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetPurchaseReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Purchase Reports')
        }

    } catch (error) {
        console.log('Error getting Purchase Reports')
    }
}

export function* getInvenUsageSuccess(data)
{
    try {
        const resp = yield fetchInventoryUsageReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetInvenUsageReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Inventory Usage Reports')
        }

    } catch (error) {
        console.log('Error getting Inventory Usage Reports')
    }
}

export function* getInvenSuccess(data)
{
    try {
        const resp = yield fetchInventoryReport(data.payload)
        if (resp.statusText === 'OK')
        {
           yield put(GetInvenReportSuccess(resp.data))
        }
        else
        {
            console.log('Error getting Inventory Reports')
        }

    } catch (error) {
        console.log('Error getting Inventory Reports')
    }
}

export function* getDwnldReport()
{
    yield takeLatest(ReportActionTypes.GET_DWNLD_REPORT,getDwnldReportSuccess)
}

export function* getWalletReport()
{
    yield takeLatest(ReportActionTypes.GET_WALLET_REPORT,getWalletReportSuccess)
}

export function* getPaymentReport()
{
    yield takeLatest(ReportActionTypes.GET_PAYMENT_REPORT,getPaymentReportSuccess)
}

export function* getPurchaseReport()
{
    yield takeLatest(ReportActionTypes.GET_PURCHASE_REPORT,getPurchaseReportSuccess)
}

export function* getInvenUsage()
{
    yield takeLatest(ReportActionTypes.GET_INVEN_USAGE_REPORT,getInvenUsageSuccess)
}

export function* getInven()
{
    yield takeLatest(ReportActionTypes.GET_INVENTORY_REPORT,getInvenSuccess)
}

export function* ReportsSagas()
{
    yield all([call(getDwnldReport),call(getWalletReport),call(getPaymentReport),call(getPurchaseReport),call(getInvenUsage),call(getInven)])
}