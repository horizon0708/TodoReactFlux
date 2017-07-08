import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class CompleteItem
    extends React.Component {
        constructor(){
            super()
            this.state = {
                ticked: false
            }
        }

    componenetWillMount() {
        this.setState({ text: this.props.text });
    }

    toggleState(){
        this.state.ticked ? this.setState({ticked: false}) : this.setState({ticked: true});
    }

    handleClick = (e) => {
        TaskActions.toggleComplete(this.props.parentId);
        this.toggleState();
    }

    renderTick(){
        if(this.state.ticked){
            return <i onClick={(e)=>this.handleClick(e)} className="fa fa-check-square-o"/>;
        } else {
            return <i onClick={(e)=>this.handleClick(e)} className="fa fa-square-o"/>;
        }
    }

    render() {
        return (
            this.renderTick()
        );
    }
}

CompleteItem.propTypes = {
    parentId: React.PropTypes.number.isRequired
}




