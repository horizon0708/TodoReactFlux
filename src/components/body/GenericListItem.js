import React from 'react';
import * as StyleHelper from './StyleHelper';
import GenericListSubItem from './GenericListSubItem';
import TaskStore from "../../stores/TaskStore";


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
                var y = TaskStore.getTask(x); //filter() returns an array!!!!!
                return <GenericListItem data={y[0]} key={y[0].id} mayExpand={false} />
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
                    {data.name}
                </div>
                <div>{this.expand(data)}</div>
            </div>
        );
    }
}

GenericListItem.defaultProps = {
    mayExpand: true
};