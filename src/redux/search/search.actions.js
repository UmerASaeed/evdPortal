import {SearchActionTypes} from "./search.types"

export const StartSearch = (params) =>
{
    return{
        type:SearchActionTypes.START_SEARCH,
        payload:params
    }
}

export const SearchResult = (data) =>
{
    return{
        type:SearchActionTypes.SEARCH_RESULT,
        payload:data
    }
}