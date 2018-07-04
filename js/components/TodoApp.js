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
	}

	static async getCustomElement(tag, ...args) {
		await customElements.whenDefined(tag);
		const constructor = customElements.get(tag);
		return new constructor(...args);
	}

	clear() {
		this.list.clear();
	}

	get list() {
		return this.querySelector('todo-list');
	}

	get items() {
		return this.list.items;
	}

	add(...args) {
		return this.list.add(...args);
	}
}

customElements.define('todo-app', TodoApp);
