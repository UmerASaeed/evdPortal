import StaffActionTypes from "./staff.types"

export const FetchStaffStart = () =>
{
    return{
        type:StaffActionTypes.FETCH_STAFF_START_ASYNC,
    }
}

export const FetchStaffSuccessfull = (collection) =>
{
    return{
        type:StaffActionTypes.FETCH_STAFF_SUCCESSFULL_ASYNC,
        payload:collection
    }
}

export const FetchStaffFailed = (errorMessage) =>
{
    return{
        type:StaffActionTypes.FETCH_STAFF_FAILED_ASYNC,
        payload:errorMessage
    }
}

