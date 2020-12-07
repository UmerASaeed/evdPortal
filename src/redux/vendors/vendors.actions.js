import {VendorActionTypes} from "./vendors.types"

export const GetVendors = () =>
{
    return{
        type:VendorActionTypes.GET_VENDORS
    }
}

export const GetVendorsList = (vendors) =>
{
    return{
        type:VendorActionTypes.GET_VENDORS_SUCCESS,
        payload:vendors
    }
}

export const GetVendorsError = (error) =>
{
    return{
        type:VendorActionTypes.GET_VENDORS_STATUS,
        payload:error
    }
}

export const CreateVendor = (vendor) =>
{
    return{
        type:VendorActionTypes.CREATE_VENDOR,
        payload:vendor
    }
}

export const CreateVendorStatus = (status) =>
{
    return{
        type:VendorActionTypes.CREATE_VENDOR_STATUS,
        payload:status
    }
}


export const EditVendorStart = (vendor) =>
{
    return{
        type:VendorActionTypes.EDIT_VENDOR,
        payload:vendor
    }
}

export const EditVendorStatus = (status) =>
{
    return{
        type:VendorActionTypes.EDIT_VENDOR_STATUS,
        payload:status
    }
}