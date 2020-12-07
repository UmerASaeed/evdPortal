import {SearchActionTypes} from "./search.types"

const INITIAL_STATE = {
    searchStart:false,
    searchResult:null
}


const SearchReducer = (state = INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case SearchActionTypes.START_SEARCH:
            return{
                ...state,
                searchStart:true
            }

        case SearchActionTypes.SEARCH_RESULT:
            return{
                ...state,
                searchStart:false,
                searchResult:action.payload
            }
        default:
            return state
    }
}

export default SearchReducer