const Model = (() => {
    class Task{
        constructor(id, title, isTask, isOverdue, counter){
            this.id = id;
            this.title = title;
            this.isTask = isTask;
            this.isOverdue = isOverdue;
            this.counter = counter;
        }
    }

    const tasklist = [];

    return{
        Task,
        tasklist
    }
})();

const TodoAPI = ((model) => {
    const importData = () => {
        model.tasklist.push(new model.Task(1, "Campaign Tasks", true, false, 1));
        model.tasklist.push(new model.Task(2, "Learning", true, false, 14));
        model.tasklist.push(new model.Task(3, "Stories Tasks", true, true, 11));
        model.tasklist.push(new model.Task(4, "SC Task", true, true, 1));
        model.tasklist.push(new model.Task(5, "Portal Swweys", true, false, 2));
        model.tasklist.push(new model.Task(6, "Campaign Tasks", true, false, 1));
        model.tasklist.push(new model.Task(7, "Learning", true, false, 14));
        model.tasklist.push(new model.Task(8, "Stories Tasks", true, true, 11));
        model.tasklist.push(new model.Task(9, "SC Task", true, true, 1));
        model.tasklist.push(new model.Task(10, "Portal Swweys", true, false, 2));
        model.tasklist.push(new model.Task(11, "Campaign Tasks", true, false, 1));
        model.tasklist.push(new model.Task(12, "Learning", true, false, 14));
        model.tasklist.push(new model.Task(13, "Stories Tasks", true, true, 11));
        model.tasklist.push(new model.Task(14, "SC Task", true, true, 1));
        model.tasklist.push(new model.Task(15, "Portal Swweys", true, false, 2));
        model.tasklist.push(new model.Task(16, "Campaign Tasks", true, false, 1));
        model.tasklist.push(new model.Task(17, "Learning", true, false, 14));
        model.tasklist.push(new model.Task(18, "Stories Tasks", true, true, 11));
        model.tasklist.push(new model.Task(19, "SC Task", true, true, 1));
        model.tasklist.push(new model.Task(20, "Portal Swweys", true, false, 2));
    };

    return {
        importData
    }
})(Model);

const View = ((model) => {
    const listView = document.querySelector('.list');
    const addTask = (id, title, isTask, isOverdue, counter) => {
        if (isTask){
            let overdue = '';
            let duesoon = '';
            isOverdue ? duesoon='unselected' : overdue='unselected';
            htmlblock = 
                `<div class="items" id="${id}">
                <div class="task-name">
                    <div><input type="checkbox" class="task-checkbox"></div><span>${title}</span>
                </div>
                <div class="labels">
                    <div class="overdue-lab ${overdue}">${counter} Overdue</div>
                    <div class="soon-lab ${duesoon}">${counter} Due Soon</div>
                </div>
                </div>`;
            
            listView.innerHTML += htmlblock;
        }
    };

    const setOverdueCounter = (amount) => {
        const counter = document.querySelector('#overdue-counter');
        counter.innerHTML = amount;
    };

    const setDueSoonCounter = (amount) => {
        const counter = document.querySelector('#due-soon-counter');
        counter.innerHTML = amount;
    }

    const setAllCounter = (amount) => {
        const counter = document.querySelector('#all-counter');
        counter.innerHTML = amount;
    }
    
    const render = (showtask=false) => {
        listView.innerHTML = '';
        model.tasklist.forEach((task) => {
            if (!showtask){
                addTask(task.id, task.title, task.isTask, task.isOverdue, task.counter);
            }else{
                if (!task.isOverdue){
                    addTask(task.id, task.title, task.isTask, task.isOverdue, task.counter);
                }
            }
        })
        setAllCounter(model.tasklist.length);
        let overdue = model.tasklist.reduce((acc, cur) => 
            cur.isOverdue === true ? ++acc : acc, 0);
        setOverdueCounter(overdue);
        setDueSoonCounter(model.tasklist.length - overdue);
    };

    return {
        render
    }
})(Model);

const Controller = ((model, view, api) => {
    var swtich = false;

    const addListenerOnSwitch = () => {
        const swtich = document.querySelector('.switcher');
        swtich.addEventListener('click', event => {
            if (this.switch){
                document.querySelector('.switcher-on').style.visibility = 'hidden';
                document.querySelector('.switcher-off').style.visibility = 'visible';
                this.switch = false;
            }else{
                document.querySelector('.switcher-on').style.visibility = 'visible';
                document.querySelector('.switcher-off').style.visibility = 'hidden';
                this.switch = true;
            }
            view.render(this.switch);
        })
    }

    const init = () => {
        new Promise((res, rej) => {
            res(api.importData())
        })
            .then(
                data => {
                    view.render();
                    addListenerOnSwitch();
            });
    }
    
    return{
        init,
        addListenerOnSwitch
    }
})(Model, View, TodoAPI);

Controller.init();