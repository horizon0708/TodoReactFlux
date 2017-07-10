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

export function showAll(data){
    dispatcher.dispatch({
        type: "SHOW_ALL",
        data: data
    });
}

export function hideCompleted(data){
    dispatcher.dispatch({
        type: "HIDE_COMPLETED",
        data: data
    });
}

export function getTask(data){
    dispatcher.dispatch({
        type: "GET_TASK",
        data: data
    });
}

export function toggleExpand(data){
    dispatcher.dispatch({
        type: "TOGGLE_EXPAND",
        data: data
    });
}

export function expandAll(data){
    dispatcher.dispatch({
        type: "EXPAND_ALL",
        data: data
    });
}

export function shrinkAll(data){
    console.log("a");
    dispatcher.dispatch({
        type: "SHRINK_ALL",
        data: data
    });
}

