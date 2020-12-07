import {takeLatest,put,all,call} from "redux-saga/effects"
import {VendorActionTypes} from "./vendors.types"
import {fetchVendors,createSupplier,EditSupplier} from "../../utils/fetching"
import {GetVendorsList,GetVendorsError,CreateVendorStatus,EditVendorStatus} from "./vendors.actions"


export function* GetVendorsStart()
{
    try {
        const resp = yield fetchVendors()
        if (resp.statusText === "OK")
        {
            yield put(GetVendorsList(resp.data))
        }
        else
        {
            console.log("error getting vendors")
        }
    } catch (error) {
        console.log("error getting vendors")
    }
}

export function* CreateVendorStart(data)
{
    try {
        const resp = yield createSupplier(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(CreateVendorStatus(true))
        }
        else
        {
            yield put(CreateVendorStatus(false))
        }
    } catch (error) {
        yield put(CreateVendorStatus(false))
     }
}

export function* EditVendorStart(data)
{
    try {
        const resp = yield EditSupplier(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(EditVendorStatus(true))
        }
        else
        {
            yield put(EditVendorStatus(false))
        }
    } catch (error) {
        yield put(EditVendorStatus(false))
     }
}

export function* GetVendors()
{
    yield takeLatest(VendorActionTypes.GET_VENDORS,GetVendorsStart)
}

export function* CreateVendor()
{
    yield takeLatest(VendorActionTypes.CREATE_VENDOR,CreateVendorStart)
}

export function* EditVendor()
{
    yield takeLatest(VendorActionTypes.EDIT_VENDOR,EditVendorStart)
}

export function* VendorSagas()
{
    yield all([call(GetVendors),call(CreateVendor),call(EditVendor)])
}
