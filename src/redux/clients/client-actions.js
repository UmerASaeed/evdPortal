import ClientActionTypes from "./client.types"

export const FetchStart = () =>
{
    return{
        type:ClientActionTypes.FETCH_START_ASYNC,
    }
}

export const FetchSuccessfull = (collection) =>
{
    return{
        type:ClientActionTypes.FETCH_SUCCESSFULL_ASYNC,
        payload:collection
    }
}

export const FetchFailed = (errorMessage) =>
{
    return{
        type:ClientActionTypes.FETCH_FAILED_ASYNC,
        payload:errorMessage
    }
}

export const UpdateWalletStart = (customerDetail) => 
{
    return{
        type:ClientActionTypes.UPDATE_WALLET_START,
        payload:customerDetail
    }
}

export const UpdatePaymentStart = (customerDetail) => 
{
    return{
        type:ClientActionTypes.UPDATE_PAYMENT_START,
        payload:customerDetail
    }
}

export const UpdateStart = () =>
{
    return{
        type:ClientActionTypes.UPDATE_START_ASYNC,
    }
}

export const UpdateSuccessfull = (collection) =>
{
    return{
        type:ClientActionTypes.UPDATE_SUCCESSFULL_ASYNC,
        payload:collection
    }
}

export const UpdateFailed = (errorMessage) =>
{
    return{
        type:ClientActionTypes.UPDATE_FAILED_ASYNC,
        payload:errorMessage
    }
}