import {
    SET_PRODUCTS,
    SET_ONE_PRODUCT,
    SHOW_ACTIVE_BIDS,
    SET_COORDS,
    SET_RECOMMENDED,
    SHOW_MESSAGES
} from "../actions/types";

const initialState = {
    item: {},
    activeBids: {},
    coords: {},
    recP: [],
    myMes: []
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

        case SHOW_MESSAGES:
            console.log(action.payload)
            return {
                ...state,
                myMes: action.payload
            };
        default:
        
            return state;
    }
}