import {all,call} from "redux-saga/effects"
import {clientSagas} from "./clients/client-sagas"
import {TelecomSagas} from "./telecom/telecom.sagas"
import {fetchStaffStart} from "./staff/staff-sagas"
import {VoucherSagas} from "./vouchers/vouchers-sagas"

export function* rootSaga() 
{
    yield all([call(clientSagas),call(fetchStaffStart),call(TelecomSagas),call(VoucherSagas)])
}