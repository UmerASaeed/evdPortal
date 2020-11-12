import {takeLatest,put,call,all} from "redux-saga/effects"
import PricesActionTypes from "./prices-types"
import {GetClientPricesSuccess,GetClientPricesFailed,RemoveOfferStatus,UpdateOffersStatus} from "./prices-actions"
import {fetchClientPrices,RemoveOffer,UpdateOffers} from "../../utils/fetching"

export function* getClientPricesAsync()
{
    try {
        const resp = yield fetchClientPrices()
        if (resp.statusText === "OK")
        {
            yield put(GetClientPricesSuccess(resp.data))
        }
        else
        {
           yield put(GetClientPricesFailed(resp))
        }
    } catch (error) {
          yield put(GetClientPricesFailed(error.message))
    }
}


export function* RemoveOfferStartAsync(data)
{
    try {
        const resp = yield RemoveOffer(data.payload)
        if (resp.statusText === "OK")
        {
            yield put(RemoveOfferStatus("Offer Removed"))
        }
        else
        {
            yield put(RemoveOfferStatus("Error Removing Offer"))
        }
    } catch (error) {
        yield put(RemoveOfferStatus(error.message))
    }
}

export function* updateOffersStartAsync(offers)
{
    try {
        const resp = yield UpdateOffers(offers.payload)
        if (resp.statusText === "OK")
        {
            yield put(UpdateOffersStatus("Offers Updated"))
        }
        else
        {
            yield put(UpdateOffersStatus("Error Updating Offers"))
        }
    } catch (error) {
        yield put(UpdateOffersStatus(error.message))
    }
}

export function* GetClientPrices()
{
    yield takeLatest(PricesActionTypes.GET_CLIENT_PRICES_START,getClientPricesAsync)
}

export function* RemoveOfferStart()
{
    yield takeLatest(PricesActionTypes.REMOVE_OFFER_START,RemoveOfferStartAsync)
}

export function* UpdateOffersStart()
{
    yield takeLatest(PricesActionTypes.UPDATE_OFFERS_START,updateOffersStartAsync)
}

export function* PricesSagas()
{

    yield all([call(GetClientPrices),call(RemoveOfferStart),call(UpdateOffersStart)])
}
