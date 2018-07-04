import TodoList from './TodoList.js';
import TodoForm from './TodoForm.js';

export default class TodoApp extends HTMLElement {
	constructor() {
		super();
		this.init();
	}

	static async ready() {
		await Promise.all([
			customElements.whenDefined('todo-app'),
			customElements.whenDefined('todo-list'),
			customElements.whenDefined('todo-form'),
			customElements.whenDefined('todo-item'),
		]);
	}

	async init() {
		await TodoApp.ready();
		this.append(new TodoList(), new TodoForm());
		this.dispatchEvent(new CustomEvent('ready'));
		this.list.addEventListener('itemRemoved', () => this.dispatchEvent(new CustomEvent('itemRemoved')));
	}

	static async getCustomElement(tag, ...args) {
		await customElements.whenDefined(tag);
		const constructor = customElements.get(tag);
		return new constructor(...args);
	}

	clear() {
		this.list.clear();
		this.dispatchEvent(new CustomEvent('cleared'));
	}

	get list() {
		return this.querySelector('todo-list');
	}

	get items() {
		return this.list.items;
	}

	add(...args) {
		const details = this.list.add(...args);
		this.dispatchEvent(new CustomEvent('itemAdded', {details}));
		return details;
	}
}

customElements.define('todo-app', TodoApp);
