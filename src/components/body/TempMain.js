import React from 'react';
import '../../App.css';
import TaskStore from "../../stores/TaskStore";
import GenericListItem from "./GenericListItem";
import AddItem from './AddItem';
import * as TaskActions from "../../actions/TaskActions";

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
            }, () => {
            TaskActions.saveStorage();
                
            })
        })

        TaskActions.loadStoragedata();
        
    }

    render(){
        const listItems = this.state.tasks.map((x)=>{
            return <GenericListItem data={x} key={x.id} />
        });
        return(
            <div className="row">
                <div className="col-sm-8 offset-sm-2" id="body"> <span id="title">The List. </span>
                    {listItems}
                    <AddItem tasklevel={0} />
                </div>
            </div>
        );
    }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}