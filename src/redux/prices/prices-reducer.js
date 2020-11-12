import PricesActionTypes from "./prices-types"


const INITIAL_STATE = {
    clientWithPrices : null,
    fetchingClientWithPrices:false,
    errorFetchingCWP:null,
    removeOfferStatus:null,
    updateOfferList:{}
}

const PricesReducer = (state = INITIAL_STATE,action) =>
{
    switch (action.type) {
        case PricesActionTypes.GET_CLIENT_PRICES_START:
            return{
                ...state,
                fetchingClientWithPrices:true
            }                    
        case PricesActionTypes.GET_CLIENT_PRICES_SUCCESS:
            return{
                ...state,
                fetchingClientWithPrices:false,
                errorFetchingCWP:null,
                clientWithPrices:action.payload
            }
        case PricesActionTypes.GET_CLIENT_PRICES_FAILED:
            return{
                ...state,
                errorFetchingCWP:action.payload,
                fetchingClientWithPrices:false
            } 
        case PricesActionTypes.REMOVE_OFFER_STATUS:
            return{
                ...state,
                removeOfferStatus:action.payload
            }  
        case PricesActionTypes.UPDATE_OFFER_LIST:
            return{
                ...state,
                updateOfferList:{...state.updateOfferList,[action.payload.key]:action.payload}
            }     
        case PricesActionTypes.REMOVE_OFFER_LIST:
            return{
                ...state,
               updateOfferList:{...state.updateOfferList,[action.payload]:false}
            }    
        case PricesActionTypes.CLEAR_OFFERS_LIST:
            return{
                ...state,
                updateOfferList:null
            }                        
        default:
            return state
    }
}

export default PricesReducer
