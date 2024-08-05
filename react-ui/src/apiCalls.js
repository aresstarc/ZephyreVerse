import axios from "axios"
const apiUrl = process.env.REACT_APP_API_URL;

export const loginCall = async(userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try{
        const res = await axios.post(`${apiUrl}/api/auth/login`, userCredentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    }catch(err){
        dispatch({type: "LOGIN_FAILURE" , payload: err.response?.data || "Login failed"})
    }
}

export const logoutCall = async (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };