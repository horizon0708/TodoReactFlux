import dispatcher from "../dispatcher";

export function addTask(data){
    dispatcher.dispatch({
        type: "CREATE_TASK",
        data: data
    });
}

export function deleteTask(data){
    dispatcher.dispatch({
        type: "DELETE_TASK",
        data: data
    });
}

export function editTask(data){
    dispatcher.dispatch({
        type: "EDIT_TASK",
        data: data
    });
}

