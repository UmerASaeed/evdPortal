import { takeLatest,put, all ,call} from 'redux-saga/effects';
import {FetchSuccessfull,FetchFailed,UpdateSuccessfull,UpdateFailed,FetchStart,getPermsSuccess,createClientStatus,clientUpdateStatus} from "./client-actions"
import {StaffCreated,EditStaffStatus} from "../staff/staff-actions"
import ClientActionTypes from "./client.types"
import {getClients,updateWallet,updatePaymentBalance,fetchPerms,makeClient,updateUser} from "../../utils/fetching"

export function* fetchClientsAsync()
{
    try{
        const clients = yield getClients()
        yield put(FetchSuccessfull(clients.data))
    }
    catch(err)
    {
        yield put(FetchFailed(err.message))
    }
}

export function* updateClientsAsync(customerDetail)
{
    try {
        let customerData = customerDetail.payload
        const comments = yield updateWallet(customerData.id,customerData.amount,customerData.description)
        yield put(UpdateSuccessfull(comments))
        yield put (FetchStart())
    } catch (error) {
        yield put(UpdateFailed(error.message))
    }
} 

export function* updatePaymentsAsync(customerDetail)
{
    try {
        let customerData = customerDetail.payload
        const comments = yield updatePaymentBalance(customerData.id,customerData.amount,customerData.description,customerData.paymentMode)
        yield put(UpdateSuccessfull(comments))
        yield put (FetchStart())
    } catch (error) {
        yield put(UpdateFailed(error.message))
    }
} 

export function* getPermsStartAsync()
{
    try {
        const resp = yield fetchPerms()
        if (resp.statusText === "OK")
        {
            yield put(getPermsSuccess(resp.data))
        }
    } catch (error) {
        console.log("Error fetching permissions")
    }
}

export function* createClientStart(data)
{
    try {
        const resp = yield makeClient(data.payload)
        if (resp.statusText === "OK")
        {
            if (data.payload.isCustomer)
            {
                yield put(createClientStatus(true))
            }
            else
            {
                yield put(StaffCreated(true))
            }
        }
        else
        {
            if (data.payload.isCustomer)
            {
                yield put(createClientStatus(false))
            }
            else
            {
                yield put(StaffCreated(false))
            }

        }
    } catch (error) {
        if (data.payload.isCustomer)
            {
                yield put(createClientStatus(false))
            }
            else
            {
                yield put(StaffCreated(false))
            }
    }
}


export function* editUserStart(data)
{
    try {
        const resp = yield updateUser(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(clientUpdateStatus(true))    
            yield put(EditStaffStatus(true))    
        }
        else
        { 
            yield put(clientUpdateStatus(false)) 
            yield put(EditStaffStatus(false))        
        }
    } catch (error) {
            yield put(clientUpdateStatus(false)) 
            yield put(EditStaffStatus(false))
    }
}


export function* fetchClientsStart()
{
    yield takeLatest(ClientActionTypes.FETCH_START_ASYNC,fetchClientsAsync)
}

export function* UpdateClientStart()
{
    yield takeLatest(ClientActionTypes.UPDATE_WALLET_START,updateClientsAsync)
}

export function* UpdateClientPaymentStart()
{
    yield takeLatest(ClientActionTypes.UPDATE_PAYMENT_START,updatePaymentsAsync)
}

export function* getPermsStart()
{
    yield takeLatest(ClientActionTypes.GET_PERMS,getPermsStartAsync)
}

export function* createClient()
{
    yield takeLatest(ClientActionTypes.CREATE_CLIENT,createClientStart)
}

export function* editUser()
{
    yield takeLatest(ClientActionTypes.EDIT_USER,editUserStart)
}

export function* clientSagas()
{
    yield all([call(fetchClientsStart),call(UpdateClientStart),call(UpdateClientPaymentStart),call(getPermsStart),call(createClient),call(editUser)])
}