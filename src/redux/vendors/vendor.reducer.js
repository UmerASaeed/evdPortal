import {VendorActionTypes} from "./vendors.types"

const INITIAL_STATE = {
    fetchingVendors:false,
    vendorsList:null,
    fetchingVendorsError:null,
    createVendorStatus:false,
    editVendorStatus:false
}

const VendorReducer = (state = INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case VendorActionTypes.GET_VENDORS:
            return{
                ...state,
                fetchingVendors:true
            }
        case VendorActionTypes.GET_VENDORS_SUCCESS:
            return{
                ...state,
                fetchingVendors:false,
                fetchingVendorsError:null,
                vendorsList:action.payload,
                createVendorStatus:false,
                editVendorStatus:false
            }
        case VendorActionTypes.GET_VENDORS_STATUS:
            return{
                ...state,
                fetchingVendors:false,
                fetchingVendorsError:action.payload
            }
        case VendorActionTypes.CREATE_VENDOR_STATUS:
            return{
                ...state,
                createVendorStatus:action.payload
            }
        case VendorActionTypes.EDIT_VENDOR_STATUS:
            return{
                ...state,
                editVendorStatus:action.payload
            }    
        default:
            return state
    }
}

export default VendorReducer