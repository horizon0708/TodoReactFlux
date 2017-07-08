import React from 'react';
import * as StyleHelper from './StyleHelper';
import TaskStore from "../../stores/TaskStore";
import DeleteItem from "./DeleteItem";
import AddItem from './AddItem';
import EditItem from './EditItem';
import CompleteItem from './CompleteItem';

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

    componentWillMount(){
        //console.log(this.props.maxLevel);
        if (this.props.data.taskLevel  > this.props.maxLevel){
            this.setState({mayExpand: false}, ()=>{
            console.log(this.state.mayExpand);
            });
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
            return <div className="box">
                <div>{subTasks}</div>
                <div><AddItem  tasklevel={this.props.data.taskLevel + 1} parentId={this.props.data.id} /></div>
            </div>
            }
        }
    }

    edit(data) {
        if (this.state.isEditing) {
            return <EditItem  parentId={data.id} text={data.name} editToggle={this.editToggle.bind(this)} />
        } else {
            return <span><span             
                data={data}
                onClick={this.handleItemClick}>
                {data.name} 
            </span></span>
        }
    }

    render() {
        const data = this.props.data;
        return (
            <div id={StyleHelper.getTaskId(data.taskLevel)}
                className={StyleHelper.getTaskClassName(data.taskLevel)}>
                <span className="tick-box"><CompleteItem parentId={data.id} /></span>
                {this.edit(data)}
                <i onClick={this.handleEditClick} className="fa fa-pencil" />
                <DeleteItem parentId={data.id} />
                <div>{this.expand(data)}</div>
            </div>
        );
    }
}

GenericListItem.defaultProps = {
    maxLevel: 5
};

