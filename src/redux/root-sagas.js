import {all,call} from "redux-saga/effects"
import {clientSagas} from "./clients/client-sagas"
import {fetchStaffStart} from "./staff/staff-sagas"

export function* rootSaga() 
{
    yield all([call(clientSagas),call(fetchStaffStart)])
}