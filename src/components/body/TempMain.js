import React from 'react';
import '../../App.css';
import TaskStore from "../../stores/TaskStore";
import GenericListItem from "./GenericListItem";
//import * as FoodActions from "../../actions/FoodActions";
import GenericListSubItem from './GenericListSubItem';

export default class TempMain extends React.Component{
    constructor(){
        super();
        this.state = {
            tasks: TaskStore.getLevel(0)
        }
    }

    componentWillMount(){
        TaskStore.on("change", ()=>{
            this.setState({
                tasks: TaskStore.getLevel(0)
            })
        })
    }

    render(){
        const listItems = this.state.tasks.map((x)=>{
            return <GenericListItem data={x} key={x.id} />
        });
        return(
            <div className="row">
                <div className="col-sm-8 offset-sm-2" id="body"> wf
                    {listItems}
                </div>
            </div>
        );
    }
}