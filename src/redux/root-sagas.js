import {all,call} from "redux-saga/effects"
import {clientSagas} from "./clients/client-sagas"
import {TelecomSagas} from "./telecom/telecom.sagas"
import {fetchStaffStart} from "./staff/staff-sagas"
import {VoucherSagas} from "./vouchers/vouchers-sagas"
import {PricesSagas} from "./prices/prices-sagas"
import {RestrictionSagas} from "./restrictions/restrictions.sagas"
import {SalesSagas} from "./sales/sales.sagas"
import {VendorSagas} from "./vendors/vendors.sagas"
import {SearchSagas} from "./search/search.sagas"
import {ReportsSagas} from "./reports/reports.sagas"

export function* rootSaga() 
{
    yield all([call(clientSagas),call(fetchStaffStart),call(TelecomSagas),call(VoucherSagas),call(PricesSagas),call(RestrictionSagas),call(SalesSagas),call(VendorSagas),call(SearchSagas),call(ReportsSagas)])
}