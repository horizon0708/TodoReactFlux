import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class EditItem 
extends React.Component{
    constructor(){
        super();
        this.state = {
            text: ""
        }
    }

    componenetWillMount() {
        this.setState({text: this.props.text});
    }

    handleChange = (e) => { 
        this.setState({text: e.target.value});
    }

    handleEnterPress =(props, event) =>{
        var key = event.which || event.charCode;
        if (key === 13){
            event.preventDefault();
            TaskActions.editTask({
                name: this.state.text,
                parentId: this.props.parentId
            });
            this.props.editToggle();
        }
    }

    render(){
        return(
            <input 
            onKeyPress={(event) => this.handleEnterPress(this.state.text, event)}
            value={this.state.text}
            onChange={(e)=> this.handleChange(e)}
            autoFocus /> 
        );
    }
}

EditItem.propTypes = {
    parentId: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired
}
