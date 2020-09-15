window.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('input'),
		list = document.querySelector('.tasks'),
		btn = document.querySelector('.add'),
		btnClear = document.querySelector('.clear'),
		btnSave = document.querySelector('.save');

	//create to-do task
	const createTasks = () => {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		const text = document.createElement('span');
		text.classList.add('todo-text');
		const newTodo = input.value;
		if (newTodo.trim().length === 0) {
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
		makeTaskDone();
	};

	//delete task
	const deleteTask = element => {
		element.addEventListener('click', (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		});
	};

	//make task done
	const makeTaskDone = (e) => {
		if (e.target.tagName === 'LI') {
			e.target.classList.toggle('checked');
			e.target.classList.toggle('done');
		}
	};
	//load tasks with using local storage
	function loadTasks() {
		if (localStorage.getItem("list")) {
			list.innerHTML = localStorage.getItem("list");
		}
		const deleteButtons = document.querySelectorAll(".todo-trash");
        for (const button of deleteButtons) {
            deleteTask(button);
        }
	}

	//save tasks in local storage
	btnSave.addEventListener("click", () => {
		localStorage.setItem("list", list.innerHTML);
	});

	//delete all tasks
	btnClear.addEventListener("click", () => {
		document.querySelectorAll('li').forEach(li => {
			li.remove();
		});
		localStorage.removeItem('list', list.innerHTML);
	});

	input.addEventListener("keydown", (event) => {
		if (event.keyCode == 13) {
			createTasks();
		}
	});

	btn.addEventListener('click', createTasks);
	list.addEventListener('click', makeTaskDone);
	loadTasks();
});
