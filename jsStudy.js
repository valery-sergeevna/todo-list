window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input'),
		list = document.querySelector('.tasks'),
		btn = document.querySelector('.add'),
		btnClear = document.querySelector('.clear'),
		btnSave = document.querySelector('.save'),
		pencil = document.querySelector('.pen');

	//create to-do task
    const createTasks = () => {
        const li = document.createElement('li');
        const text = document.createElement('span');
        text.classList.add('todo-text');
		const newTodo = input.value;
		if(newTodo.trim().length === 0){
			return alert("You didn't enter anything.");
		}
        text.append(newTodo);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('todo-trash');
		const icon = document.createElement('span');
        icon.classList.add('fas', 'fa-trash-alt');
        deleteBtn.appendChild(icon);

		list.appendChild(li).append(text);
		li.append(deleteBtn);
        input.value = "";
        deleteTask(deleteBtn);
	};

	//delete task
	const deleteTask = element => {
        element.addEventListener('click', (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
	};

	//make task done
	const makeTaskDone = event  =>{
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');
		}
		if (event.target.tagName === 'SPAN' ) {
            event.target.parentElement.classList.toggle('checked');
        }
	};

    input.addEventListener("keypress", (e) => {
        const keyEnter = 13;
        if (e.keyCode == keyEnter) {
            createTasks();
        }
	});
	
	list.addEventListener("click", makeTaskDone);
	btn.addEventListener('click', createTasks);
});
