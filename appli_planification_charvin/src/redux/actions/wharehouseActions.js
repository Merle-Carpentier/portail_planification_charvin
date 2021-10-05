import { allWharehouses } from "../../apiCalls/wharehousesCalls.js"
import { configApi } from "../../apiCalls/configApi.js"

export const LOAD_WHAREHOUSES = "LOAD_WHAREHOUSES"

//action de chargement des entrepôts
export const loadWharehouses = () => {
    allWharehouses()
    .then((responseWh) => {
        dispatch({
            type: LOAD_WHAREHOUSES,
            payload: responseWh.result
        })
    })
}