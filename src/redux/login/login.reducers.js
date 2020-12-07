import loginType from "./login.types"

const INITIAL_STATE ={
    loginSuccess:false,
    token:null,
    sessionEnded:false
}

const LoginReducer = (state = INITIAL_STATE,action) =>
{
    switch (action.type) {
        case loginType.LOGIN_SUCCESS:
        return{
            ...state,
            loginSuccess:true,
            token:action.payload,
            sessionEnded:false
        } 
        case loginType.LOGIN_TIMED_OUT:
        case loginType.LOG_OUT:
        return{
            ...state,
            loginSuccess:false,
            token:null
        }    
        case loginType.SESSION_ENDED:
            return{
                ...state,
                sessionEnded:true
            }
        default:
            return state
        
    }
}

export default LoginReducer