import {RestrictionActionTypes} from "./restrictions.types"

const INITIAL_STATE = {
    restrList:null,
    restrFetching:false,
    restFetchingError:null,
    productStock:[],
    reason:null,
    startTime:null,
    endTime:null,
    newRestrictions:null,
    saveQoutaStatus:false
}

const RestrictionReducer = (state = INITIAL_STATE,action) =>
{
    switch (action.type) {
        case RestrictionActionTypes.FETCH_RESTR_START:
            return{
                ...state,
                restrFetching:true
            }
        case RestrictionActionTypes.FETCH_RESTR_SUCCESS:
            return{
                ...state,
                restrList:action.payload,
                restrFetching:false,
                restFetchingError:null,
                saveQoutaStatus:false,
                newRestrictions:null,
                productStock:[]
            }
        case RestrictionActionTypes.FETCH_RESTR_FAILED:
            return{
                ...state,
                restrFetching:false,
                restFetchingError:action.payload
            }    
        case RestrictionActionTypes.PRODUCT_STOCK_SUCCESS:
            return{
                ...state,
                productStock:[...state.productStock,action.payload]
            } 
        case RestrictionActionTypes.CLEAR_PRODUCT_STOCK:
            return{
                ...state,
                productStock:[]
            }        
        case RestrictionActionTypes.SET_REASON:
            return{
                ...state,
                reason:action.payload
            }    
        case RestrictionActionTypes.SET_START_TIME:
            return{
                ...state,
                startTime:action.payload
            }    
        case RestrictionActionTypes.SET_END_TIME:
            return{
                ...state,
                endTime:action.payload
            } 
        case RestrictionActionTypes.SET_NEW_REST:
            return{
                ...state,
                newRestrictions:{...state.newRestrictions,[action.payload.key]:action.payload}
            }     
        case RestrictionActionTypes.SAVE_QOUTA_SUCCESS:
            return{
                ...state,
                saveQoutaStatus:true
            }                           
        default:
            return state
    }
}

export default RestrictionReducer