import { SET_PRODUCTS, SET_ONE_PRODUCT,  SHOW_ACTIVE_BIDS, SET_COORDS,SET_RECOMMENDED } from "../actions/types";

const initialState = {
    item: {},
    activeBids: {},
    coords: {},
    recP: {}
};

export default function(state = initialState, action) {

    switch (action.type) {

        case SET_PRODUCTS:
        
            return {
                ...state,
                data: action.payload,
            };
        
        case SET_ONE_PRODUCT: 
        
            return {
                ...state,
                item: action.payload,
            };
        
        case SHOW_ACTIVE_BIDS: 

            return {
                ...state,
                activeBids: action.payload,
            };

        case SET_COORDS:

            return {
                ...state,
                coords: action.payload,    
            };

        case SET_RECOMMENDED:

            return {
                ...state,
                recP: action.payload,
            };
        default:
        
            return state;
    }
}