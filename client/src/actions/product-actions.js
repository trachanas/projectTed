import axios from "axios";

import { SET_PRODUCTS, SET_ONE_PRODUCT, SHOW_ACTIVE_BIDS, SET_COORDS, SHOW_SEARCH_RESULTS } from "./types";

export const setProducts = (payload) => ({ type: SET_PRODUCTS, payload });

export const fetchProducts = () => (dispatch) => {
    axios.get("/api/products/all").then((res) => {
        dispatch(setProducts(res.data));
    });
};

export const setCoords = payload => ({ type: SET_COORDS, payload });

export const addToHistory = (item) => {
    axios.post("/api/history/add", item);
}



export const addBid = (newBid , history) => dispatch => {    
    axios.post("/api/datas/addBid", newBid).then(() => history.push("/welcomePage"));
}

export const updateElement = (updateInfo) => {
    axios.put("/api/datas/update",  updateInfo).then((r) => console.log(r));
} 

export const setOneProduct = (payload) => ({ type: SET_ONE_PRODUCT, payload }); 

export const showActiveBids = payload => ({ type: SHOW_ACTIVE_BIDS, payload })

export const searchText = (text) => (dispatch) => {
    axios.post ("/api/datas/search", text).then((r) => dispatch(setProducts(r.data)));
}


