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

export const getPerms = () =>
{
    return{
        type:ClientActionTypes.GET_PERMS
    }
}

export const getPermsSuccess = (perms) =>
{
    return{
        type:ClientActionTypes.GET_PERMS_SUCCESS,
        payload:perms
    }
}

export const createClient = (client) =>
{
    return{
        type:ClientActionTypes.CREATE_CLIENT,
        payload:client
    }
}

export const createClientStatus = (status) =>
{
    return{
        type:ClientActionTypes.CREATE_CLIENT_STATUS,
        payload:status
    }
} 

export const updateUser = (user) =>
{
    return{
        type:ClientActionTypes.EDIT_USER,
        payload:user
    }
}

export const clientUpdateStatus = (status) =>
{
    return{
        type:ClientActionTypes.EDIT_CLIENT_STATUS,
        payload:status
    }
}