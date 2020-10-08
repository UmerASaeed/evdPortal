import ClientActionTypes from "./client.types"

const INITIAL_STATE =
{
    ClientData:null,
    isfetching:false,
    errorMessage:undefined,
    isUpdating:false,
    comments:""
}

const ClientReducer = ( state = INITIAL_STATE,action) =>
{
    switch (action.type)
    {
        case ClientActionTypes.FETCH_START_ASYNC:
        return{
            ...state,
            isfetching:true
        }  
        case ClientActionTypes.FETCH_SUCCESSFULL_ASYNC:
        return{
            ...state,
            ClientData:action.payload,
            isfetching:false,
            errorMessage:""
        }
        case ClientActionTypes.FETCH_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload
        }    
        case ClientActionTypes.UPDATE_START_ASYNC:
        return{
            ...state,
            isUpdating:true
        }  
        case ClientActionTypes.UPDATE_SUCCESSFULL_ASYNC:
        return{
            ...state,
            comments:action.payload,
            isUpdating:false,
            errorMessage:""
        }
        case ClientActionTypes.UPDATE_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload
        }    
        default:
            return state  
    }
}

export default ClientReducer