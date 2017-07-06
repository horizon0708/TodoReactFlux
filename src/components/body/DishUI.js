var React = require("react");
var IngredientUI = require("./IngredientUI");
var ContentEditable = require("react-contenteditable");
var FoodActions = require("../../actions/FoodActions");
var ReactDOM = require("react-dom");

class DishUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            isEditing: false,
            tempName: 'wegewf'
        };
        this.handleClick = this.handleClick.bind(this);
        this.editStateHandler = this.editStateHandler.bind(this);

    }

    handleClick() {
        if (this.state.isClicked === false) {
            this.setState({ isClicked: true });
        } else {
            this.setState({ isClicked: false });
        }
    }


    showIngredientsList(props) {

        var tempArr = props;
        return tempArr.map((x, index) => {
            //console.log(x);
            return <div className="col-sm-8 offset-sm-2 ingredient" key={index}>
                {x}
            </div>
        });
    }

    expand(props) {
        if (this.state.isClicked === true) {
            return this.showIngredientsList(props.ingredients);
        }
    }

    deleteDish = (id) => {
        FoodActions.deleteDish(id);
    }

    editHandler = (e) => {
        this.setState({ tempName: e.target.value });
    }

    handleEditEnter(props, event) {
        var x = event.which || event.charCode;
        if (x === 13) {
            event.preventDefault();
            if (this.state.tempName.length !== 0) {
                const dishName = this.state.tempName;
                const dishId = props.id;
                const dataArr = [dishId, dishName];
                console.log("we" + props.id);
                FoodActions.editDish(dataArr);
                this.setState({
                    isEditing: false
                });
            }
        }
    }
    // Refs: https://facebook.github.io/react/docs/refs-and-the-dom.html
    dishDisplay(props) {
        if (this.state.isEditing) {
            const tempName = this.state.tempName;
            return <input
                onChange={(e) => this.editHandler(e)}
                onKeyPress={(evt) => this.handleEditEnter(props, evt)}
                value={tempName}
                autoFocus
            ></input>

        } else {
            const name = props.name;
            return <div><span> {name}  </span> <button onClick={(event) => this.editStateHandler(props, event)}> Edit </button></div>
                }
    }

    editStateHandler = (props, event) => {
        if (this.state.isEditing == false) {
                    this.setState({
                        isEditing: true,
                        tempName: props.name
                    }
                    );
                }
    }

    render() {
        const dish = this.props.dish;
        const id = dish.id;
        return (
            <div className="row">
                    <div className="col-sm-8 dish" onClick={this.handleClick}>
                        {this.dishDisplay(dish)}
                    </div>
                    <button onClick={() => this.deleteDish(id)}> delete! </button>
                    {this.expand(dish)}
                </div>
                );
    }
}
// Passing an extra argument with event handler:
// https://stackoverflow.com/questions/28331102/pass-additional-arguments-to-event-handler


class AddDishUI extends React.Component {
                    render() {
                const contentEdit = this.props.contentEdit;
        const newDish = this.props.newDish;
        const addDish = this.props.addDish;
        const click = this.props.click;
        const keyPress = this.props.keyPress;
        return (
            <div className="row">
                    <div className="col-sm-8 dish">
                        <ContentEditable
                            html={newDish}
                            disabled={false}
                            onChange={contentEdit}
                            onClick={click}
                            onKeyPress={keyPress}
                        />
                    </div>
                    <button onClick={addDish}>add!</button>
                </div>
                );
    }
}

module.exports = {
                    dishUI: DishUI,
    addDish: AddDishUI
}
