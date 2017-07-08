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

export function toggleComplete(data){
    dispatcher.dispatch({
        type: "TOGGLE_COMPLETE",
        data: data
    });
}

export function loadStoragedata(data){
    dispatcher.dispatch({
        type: "LOAD_DATA",
        data: data
    });
}

export function saveStorage(data){
    dispatcher.dispatch({
        type: "SAVE_DATA",
        data: data
    });
}

