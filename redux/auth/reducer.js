import {
    AUTH_SIGNUP_LOADING,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_ERROR,
    AUTH_LOGIN_LOADING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    CLEAR_AUTH_MESSAGE,
    AUTH_LOGOUT

} from './actionTypes';


const initialState = {
    loading: false,
    error: false,
    message: '',
    user: null,
    isAuth: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_SIGNUP_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                message: '',
                isAuth : false,
            };
        case AUTH_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                user: payload.user,
                isAuth: true,
            };
        case AUTH_SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
                isAuth: false,
            };
        case AUTH_LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                message: '',
                isAuth: false,
            };
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                user: payload.user,
                isAuth: true,
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
                isAuth: false,
            };

            case  CLEAR_AUTH_MESSAGE:
                return {
                    ...state,
                    loading: false,
                    error: false,
                    message: '',
                };
            case AUTH_LOGOUT:
                return {
                    ...state,
                    loading: false,
                    error: false,
                    message: '',
                    user: null,
                    isAuth: false,
                };
        default:
            return state;
    }
};