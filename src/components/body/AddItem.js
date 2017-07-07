import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class AddItem extends React.Component{
    
    handleClick = () => [
        
    ]

    render(){
        (
            <button> Add </button>
        );
    }
}


AddItem.propTypes = {
    parentId: React.PropTypes.number.isRequired,
}
