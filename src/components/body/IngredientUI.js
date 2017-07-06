var React = require('react');
var FoodActions = require("../../actions/FoodActions");

class IngredientUI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            tempName : ''
        }
    }

    handleEditEnter = (props, event) => {
        var x = event.which || event.charCode;
        if (x === 13) {
            event.preventDefault();
            if (this.state.tempName.length !== 0) {
                const dishName = this.state.tempName;
                const dishId = props.id;
                const dataArr = [dishId, ,dishName];
                FoodActions.editIngredient(dataArr);
                this.setState({
                    isEditing: false
                });
            }
        }
    }

    handleEditState = (props, event) => {
        if (this.state.isEditing == false){
            this.setState({
                isEditing: true,
                tempName : props.name
            });
        }
    }
    
    render() {
        const ingredient = this.props.ingredient
        return (
            <div className="col-sm-8 offset-sm-2 ingredient">
                {ingredient}
            </div>
        );
    }
}

class AddIngredientUI extends React.Component {
    constructor(){
        super();
        this.state = {
            text : '',
        }
    }

    handleInput =(e) => {
        this.setState({text: e.target.value});
    }

    handleKeyPress=(p, e)=>{
        var x = e.which || e.charCode;
        if (x === 13) {
            e.preventDefault();
            if (this.state.text.length !== 0) {
                const dataArr = [p.id, this.state.text];
                FoodActions.addIngredient(dataArr);
                this.setState({text: ''});
            }
        }
    }
    
    render(){
        const dish = this.props.dish
        
        return(
            <input
            value={this.state.text} 
            placeholder="Type here to add a new ingredient!"
            onChange={(e)=>this.handleInput(e)}
            onKeyPress={(e)=>this.handleKeyPress(dish, e)} />
        );
    }
}

module.exports ={
    ingredientUI: IngredientUI,
    addIngredient: AddIngredientUI
}