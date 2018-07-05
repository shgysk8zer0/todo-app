import TodoItem from './TodoItem.js';

export default class TodoList extends HTMLElement
{
	add({label = 'No label', due = null} = {}) {
		const item = new TodoItem(label, {due});
		this.append(item);
		return item;
	}

	clear() {
		this.items.forEach(item => item.remove());
	}

	clearCompleted() {
		this.items.filter(item => item.done).forEach(item => item.remove());
	}

	get items() {
		return [...this.querySelectorAll('todo-item')];
	}
}

customElements.define('todo-list', TodoList);
