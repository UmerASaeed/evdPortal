import {takeLatest,put,all,call} from "redux-saga/effects"
import {SearchActionTypes} from "./search.types"
import {SearchResult} from "./search.actions"
import {search} from "../../utils/fetching"

export function* StartSearchAsync(data)
{
    try {
       const resp = yield search(data.payload)
       if (resp.statusText === "OK")
       {
            yield put(SearchResult(resp.data))
       }
       else
       {
           console.log("error searching vouchers")
       }
    } catch (error) {
        console.log("error searching vouchers")
    }
}

export function* StartSearch()
{
    yield takeLatest(SearchActionTypes.START_SEARCH,StartSearchAsync)
}

export function* SearchSagas()
{
    yield all([call(StartSearch)])
}
 