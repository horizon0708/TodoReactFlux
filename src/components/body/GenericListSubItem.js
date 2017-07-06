import React from 'react';
import * as StyleHelper from './StyleHelper';

//Utility Component
export default class GenericListSubItem extends React.Component{
    constructor(){
        super();
        this.state ={
            isClicked: false,
            expandEnabled: true  
        };
    }

    render(){
        const data = this.props.data;
        return(
            <div 
            data = {data}
            > sdf
            {data.name}
            </div>
        );
    }
}