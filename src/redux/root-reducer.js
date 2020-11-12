import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import LoginReducer from "./login/login.reducers"
import SectionReducer from "./section/section-Reducer"
import ClientReducer from "./clients/client-reducer"
import StaffReducer from "./staff/staff-reducer"
import popUpReducer from "./popUp/popUp-reducer"
import TelecomReducer from "./telecom/telecom-reducer"
import VoucherReducer from "./vouchers/vouchers-reducers"
import PricesReducer from "./prices/prices-reducer"
import RestrictionReducer from "./restrictions/restrictions.reducer"

const persistConfig =
{
    key:'root',
    storage,
    whitelist:['section','telecom','login','vouchers','prices']
}

const rootReducer = combineReducers({
    section:SectionReducer,
    clients:ClientReducer,
    staff:StaffReducer,
    popUp:popUpReducer,
    telecom:TelecomReducer,
    vouchers:VoucherReducer,
    login:LoginReducer,
    prices:PricesReducer,
    restrictions:RestrictionReducer
});

export default persistReducer(persistConfig,rootReducer);