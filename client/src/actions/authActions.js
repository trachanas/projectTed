import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_ALL_USERS, SET_USER_INFO } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/requestWaiting")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const setUserInfo = (user) => ({
    type: SET_USER_INFO,
    payload: user
});

export const acceptOneUser = (id) => dispatch => {
  axios.put("/api/users/accept/" + id).then(() => {
      fetchAllUsers()(dispatch);
  });
};

export const deleteOneUser = (id) => dispatch => {

  axios.delete("/api/users/delete/" +  id).then(() => {
    fetchAllUsers()(dispatch);
  });
};

export const fetchAllUsers = () => dispatch => {
    axios.get("/api/users/all").then((res) => {
        dispatch(setAllUsers(res.data));
    });
};

// Login - get user token
export const loginUser = (payload)  => dispatch => {
    //dispatch(setUserInfo(payload.userData));
    let isAdmin = false;
    const {username , password} = payload.userData;

    if (username === "ange_admin" && password === "123456"){
        isAdmin = true;
    }
    let isAccepted

    axios.get("/api/users/getUser/" + username).then(res => {
        setTimeout(() => {
            isAccepted = res.data.isAccepted;
            res.data.isAccepted ? dispatch(setCurrentUser(res.data)) : console.log("");
            if (isAdmin){
                axios.post("/api/users/login", payload.userData).then(() => payload.history.push("/admin"))
            } else if (!isAdmin && isAccepted){
                axios.post("/api/users/login", payload.userData).then(() => payload.history.push("/welcomePage"))
            } else if(!isAdmin && !isAccepted){
                axios.post("/api/users/login", payload.userData).then(() => payload.history.push("/requestWaiting"))
            }
        }, 1000)
    });

    // dispatch(setCurrentUser(payload.userData));
    // setTimeout(() => {
    //     if (Amount > current){
    //         database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , {$set : {Currently: Amount}})
    //     }
    //     console.log(current)
    // }, 1000);





};
            // Save to localStorage
// Set token to localStorage
//             const { token } = res.data;
//             localStorage.setItem("jwtToken", token);
//             // Set token to Auth header
//             setAuthToken(token);
//             // Decode token to get user data
//             const decoded = jwt_decode(token);
//             // Set current user
             //dispatch(setCurrentUser(decoded));

        // .catch(err =>
        //     dispatch({
        //         type: GET_ERRORS,
        //         payload: err.response.data
        //     })
        // );


export const setAllUsers = (users) => ({
    type: SET_ALL_USERS,
    users,
});

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
