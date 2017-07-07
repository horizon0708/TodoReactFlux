import React from 'react';
import * as StyleHelper from './StyleHelper';
import TaskStore from "../../stores/TaskStore";
import DeleteItem from "./DeleteItem";
import AddItem from './AddItem';
import EditItem from './EditItem';

//Utility Component
export default class GenericListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isClicked: false,
            isEditing: false,
            mayExpand: true
        };
    }

    componetWillMount(){
        if (this.props.data.taskLevel -1 > this.props.maxLevel){
            this.setState({mayExpand: false});
        }
    }

    handleItemClick = () =>
        this.state.isClicked ? this.setState({ isClicked: false }) : this.setState({ isClicked: true });

    handleEditClick = () => this.editToggle(); // abstracted to let editToggle be accessible by child components
        
    editToggle() {
        this.state.isEditing ? this.setState({ isEditing: false }) : this.setState({ isEditing: true });
    }

    expand(data) {
        if (this.state.isClicked) {
            // expand to show sub-tasks (if any)
            // if expanding is disabled, return. Could probably look at the level of the prop?    
            if (this.state.mayExpand) { 
            const subTasks = data.subtask.map((x) => {
                var x = TaskStore.getTask(x); //filter() returns an array!!!!!
                if (x === undefined) {
                    // delete subtaasks
                    return;
                }
                return <GenericListItem data={x} key={x.id} mayExpand={false} />
            });
            return <div>
                <div>{subTasks}</div>
                <div className={StyleHelper.getTaskClassName(this.props.data.taskLevel + 1)}><AddItem  tasklevel={this.props.data.taskLevel + 1} parentId={this.props.data.id} /></div>
            </div>
            }
        }
    }

    edit(data) {
        if (this.state.isEditing) {
            return <EditItem  parentId={data.id} text={data.name} editToggle={this.editToggle.bind(this)} />
        } else {
            return <span
                
                data={data}
                onClick={this.handleItemClick}>
                {data.name} 
            </span>
        }
    }

    render() {
        const data = this.props.data;
        return (
            <div id={StyleHelper.getTaskId(data.taskLevel)}
                className={StyleHelper.getTaskClassName(data.taskLevel)}>
                {this.edit(data)}
                <button onClick={this.handleEditClick}> Edit! </button>
                <DeleteItem parentId={data.id} />
                <div>{this.expand(data)}</div>
            </div>
        );
    }
}

GenericListItem.defaultProps = {
    maxLevel: 3
};

