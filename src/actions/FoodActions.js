import dispatcher from "../dispatcher";

export function createDish(text) {
    dispatcher.dispatch({
        type: "CREATE_DISH",
        text
    });
}
export function deleteDish(id) {
    dispatcher.dispatch({
        type: "DELETE_DISH",
        text: id
    });
}