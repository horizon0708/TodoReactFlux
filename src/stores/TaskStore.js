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
            taskLevel: 0

        },
        {
            id: 161839247,
            name: "drink more coffee",
            subtask: [35481531, 268346871248],
            completed: false,
            taskLevel: 0
        },
        {
            id: 125125123,
            name: "order it!",
            subtask: [],
            completed: false,
            taskLevel: 1
        },
        {
            id: 561636476,
            name: "life the cup to your mouth!",
            subtask: [],
            completed: false,
            taskLevel: 1
        },
        {
            id: 35481531,
            name: "Should I really be drinking another coffee?",
            subtask: [],
            completed: false,
            taskLevel: 1
        },
        {
            id: 268346871248,
            name: "It is rather late.",
            subtask: [],
            completed: false,
            taskLevel: 1
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
        return this.tasks.filter(x => x.id === id);
    }
}

const taskStore = new TaskStore();
window.taskStore = taskStore;
export default taskStore;