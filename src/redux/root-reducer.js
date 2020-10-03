import {combineReducers} from 'redux'
import SectionReducer from "./section/section-Reducer"

const rootReducer = combineReducers({
    section:SectionReducer
});

export default rootReducer