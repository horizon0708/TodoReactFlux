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

export function editDish(data){
    dispatcher.dispatch({
        type: "EDIT_DISH",
        text: data
    });
}

export function addIngredient(data){
    dispatcher.dispatch({
        type: "ADD_INGREDIENT",
        text: data
    });
}

export function editIngredient(data){
    dispatcher.dispatch({
        type: "EDIT_INGREDIENT",
        text: data
    });
}

export function deleteIngredient(data){
    dispatcher.dispatch({
        type: "DELETE_INGREDIENT",
        text: data
    });
}