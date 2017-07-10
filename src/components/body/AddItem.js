import React from 'react';
import * as TaskActions from "../../actions/TaskActions";
import * as StyleHelper from './StyleHelper';

export default class AddItem extends React.Component{
    constructor(){
        super();
        this.state = {
            text: "",
            isActive: true
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

    checkActive(){
        if(this.state.isActive){
            return(
            <span className={"style-4 "+ StyleHelper.getTaskClassName(this.props.tasklevel)}>
                <span className="tick-box"><i className="fa fa-square-o grey"/></span>
            <input type="text" placeholder={this.props.placeholder}
            onKeyPress={(event) => this.handleEnterPress(this.state.text, event)}
            value={this.state.text}
            onChange={(e)=> this.handleChange(e)}
            autoFocus /> </span>
        );
        } else {
            return null;
        }
    }

    render(){
        return(
           this.checkActive()
        );
    }
}

AddItem.propTypes = {
    tasklevel: React.PropTypes.number.isRequired,
}

AddItem.defaultProps = {
    placeholder: "",
    parentId: undefined
}