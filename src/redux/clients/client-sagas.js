import { takeLatest,put, all ,call} from 'redux-saga/effects';
import {FetchSuccessfull,FetchFailed,UpdateSuccessfull,UpdateFailed,FetchStart} from "./client-actions"
import ClientActionTypes from "./client.types"
import {getClients,updateWallet,updatePaymentBalance} from "../../utils/fetching"

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
        const comments = yield updatePaymentBalance(customerData.id,customerData.amount,customerData.description)
        yield put(UpdateSuccessfull(comments))
        yield put (FetchStart())
    } catch (error) {
        yield put(UpdateFailed(error.message))
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

export function* clientSagas()
{
    yield all([call(fetchClientsStart),call(UpdateClientStart),call(UpdateClientPaymentStart)])
}