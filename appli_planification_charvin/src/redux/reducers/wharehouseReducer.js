//import des actions
import { LOAD_WHAREHOUSES, LOAD_WHAREHOUSES_SUCCESS, LOAD_WHAREHOUSES_ERROR } from "../actions/wharehouseActions"

//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,
    wharehouses: [],
    error: ""
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié à l'utilisateur: soit il est connecté, soit non
const wharehouseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_WHAREHOUSES: 
            return {
                ...state,
                isLoading: true
            }
        

        case LOAD_WHAREHOUSES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                wharehouses: action.payload
            }
        

        case LOAD_WHAREHOUSES_ERROR: 
            return {
                ...state,
                isLoading: false,
                wharehouses: [],
                error: action.payload
            }
        
        default: return state
    }

}

export default wharehouseReducer

/*export const getWharehouses = () => dispatch => {
    allWharehouses()
    .then(wharehouses => {
        dispatch({
            type: LOAD_WHAREHOUSES,
            payload: wharehouses
        })
    })
}*/