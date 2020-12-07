import { eventChannel } from "redux-saga"
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

export const UpdateStaffInfo = (staffInfo) =>
{
    return{
        type:StaffActionTypes.UPDATE_STAFF_INFO,
        payload:staffInfo
    }
} 

export const CreateStaff = () =>
{
    return{
        type:StaffActionTypes.CREATE_STAFF
    }
}

export const StaffCreated = (status) =>
{
    return{
        type:StaffActionTypes.STAFF_CREATED,
        payload:status
    }
}

export const EditStaffStatus = (status) =>
{
    return{
        type:StaffActionTypes.STAFF_UPDATED,
        payload:status
    }
}