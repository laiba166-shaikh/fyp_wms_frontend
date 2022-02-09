
import { INVENTORY_START_LOADING, INVENTORY_STOP_LOADING, GET_ALL_INVENTORY, INVENTORY_ERROR } from "./InventoryConstant"

const initialState = {
    inventoryLoading: false,
    error: "",
    inventories: [],
    totalCount: 0
}

const InventoryReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case INVENTORY_START_LOADING:
            return { ...state, inventoryLoading: true };
        case INVENTORY_STOP_LOADING:
            return { ...state, inventoryLoading: false };
        case INVENTORY_ERROR:
            return { ...state, inventoryLoading: false, error: payload.error };
        case GET_ALL_INVENTORY:
            return {
                ...state,
                inventoryLoading: false,
                inventories: [...payload.inventories],
                totalCount: payload.totalCount
            }
        default:
            return state
    }
}

export default InventoryReducer;