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
        var _id = Date.now() + Math.floor(Math.random()*40);
        this.foods.push({
            _id, 
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