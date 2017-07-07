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