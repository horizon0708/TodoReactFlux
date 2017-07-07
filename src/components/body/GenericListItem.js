import React from 'react';
import * as StyleHelper from './StyleHelper';
import TaskStore from "../../stores/TaskStore";
import DeleteItem from "./DeleteItem";


//Utility Component
export default class GenericListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isClicked: false,
        };
    }

    handleItemClick = () =>
        this.state.isClicked ? this.setState({ isClicked: false }) : this.setState({ isClicked: true });

    expand(data) {
        if (this.state.isClicked) {
            // expand to show sub-tasks (if any)
            // if expanding is disabled, return. Could probably look at the level of the prop?    
            if (!this.props.mayExpand) { return; } 
            const subTasks = data.subtask.map((x) => {
                var x = TaskStore.getTask(x); //filter() returns an array!!!!!
                if (x === undefined){
                    // delete subtaasks
                    return;
                }
                return <GenericListItem data={x} key={x.id} mayExpand={false} />
            });
            return <div>

                <div>{subTasks}</div>
            </div>
        } 
    }

    render() {
        const data = this.props.data;
        return (
            <div>
                <div
                    id={StyleHelper.getTaskId(data.taskLevel)}
                    className={StyleHelper.getTaskClassName(data.taskLevel)}
                    data={data}
                    onClick={this.handleItemClick}
                >
                    {data.name} <DeleteItem parentId={data.id} />
                </div>
                <div>{this.expand(data)}</div>
            </div>
        );
    }
}

GenericListItem.defaultProps = {
    mayExpand: true
};