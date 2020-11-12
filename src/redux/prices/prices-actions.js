import PricesActionTypes from "./prices-types"

export const GetClientPricesStart = () =>
{
    return{
        type:PricesActionTypes.GET_CLIENT_PRICES_START
    }
}

export const GetClientPricesSuccess = (data) =>
{
    return{
        type:PricesActionTypes.GET_CLIENT_PRICES_SUCCESS,
        payload:data
    }
}

export const GetClientPricesFailed = (error)=>
{
    return{
        type:PricesActionTypes.GET_CLIENT_PRICES_FAILED,
        payload:error
    }
}

export const RemoveOffer = (offer) =>
{
    return{
        type:PricesActionTypes.REMOVE_OFFER_START,
        payload:offer
    }
}

export const RemoveOfferStatus = (status) =>
{
    return{
        type:PricesActionTypes.REMOVE_OFFER_STATUS,
        payload:status
    }
}

export const UpdateOfferList = (offer) =>
{
    return{
        type:PricesActionTypes.UPDATE_OFFER_LIST,
        payload:offer
    }
}

export const RemoveOfferList = (key) =>
{
    return{
        type:PricesActionTypes.REMOVE_OFFER_LIST,
        payload:key
    }
}

export const UpdateOffersStart = (offers) =>
{
    return{
        type:PricesActionTypes.UPDATE_OFFERS_START,
        payload:offers
    }
}

export const UpdateOffersStatus = (status) =>
{
    return{
        type:PricesActionTypes.UPDATE_OFFERS_STATUS,
        payload:status
    }
}

export const ClearOffersList = () =>
{
    return{
        type:PricesActionTypes.CLEAR_OFFERS_LIST
    }
}