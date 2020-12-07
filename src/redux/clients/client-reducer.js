import ClientActionTypes from "./client.types"

const INITIAL_STATE =
{
    ClientData:null,
    isfetching:false,
    errorMessage:undefined,
    isUpdating:false,
    comments:"",
    updateSuccess:false,
    perms:null,
    clientCreated:false,
    clientUpdated:false
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
            errorMessage:"",
            updateSuccess:false,
            perms:null,
            clientCreated:false,
            clientUpdated:false
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
            errorMessage:"",
            updateSuccess:true
        }
        case ClientActionTypes.UPDATE_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload
        }  
        case ClientActionTypes.GET_PERMS_SUCCESS:
        return{
            ...state,
            perms:action.payload
        }  
        case ClientActionTypes.CREATE_CLIENT_STATUS:
        return{
            ...state,
            clientCreated:action.payload
        }
        case ClientActionTypes.EDIT_CLIENT_STATUS:
        return{
            ...state,
            clientUpdated:action.payload
        }
        default:
            return state  
    }
}

export default ClientReducer