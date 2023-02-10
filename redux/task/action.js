import {
    ADD_TASK_LOADING,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR,
    UPDATE_TASK_LOADING,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR,
    DELETE_TASK_LOADING,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_ERROR
} from "./actionTypes";
import axios from "axios";

export const  addTask = (task,userid) => async (dispatch) => {
    console.log('userid: ', userid);
    console.log('task: ', task);
    try {
        dispatch({
            type: ADD_TASK_LOADING,
        });
        const res = await axios.post("/api/user/task", {task},{
            headers: {
                'Content-Type': 'application/json',
                userid
            }
        });
        console.log('res: ', res);
        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: {
                message: res.data.message,
                task: res.data.tasks.tasks,
            },
        });
    } catch (error) {
        dispatch({
            type: ADD_TASK_ERROR,
            payload: {
                message: error.response.data.message,
            },
        });
    }
};
