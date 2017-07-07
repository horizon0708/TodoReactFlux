import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class AddItem extends React.Component{
    constructor(){
        super();
        this.state = {
            text: ""
        }
    }

    handleChange = (e) => { 
        this.setState({text: e.target.value});
    }

    handleEnterPress =(props, event) =>{
        var key = event.which || event.charCode;
        if (key === 13){
            event.preventDefault();
            TaskActions.addTask({
                id :  Date.now(),
                name: this.state.text,
                tasklevel: this.props.tasklevel,
                parentId: this.props.parentId
            });
            this.setState({text: ""});
        }
    }

    render(){
        return(
            <input placeholder={this.props.placeholder}
            onKeyPress={(event) => this.handleEnterPress(this.state.text, event)}
            value={this.state.text}
            onChange={(e)=> this.handleChange(e)}
            autoFocus /> 
        );
    }
}

AddItem.propTypes = {
    tasklevel: React.PropTypes.number.isRequired,
}

AddItem.defaultProps = {
    placeholder: "Type here to add new tasks",
    parentId: undefined
}