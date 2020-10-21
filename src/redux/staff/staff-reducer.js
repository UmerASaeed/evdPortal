import StaffActionTypes from "./staff.types"

const INITIAL_STATE =
{
    StaffData:null,
    isfetching:false,
    errorMessage:undefined,
    addStaff:{
        staffInfo:{

        },
        staffPerms:{

        }
    },
    createStaff:false
}

const StaffReducer = ( state = INITIAL_STATE,action) =>
{
    switch (action.type)
    {
        case StaffActionTypes.FETCH_STAFF_START_ASYNC:
        return{
            ...state,
            isfetching:true
        }  
        case StaffActionTypes.FETCH_STAFF_SUCCESSFULL_ASYNC:
        return{
            ...state,
            StaffData:action.payload,
            isfetching:false,
            errorMessage:""
        }
        case StaffActionTypes.FETCH_STAFF_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload
        }    
        case StaffActionTypes.UPDATE_STAFF_INFO:
        return{
            ...state,
            addStaff:{
                staffInfo:action.payload
            }
        } 
        case StaffActionTypes.CREATE_STAFF:
        return{
            ...state,
            createStaff:true
        }      
        default:
            return state  
    }
}

export default StaffReducer