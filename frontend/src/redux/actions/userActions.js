
//types d'actions
export const LOAD_USER_INFO = "LOAD_USER_INFO"
export const LOGOUT_USER = "LOGOUT_USER"


//actions
export const loadUserInfo = user => {
    return {
        type: LOAD_USER_INFO,
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}


