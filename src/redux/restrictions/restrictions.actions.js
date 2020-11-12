import {RestrictionActionTypes} from "./restrictions.types"

export const FetchRestStart = () =>
{
    return{
        type:RestrictionActionTypes.FETCH_RESTR_START
    }
}

export const FetchRestSuccess = (list) =>
{
    return{
        type:RestrictionActionTypes.FETCH_RESTR_SUCCESS,
        payload:list
    }
}

export const FetchRestFailed = (error) =>
{
    return{
        type:RestrictionActionTypes.FETCH_RESTR_FAILED,
        payload:error
    }
}

export const getProdStock = (productID) =>
{
    return{
        type:RestrictionActionTypes.GET_PRODUCT_STOCK,
        payload:productID
    }
}

export const fetchedProdStockSuccess = (stock) =>
{
    return{
        type:RestrictionActionTypes.PRODUCT_STOCK_SUCCESS,
        payload:stock
    }
}

export const clearProdStocks = () =>
{
    return{
        type:RestrictionActionTypes.CLEAR_PRODUCT_STOCK
    }
}

export const setReason = (reason) =>
{
    return{
        type:RestrictionActionTypes.SET_REASON,
        payload:reason
    }
}

export const setStartTime = (st) =>
{
    return{
        type:RestrictionActionTypes.SET_START_TIME,
        payload:st
    }
}

export const setEndTime = (et) =>
{
    return{
        type:RestrictionActionTypes.SET_END_TIME,
        payload:et
    }
}

export const setNewRest = (newRest) =>
{
    return{
        type:RestrictionActionTypes.SET_NEW_REST,
        payload:newRest
    }
}

export const saveQoutaAction = (newRest) =>
{
    return{
        type:RestrictionActionTypes.SAVE_QOUTA,
        payload:newRest
    }
}

export const saveQoutaSuccess = () =>
{
    return{
        type:RestrictionActionTypes.SAVE_QOUTA_SUCCESS
    }
}

export const ClearNewRest = () =>
{
    return{
        type:RestrictionActionTypes.CLEAR_NEW_REST
    }
}

export const CancelRestriction = (id) =>
{
    return{
        type:RestrictionActionTypes.CANCEL_RESTRICTION,
        payload:id
    }
}
