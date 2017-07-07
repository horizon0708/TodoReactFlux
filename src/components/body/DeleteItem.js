import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class DeleteItem extends React.Component{
    
    handleClick = () =>  TaskActions.deleteTask(this.props.parentId);

    render(){
        return (
            <button onClick={this.handleClick}> Del</button>
        );
    }
}

DeleteItem.propTypes = {
    parentId: React.PropTypes.number.isRequired,
}
