import { EventEmitter } from "events";

import dispatcher from "../dispatcher"

class TaskStore extends EventEmitter {
    constructor(){
        super();
        this.tasks = [{
            id: 125123125125,
            name: "drink coffee",
            subtask: [125125123,561636476],
            completed: false,
            taskLevel: 0,
            parent: null
        },
        {
            id: 161839247,
            name: "drink more coffee",
            subtask: [35481531, 268346871248],
            completed: false,
            taskLevel: 0,
            parent: null
        },
        {
            id: 125125123,
            name: "order it!",
            subtask: [],
            completed: false,
            taskLevel: 1,
            parent: 125123125125
        },
        {
            id: 561636476,
            name: "life the cup to your mouth!",
            subtask: [],
            completed: false,
            taskLevel: 1,
            parent: 125123125125
        },
        {
            id: 35481531,
            name: "Should I really be drinking another coffee?",
            subtask: [],
            completed: false,
            taskLevel: 1,
            parent: 161839247
        },
        {
            id: 268346871248,
            name: "It is rather late.",
            subtask: [],
            completed: false,
            taskLevel: 1,
            parent: 161839247
        }
        ]
    }
    getAll(){
        return this.tasks;
    }

    getLevel(int){
        return this.tasks.filter(x => x.taskLevel === int);
    }

    getTask(id){     
        return this.tasks.filter(x => x.id === id)[0];
    }

    addTask(data){
        this.tasks.push({
            id: Date.now(),
            name: data.name,
            subtask: [],
            completed: false,
            taskLevel: data.tasklevel
        });
        this.emit("change");
    }
    deleteTask(id){           
        let taskObj = this.getTask(id);
        if (taskObj.parent !== null){
            //delete from subtask 
            // I could search through all tasks, but would it be better to define the parent task?
        this.tasks = this.tasks.map((x) => {
            if (x.id === taskObj.parent){
                x.subtask = x.subtask.filter(x => x.id !== id);
            }
            return x;
        })
            
    }   
        this.tasks = this.tasks.filter(x => x.id !== id);
        this.emit("change");
    }
    deleteSubTask(data){

    }

    handleActions(action){
        switch(action.type){
            case "CREATE_TASK":{
                this.addTask(action.data);
                break;
            }
            case "DELETE_TASK":{
                this.deleteTask(action.data);
                break;
            }
        }
    }
}

const taskStore = new TaskStore();
window.taskStore = taskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
export default taskStore;