import {takeLatest,put,all,call} from "redux-saga/effects"
import {RestrictionActionTypes} from "./restrictions.types"
import {FetchRestSuccess,FetchRestFailed,fetchedProdStockSuccess,saveQoutaSuccess} from "./restrictions.actions"
import {fetchRestList,fetchProdStock,createNewRestriction,cancelRestriction} from "../../utils/fetching"

export function* getRestListAsync()
{
    try {
        const resp = yield fetchRestList()
        if(resp.statusText === "OK")
        {
           yield put(FetchRestSuccess(resp.data))
        }
        else
        {
            console.log(resp)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getProdStockAsync(data)
{
    try {
        const resp = yield fetchProdStock(data.payload)
        yield put(fetchedProdStockSuccess(resp))
    } catch (error) {
        
    }
}

export function* CreateNewRestAsync(data)
{
    try {
        const resp= yield createNewRestriction(data.payload)
        if(resp.statusText === "OK")
        {
           yield put(saveQoutaSuccess())
        }
        else
        {
            console.log("Error Creating Restriction")
        }
    } catch (error) {
        console.log("Error Creating Restriction")
    }
}

export function* cancelRestrictionStartAsync(data) 
{
    try {
        const resp = yield cancelRestriction(data.payload)
        if(resp.statusText === "OK")
        {
            const resp = yield fetchRestList()
             if(resp.statusText === "OK")
            {
                 yield put(FetchRestSuccess(resp.data))
            }
            else
            {
                console.log(resp)
            }
        }
    } catch (error) {
        
    }
}

export function* getRestList()
{
    yield takeLatest(RestrictionActionTypes.FETCH_RESTR_START,getRestListAsync)
}

export function* getProdStock()
{
    yield takeLatest(RestrictionActionTypes.GET_PRODUCT_STOCK,getProdStockAsync)
}

export function* CreateNewRest()
{
    yield takeLatest(RestrictionActionTypes.SAVE_QOUTA,CreateNewRestAsync)
}

export function* cancelRestrictionStart()
{
    yield takeLatest(RestrictionActionTypes.CANCEL_RESTRICTION,cancelRestrictionStartAsync)
}

export function* RestrictionSagas()
{
    yield all([call(getRestList),call(getProdStock),call(CreateNewRest),call(cancelRestrictionStart)])
}