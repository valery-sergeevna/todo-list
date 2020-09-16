window.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('input'),
		list = document.querySelector('.tasks'),
		btn = document.querySelector('.add'),
		btnClear = document.querySelector('.clear'),
		btnSave = document.querySelector('.save'),
		countAll = document.querySelector('#all'),
		countDone = document.querySelector('#done'),
		countNotDone = document.querySelector('#not-done');

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
		countTasks();
		countTasksDone();
		countUncompletedTasks();
		addToTheEnd();
	};

	const addToTheEnd = () => {
		document.querySelectorAll('li.checked').forEach(li => {
			list.insertAdjacentElement('beforeend', li);
		});
	};
	//count all tasks
	const countTasks = () => {
		countAll.textContent = document.querySelectorAll('.todo-item').length;
	};
	//count tasks done
	const countTasksDone = () => {
		countDone.textContent = document.querySelectorAll('li.checked').length;
	};
	//count uncompleted tasks
	const countUncompletedTasks = () => {
		countNotDone.textContent = parseInt(countAll.textContent - countDone.textContent);
	};
	//delete task
	const deleteTask = elem => {
		elem.addEventListener('click', (event) => {
			elem.parentElement.remove();
			event.stopPropagation();
			countTasks();
			countTasksDone();
			countUncompletedTasks();
		});
	};

	//make task done
	const makeTaskDone = (e) => {
		if (e.target.classList.contains('todo-item')) {
			e.target.classList.toggle('checked');
			e.target.classList.toggle('done');
		}
		if (e.target.classList.contains('todo-text')) {
			e.target.parentElement.classList.toggle('checked');
			e.target.parentElement.classList.toggle('done');
		}
		countTasksDone();
		countUncompletedTasks();
		addToTheEnd();
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
		countTasks();
		countTasksDone();
		countUncompletedTasks();
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
		countTasks();
		countTasksDone();
		countUncompletedTasks();
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
