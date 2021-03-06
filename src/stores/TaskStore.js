import {
    EventEmitter
} from "events";

import dispatcher from "../dispatcher";
import _ from "lodash";

class TaskStore extends EventEmitter {
    constructor() {
        super();
        this.tasks = [{
                id: 125123125125,
                name: "Conquer the World",
                subtask: [125125123, 561636476],
                completed: false,
                taskLevel: 0,
                parent: undefined,
                expanded: true
            },
            {
                id: 161839247,
                name: "Win GSL",
                subtask: [222222221, 35481531, 268346871248],
                completed: false,
                taskLevel: 0,
                parent: undefined,
                expanded: true
            },
            {
                id: 125125123,
                name: "Have a beer",
                subtask: [333333334],
                completed: true,
                taskLevel: 1,
                parent: 125123125125,
                expanded: true,
            },
            {
                id: 333333334,
                name: "Maybe one more",
                subtask: [4444444441],
                completed: true,
                taskLevel: 2,
                parent: 125125123,
                expanded: true,
            },
            {
                id: 4444444441,
                name: "Okay just one more",
                subtask: [],
                completed: true,
                taskLevel: 3,
                parent: 333333334,
                expanded: false,
            },
            {
                id: 561636476,
                name: "Invade Russia in winter",
                subtask: [3333331, 33333332],
                completed: false,
                taskLevel: 1,
                parent: 125123125125,
                expanded: true
            },
            {
                id: 3333331,
                name: "Don't give my army adequate winter supplies",
                subtask: [],
                completed: false,
                taskLevel: 2,
                parent: 561636476,
                expanded: false
            },
            {
                id: 33333332,
                name: "Promote Paulus (late Christmas present)",
                subtask: [],
                completed: false,
                taskLevel: 2,
                parent: 561636476,
                expanded: false
            },
            {
                id: 222222221,
                name: "Namechange to PlaneSite",
                subtask: [],
                completed: true,
                taskLevel: 1,
                parent: 161839247,
                expanded: false
            },
            {
                id: 35481531,
                name: "Pick Protoss",
                subtask: [],
                completed: false,
                taskLevel: 1,
                parent: 161839247,
                expanded: false
            },
            {
                id: 268346871248,
                name: "GG",
                subtask: [],
                completed: false,
                taskLevel: 1,
                parent: 161839247,
                expanded: false
            }
        ];
        this.incompleteTasks = [];
        this.allTasks = [];
    }
    getAll() {
        return this.tasks;
    }

    getIncomplete() {
        return this.incompleteTasks;
    }

    getLevel(int) {
        return this.tasks.filter(x => x.taskLevel === int);
    }

    getTask(id) {
        return this.tasks.filter(x => x.id === id)[0];
    }

    loadLocalStorage() {
        var local = localStorage.getItem('tasks');
        if (local) {
            this.tasks = JSON.parse(local);
        }
        this.updateIncompleteTasks();
        this.emit("change");
    }

    saveLocalStorage(data) {
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
        if (data.parentId !== null) {
            this.tasks = this.tasks.map(x => {
                if (x.id === data.parentId) {
                    x.subtask = x.subtask.concat([data.id]);
                }
                return x;
            });
        }
        this.updateIncompleteTasks();
        this.emit("change");
    }

    updateIncompleteTasks() {
        this.incompleteTasks = this.tasks.filter(x => x.completed === false);
        this.emit("change");
    }


    hideCompleted() {
        this.allTasks = this.tasks;
        this.tasks = this.incompleteTasks;
        this.emit("change");
    }

    showAll() {
        this.tasks = this.allTasks;
        this.emit("change");
    }

    deleteTask(id) {
        let taskObj = this.getTask(id);
        if (taskObj.parent !== undefined) { // delete from subtask list as well
            this.tasks = this.tasks.filter(x => x.subtask = x.subtask.filter(y => y !== id));
        }
        this.tasks = this.tasks.filter(x => x.id !== id);
        this.updateIncompleteTasks();
        this.emit("change");
    }

    toggleComplete(id) {
        this.tasks = this.tasks.map(x => {
            if (x.id === id) {
                x.completed === true ? x.completed = false : x.completed = true;
            }
            return x;
        });
        //this.completeChildren();
        //this.completeParent(id);
        this.updateIncompleteTasks();
        this.emit("change");
    }

    completeChildren() {
         this.tasks = this.tasks.map(x => {     
            x.completed === true ? x.completed = false : x.completed = false; 
            return x;
        });
        
        this.emit("change");
    }

    completeParent(id) {
        if (this.getTask(id).parent) {
            var parentId = this.getTask(id).parent;
            var siblingId = this.getTask(parentId).subtask;
            //console.log("sib id: " + siblingId);
            var siblings = [];
            _(siblingId).forEach((x) => {
                siblings.push(this.getTask(x));
            })
            //console.log(siblings);
            if (_.every(siblings.completed, true)) {
                this.tasks = this.tasks.map(x => {
                    if (x.id === parentId) {
                        x.completed === true ? x.completed = false : x.completed = true;
                    }
                    return x;
                });
            }
        }
        this.emit("change");
    }

    expandAll() {
        this.tasks = this.tasks.map(x => {
            x.expanded = true;
            return x;
        });
        this.updateIncompleteTasks();
        this.emit("change");
    }

    shrinkAll() {
        console.log("a");
        this.tasks = this.tasks.map(x => {
            x.expanded = false;
            return x;
        });
        this.updateIncompleteTasks();
        this.emit("change");
    }

    toggleExpand(id) {
        this.tasks = this.tasks.map(x => {
            if (x.id === id) {
                x.expanded === true ? x.expanded = false : x.expanded = true;
            }
            return x;
        });
        this.updateIncompleteTasks();
        this.emit("change");
    }

    editTask(data) { // send parentID (of edit button), new text.
        this.tasks = this.tasks.map((x) => {
            if (x.id === data.parentId) {
                x.name = data.name;
            }
            return x;
        });
        this.emit('change');
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TASK":
                {
                    this.addTask(action.data);
                    break;
                }
            case "DELETE_TASK":
                {
                    this.deleteTask(action.data);
                    break;
                }
            case "EDIT_TASK":
                {
                    this.editTask(action.data);
                    break;
                }
            case "TOGGLE_COMPLETE":
                {
                    this.toggleComplete(action.data);
                    break;
                }
            case "LOAD_DATA":
                {
                    this.loadLocalStorage();
                    break;
                }
            case "SAVE_DATA":
                {
                    this.saveLocalStorage();
                    break;
                }
            case "SHOW_ALL":
                {
                    this.showAll();
                    break;
                }
            case "HIDE_COMPLETED":
                {
                    this.hideCompleted();
                    break;
                }
            case "GET_TASK":
                {
                    this.getTask(action.data);
                    break;
                }
            case "TOGGLE_EXPAND":
                {
                    this.toggleExpand(action.data);
                    break;
                }
            case "EXPAND_ALL":
                {
                    this.expandAll(action.data);
                    break;
                }
            case "SHRINK_ALL":
                {
                    this.shrinkAll(action.data);
                    break;
                }
        }
    }
}

const taskStore = new TaskStore();
window.taskStore = taskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
export default taskStore;