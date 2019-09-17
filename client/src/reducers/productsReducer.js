import { SET_PRODUCTS, SET_ONE_PRODUCT,  SHOW_ACTIVE_BIDS, SET_COORDS } from "../actions/types";

const initialState = {
    item: {},
    activeBids: {},
    coords: {}
};

export default function(state = initialState, action) {

    switch (action.type) {

        case SET_PRODUCTS:
        
            return {
                ...state,
                data: action.payload,
            }
        
        case SET_ONE_PRODUCT: 
        
            return {
                ...state,
                item: action.payload,
            }
        
        case SHOW_ACTIVE_BIDS: 

            return {
                ...state,
                activeBids: action.payload,
            }

        case SET_COORDS:

            return {
                ...state,
                coords: action.payload,    
            }

        default:
        
            return state;
    }
}