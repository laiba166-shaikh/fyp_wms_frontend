import { GET_ALL_UOM, UOM_START_LOADING, UOM_ERROR, UOM_STOP_LOADING, UPDATE_UOM, CREATE_UOM } from "./UomConstant";

const initialState = {
    uomLoading: false,
    error: "",
    uoms: [],
    totalCount: 0
}

const UomReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case UOM_START_LOADING:
            return { ...state, uomLoading: true };
        case UOM_STOP_LOADING:
            return { ...state, uomLoading: false };
        case UOM_ERROR:
            return { ...state, uomLoading: false, error: payload.error };
        case CREATE_UOM:
            return {
                ...state,
                uomLoading: false,
                uoms:[...state.uoms,{...payload.uom}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_UOM:
            return {
                ...state,
                uomLoading: false,
                uoms: [...payload.uoms],
                totalCount: payload.totalCount
            }
        case UPDATE_UOM:
            return {
                ...state,
                uomLoading: false,
                uoms: state.uoms.map((uom) => {
                    if (uom._id === payload.uom._id) return { ...payload.uom }
                    else return uom
                })
            }
        default:
            return state
    }
}

export default UomReducer