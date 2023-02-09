import {
    AUTH_SIGNUP_LOADING,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_ERROR,
    AUTH_LOGIN_LOADING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR

} from './actionTypes';
import axios from 'axios';

export const signup = (user) => async (dispatch) => {
    console.log('user: ', user);
    try {
        dispatch({
            type: AUTH_SIGNUP_LOADING,
        });
        const res = await axios.post('/api/user/signup', user);
        // console.log('res: ', res);
        dispatch({
            type: AUTH_SIGNUP_SUCCESS,
            payload:{

                message: res.data.message,
                user: res.data.user,
            }
        });
    } catch (error) {
        // console.log('error: ', error);
        dispatch({
            type: AUTH_SIGNUP_ERROR,
            payload: {
            message: error.response.data.message,
            }
        });
    }
};


export const login = (user) => async (dispatch) => {
    // console.log('user: ', user);
    try {
        dispatch({
            type: AUTH_LOGIN_LOADING,
        });
        const res = await axios.post('/api/user/login', user);
        // console.log('res: ', res);
        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: {
            message: res.data.message,
            user: res.data.user,
            }
        });
    } catch (error) {
        dispatch({
            type: AUTH_LOGIN_ERROR,
            payload : {
            message: error.response.data.message,
            }
        });
    }
};

