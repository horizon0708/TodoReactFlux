import {
    EventEmitter
} from "events";

import dispatcher from "../dispatcher"

class FoodStore extends EventEmitter {
    constructor() {
        super();
        this.foods = [{
            id: 159121295,
            name: "almond flat white",
            ingredients: ["coffee", "almond milk", "skill"]
        }, {
            id: 171251265,
            name: "flat white",
            ingredients: ["coffee", "milk", "skill"]
        }];
    }

    getAll(){
        return this.foods;
    }

    createDish(text){
        var id = Date.now() + Math.floor(Math.random()*40);
        this.foods.push({
            id, 
            name: text,
            ingredients: []
        })
        this.emit("change");
    }

    deleteDish(id){
        var testArr = this.foods;
        for (var i = 0; i < testArr.length; i++) {
            if (testArr[i].id === id){
                testArr.splice(i,1);
            } 
        }
        this.foods = testArr;
        //this.foods = this.foods.filter(x => x.id !== id);
        this.emit('change');
    }

    editDish(data){
        var id = data[0];
        var text = data[1];
        var Arr = this.foods;
        for (var i = 0; i < Arr.length; i++) {
            if (Arr[i].id === id){
                Arr[i].name = text;
            } 
        }
        this.foods = Arr;
        this.emit('change');
    }

    editIngredient(data){ // [id, index, value]
        var foodId = data[0];
        var ingredient = data[1];
        var text = data[2];
        var Arr = this.foods;
        for (var i = 0; i < Arr.length; i++) {
            if (Arr[i].id === foodId){
                Arr[i]['ingredients'][ingredient] = text;
            } 
        }
        this.foods = Arr;
        this.emit('change');
    }

    addIngredient(data){ // [id, value]
        var foodId = data[0];
        console.log(data);
        var text = data[1];
        var Arr = this.foods;
        for (var i = 0; i < Arr.length; i++) {
            if (Arr[i].id === foodId){
                console.log(Arr[i]);
                Arr[i]['ingredients'].push(text);
            } 
        }
        this.foods = Arr;
        this.emit('change');
    }

    deleteIngredient(data){ // id, index
        var foodId = data[0];
        var index = data[1];
        for (var i = 0; i < this.foods.length; i++) {
            if (this.foods[i].id === foodId){
                this.foods[i]['ingredients'].splice(index, 1);
            } 
        }
        this.emit('change');
    }

    handleActions(action){
        switch(action.type){
            case "CREATE_DISH":{
                this.createDish(action.text);
                break;
            }
            case "DELETE_DISH":{
                this.deleteDish(action.text);
                break;
            }
            case "EDIT_DISH":{
                this.editDish(action.text);
                break;
            }
            case "ADD_INGREDIENT":{
                this.addIngredient(action.text);
                break;
            }
            case "EDIT_INGREDIENT":{
                this.editIngredient(action.text);
                break;
            }
            case "DELETE_INGREDIENT":{
                this.deleteIngredient(action.text);
                break;
            }
            default:{
                break;
            }
        }
    }
}

const foodStore = new FoodStore();
dispatcher.register(foodStore.handleActions.bind(foodStore));
window.foodStore = foodStore;
window.dispatcher = dispatcher;

export default foodStore;