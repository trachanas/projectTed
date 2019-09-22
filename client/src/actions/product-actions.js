import axios from "axios";
import {SET_PRODUCTS, SET_ONE_PRODUCT, SHOW_ACTIVE_BIDS, SET_COORDS, GET_ERRORS} from "./types";
var fs = require('browserify-fs');

export const setProducts = (payload) => ({ type: SET_PRODUCTS, payload });

export const fetchProducts = () => (dispatch) => {
    axios.get("/api/products/all").then((res) => {
        dispatch(setProducts(res.data));
    });
};


function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}
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



//
// // Data which will write in a file.
// let data = "Learning how to write in a file."
//
// // Write data in 'Output.txt' .
// fs.writeFile('Output.txt', data, (err) => {
//
    // In case of a error throw err.

    export const setCoords = payload => ({ type: SET_COORDS, payload });

export const addToHistory = (item) => {
    axios.post("/api/history/add", item);
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


