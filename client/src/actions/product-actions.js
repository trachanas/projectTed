import axios from "axios";
import {SET_PRODUCTS, SET_ONE_PRODUCT, SHOW_ACTIVE_BIDS, SET_COORDS, GET_ERRORS} from "./types";

export const setProducts = (payload) => ({ type: SET_PRODUCTS, payload });

export const fetchProducts = () => (dispatch) => {
    axios.get("/api/products/all").then((res) => {
        dispatch(setProducts(res.data));
    });
};


export const exportToXML = () => (dispatch) => {
    axios.get("/api/bids/alltoXML").then(() => {
        console.log("XML file OK!");
    });
};

export const exportToJSON = () => dispatch   => {
    axios.get("/api/bids/alltoJson").then(() => {
        console.log("JSON file OK!");
    });
};
//app.get("/api/bids/recommend", (req, res) => {

export const showRecommended = (id) => dispatch => {
    let id_1 = id === undefined ? 1 : id;
    console.log(id_1);
    axios.get("/api/bids/recommend/" + id_1).then((data) => {
        console.log("11111 " + JSON.stringify(data));
    });
};


export const setCoords = payload => ({ type: SET_COORDS, payload });

export const addToHistory = (item) => {
    axios.post("/api/history/add", item).then();
};

export const addBid = (newBid , history) => dispatch => {

    axios.post("/api/bids/addBid", newBid).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
    );

    axios.post("/api/datas/addBid", newBid).then(() => history.push("/welcomePage"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateElement = (updateInfo) => dispatch => {
    axios.put("/api/datas/update/" + updateInfo.ItemID,  updateInfo).then((r) => console.log(r));
} ;

export const setOneProduct = (payload) => ({ type: SET_ONE_PRODUCT, payload }); 

export const showActiveBids = payload => ({ type: SHOW_ACTIVE_BIDS, payload })

export const searchText = (text) => (dispatch) => {
    axios.post ("/api/datas/search", text).then((r) => dispatch(setProducts(r.data)));
};


