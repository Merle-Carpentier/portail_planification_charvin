//actions types
export const LOAD_USER_INFO = "LOAD_USER_INFO"
export const LOGOUT_USER = "LOGOUT_USER"

export const loadUserInfo = (user)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_USER_INFO,
            payload: user
        })
    }
    
}

export const logoutUser = ()=>{
    return function(dispatch) {
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}