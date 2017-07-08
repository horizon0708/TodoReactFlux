import { EventEmitter } from "events";

import dispatcher from "../dispatcher"

class TaskStore extends EventEmitter {
    constructor() {
        super();
        this.tasks = [{
            id: 125123125125,
            name: "drink coffee",
            subtask: [125125123, 561636476],
            completed: false,
            taskLevel: 0,
            parent: undefined
        },
        {
            id: 161839247,
            name: "drink more coffee",
            subtask: [35481531, 268346871248],
            completed: false,
            taskLevel: 0,
            parent: undefined
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
    getAll() {
        return this.tasks;
    }

    getLevel(int) {
        return this.tasks.filter(x => x.taskLevel === int);
    }

    getTask(id) {
        return this.tasks.filter(x => x.id === id)[0];
    }

    loadLocalStorage(){
        var local = localStorage.getItem('tasks');
        if (local){
            this.tasks = JSON.parse(local);
        }
        this.emit("change");
    }

    saveLocalStorage(data){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

    }

    addTask(data) {
        this.tasks.push({
            id: data.id,
            name: data.name,
            subtask: [],
            completed: false,
            taskLevel: data.tasklevel,
            parent: data.parentId
        });
        // if parentid exists, add to subtasks as well
        if(data.parentId !== null){
            this.tasks = this.tasks.map(x => {
                if( x.id === data.parentId ){
                    x.subtask = x.subtask.concat([data.id]);
                }
                return x;
            });
        }
        this.emit("change");
    }

    toggleComplete(id){
        this.tasks = this.tasks.map(x => {
            if (x.id === id){
                x.completed === true ? x.completed = false : x.completed = true;
            }
            return x;
        });
        this.emit("change");
    }
    
    deleteTask(id) {
        let taskObj = this.getTask(id);
        if (taskObj.parent !== undefined) { // delete from subtask list as well
            this.tasks = this.tasks.filter(x => x.subtask = x.subtask.filter(y => y !== id));
        }
        this.tasks = this.tasks.filter(x => x.id !== id);
        this.emit("change");
    }
    
    editTask(data) { // send parentID (of edit button), new text.
        this.tasks = this.tasks.map((x) => {
            if(x.id === data.parentId){
                x.name = data.name;
            }
            return x;
        });
        this.emit('change');
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TASK": {
                this.addTask(action.data);
                break;
            }
            case "DELETE_TASK": {
                this.deleteTask(action.data);
                break;
            }
            case "EDIT_TASK": {
                this.editTask(action.data);
                break;
            }
            case "TOGGLE_COMPLETE": {
                this.toggleComplete(action.data);
                break;
            }
            case "LOAD_DATA": {
                this.loadLocalStorage();
                break;
            }
            case "SAVE_DATA": {
                this.saveLocalStorage();
                break;
            }
        }
    }
}

const taskStore = new TaskStore();
window.taskStore = taskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
export default taskStore;