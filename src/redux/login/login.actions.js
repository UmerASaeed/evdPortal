import loginType from "./login.types"

export const LoginSuccess = (token) =>
{
    return{
        type:loginType.LOGIN_SUCCESS,
        payload:token
    }
}

export const LoginTimedOut = () =>
{
    return{
        type:loginType.LOGIN_TIMED_OUT
    }
}

export const LogOut = () =>
{
    return{
        type:loginType.LOG_OUT
    }
}