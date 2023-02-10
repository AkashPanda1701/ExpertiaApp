import {
    ADD_TASK_LOADING,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR,
    UPDATE_TASK_LOADING,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR,
    DELETE_TASK_LOADING,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_ERROR,
    GET_TASK,
    CLEAR_TASK_MESSAGE,
} from "./actionTypes";


const initialState = {
    loading: false,
    error: false,
    task:[],
    message: '',
};

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_TASK:
            return {
                ...state,
                loading: false,
                error: false,
                message: '',
                task: payload.task,
            };
        case ADD_TASK_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                message: '',
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                task: payload.task,
            };
        case ADD_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };
        case UPDATE_TASK_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                message: '',
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                task: payload.task,
            };
        case UPDATE_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };
        case DELETE_TASK_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                message: '',
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                task: payload.task,
            };
        case DELETE_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };
        case CLEAR_TASK_MESSAGE:
            return {
                ...state,
                loading: false,
                error: false,
                message: '',
            };


        default:
            return state;
    }
}