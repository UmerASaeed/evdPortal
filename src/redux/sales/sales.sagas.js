import {takeLatest,all,put,call} from "redux-saga/effects"
import {SalesActionTypes} from "./sales.types"
import {fetchSaleListSuccess,fetchSaleListError,fetchListDetailsSuccess,fetchListDetailError,fetchSaleVoucherSuccess,fetchSaleVoucherFail,fetchNSProdsSuccess,fetchNSProdsFail,placeOrderStatus,fileLink,cancelSaleStatus} from "./sales.actions"
import {getSalesList,getOrderDetails,getSaleVouchers,getNSProds,makeSale,getFileLink,delSale} from "../../utils/fetching"

export function* fetchSalesListStart()
{
    try {
        const resp = yield getSalesList()
        if (resp.statusText === "OK")
        {
            yield put(fetchSaleListSuccess(resp.data))
        }
        else
        {
            console.log("error getting salesList")
        }
    } catch (error) {
        console.log("error getting salesList")
    }
}

export function* fetchOrderDetailsStart(data)
{
    try {
        const resp = yield getOrderDetails(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(fetchListDetailsSuccess(resp.data))
        }
        else
        {
            console.log("error getting orderDetails")
        }
    } catch (error) {
        console.log("error getting orderDetails")
    }
}

export function* fetchSaleVouchersStart(data)
{
    try {
        const resp = yield getSaleVouchers(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(fetchSaleVoucherSuccess(resp.data))
        }
        else
        {
            console.log("error getting saleVouchers")
        }
    } catch (error) {
        console.log("error getting saleVouchers")
    }
}

export function* fetchNewSaleProdsStart(data)
{
    try {
        const resp = yield getNSProds(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(fetchNSProdsSuccess(resp.data))
        }
        else
        {
            console.log("error getting NSProds")
        }
    } catch (error) {
        console.log("error getting NSProds")
    }
}


export function* placeOrderStart(data)
{
    try {
        const resp = yield makeSale(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(placeOrderStatus(true))
        }
        else
        {
            yield put(placeOrderStatus(false))
        }
    } catch (error) {
        yield put(placeOrderStatus(false))
    }
}

export function* getLinkStart(data)
{
    try {
        const resp = yield getFileLink(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(fileLink(resp.data))
        }
        else
        {
            console.log("Error getting link")
        }
    } catch (error) {
        console.log("Error getting link")
    }
}


export function* cancelSaleStart(data)
{
    try {
        const resp = yield delSale(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(cancelSaleStatus(true))
        }
        else
        {
            yield put(cancelSaleStatus(false))
        }
    } catch (error) {
        yield put(cancelSaleStatus(false))
    }
}

export function* fetchSalesList()
{
    yield takeLatest(SalesActionTypes.FETCH_SALES_LIST_START,fetchSalesListStart)
}

export function* fetchOrderDetails()
{
    yield takeLatest(SalesActionTypes.FETCH_LIST_DETAILS_START,fetchOrderDetailsStart)
}

export function* fetchSaleVouchers()
{
    yield takeLatest(SalesActionTypes.FETCH_SALE_VOUCHER_START,fetchSaleVouchersStart)
}

export function* fetchNewSaleProds()
{
    yield takeLatest(SalesActionTypes.FETCH_NS_PRODS_START,fetchNewSaleProdsStart)
}

export function* placeOrder()
{
    yield takeLatest(SalesActionTypes.PLACE_ORDER,placeOrderStart)
}

export function* getLink()
{
    yield takeLatest(SalesActionTypes.DOWNLOAD_FILE,getLinkStart)
}

export function* cancelSale()
{
    yield takeLatest(SalesActionTypes.CANCEL_SALE,cancelSaleStart)
}

export function* SalesSagas()
{
    yield all([call(fetchSalesList),call(fetchOrderDetails),call(fetchSaleVouchers),call(fetchNewSaleProds),call(placeOrder),call(getLink),call(cancelSale)])
}