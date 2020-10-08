import { takeLatest,put } from 'redux-saga/effects';
import {FetchStaffSuccessfull,FetchStaffFailed} from "./staff-actions"
import ClientActionTypes from "./staff.types"
import {getStaff} from "../../utils/fetching"

export function* fetchStaffAsync()
{
    try{
        const staff = yield getStaff()
        yield put(FetchStaffSuccessfull(staff))
    }
    catch(err)
    {
        yield put(FetchStaffFailed(err.message))
    }
}

export function* fetchStaffStart()
{
    yield takeLatest(ClientActionTypes.FETCH_STAFF_START_ASYNC,fetchStaffAsync)
}