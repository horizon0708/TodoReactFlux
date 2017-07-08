import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class DeleteItem extends React.Component{
    
    handleClick = () =>  TaskActions.deleteTask(this.props.parentId);

    render(){
        return (
            <i className="fa fa-trash-o" onClick={this.handleClick} />
        );
    }
}

DeleteItem.propTypes = {
    parentId: React.PropTypes.number.isRequired,
}
