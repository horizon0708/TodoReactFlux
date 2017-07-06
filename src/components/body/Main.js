import React from 'react';
import '../../App.css';
import FoodStore from "../../stores/FoodStore";
import * as FoodActions from "../../actions/FoodActions";

var DishUI = require('./DishUI').dishUI;
var AddDishUI = require('./DishUI').addDish;
//var ContentEditable = require("react-contenteditable");

// User Story: I can create recipes that have names and ingredients.
// User Story: I can see an index view where the names of all the recipes are visible.
// User Story: I can click into any of those recipes to view it.
// User Story: I can edit these recipes.
// User Story: I can delete these recipes.
// User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.
const newDishMsg = 'Start typing here to add a new dish! '

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: FoodStore.getAll(),
            newDish: newDishMsg
        }
        this.handleNewDishEdit = this.handleNewDishEdit.bind(this);
        this.handleNewDishAdd = this.handleNewDishAdd.bind(this);
        this.handleNewDishClick = this.handleNewDishClick.bind(this);
        this.handleNewDishEnter = this.handleNewDishEnter.bind(this);
    }

    handleNewDishClick(e) {
        if(this.state.newDish === newDishMsg)
        this.setState({ newDish: "" });
    }

    handleNewDishEdit(e) {
        if (this.state.newDish.length < 30) {
            this.setState({ newDish: e.target.value })
        }
    }

    handleNewDishAdd(e) {
        const addition = this.state.dishes;
        if (this.state.newDish.length !== 0) {
            FoodActions.createDish(this.state.newDish);
            this.setState({
                newDish: newDishMsg
            });
        }
    }

    handleNewDishEnter(event) {
        var x = event.which || event.charCode;
        if (x === 13) {
            event.preventDefault();
            const addition = this.state.dishes;
            if (this.state.newDish.length !== 0) {
                FoodActions.createDish(this.state.newDish);
                this.setState({
                    newDish: newDishMsg
                });
            }
            this.setState({ newDish: "" });
        }
    }
    
    componentWillMount(){
      FoodStore.on("change", ()=>{
        this.setState({
           dishes: FoodStore.getAll()
        });
      });
    }


    componentDidMount() {
        if (storageAvailable('localStorage')) { // test if localStorageisAvailable
            if (localStorage.getItem('_dishes')) {
                this.setState({
                    dishes: JSON.parse(localStorage.getItem('_dishes'))
                });
            } else {
                localStorage.setItem('_dishes', JSON.stringify(this.state.dishes));
            }
        }
        else {
            // print out msg that localStorage is not available
        }
    }

    populateDishUI() {
        const testArr = this.state.dishes;
        return testArr.map((x) => {
            return <DishUI dish={x} key={x.id}/>
        });
    }

    createFood(){
        FoodActions.createDish(Date.now());
    }

    render() {
        const dish = this.state.newDish
        return (
            <div className="row">
                <div className="col-sm-8 offset-sm-2" id="body"> wf
                    {this.populateDishUI()}
                    <AddDishUI contentEdit={this.handleNewDishEdit} newDish={dish}
                        addDish={this.handleNewDishAdd}
                        click={this.handleNewDishClick}
                        keyPress={this.handleNewDishEnter} />
                    <button onClick={this.createFood.bind(this)}>Create!</button>
                </div>
            </div>
        );
    }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}