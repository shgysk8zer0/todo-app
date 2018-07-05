import TodoList from './TodoList.js';
import TodoForm from './TodoForm.js';
import TodoItem from './TodoItem.js';
import SVGIcon from './SVGIcon.js';

customElements.define('todo-list', TodoList);
customElements.define('todo-form', TodoForm);
customElements.define('todo-item', TodoItem);

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
			customElements.whenDefined('svg-icon'),
		]);
	}

	async init() {
		await TodoApp.ready();
		const header = document.createElement('header');
		const list = new TodoList();
		const form = new TodoForm();
		const clearCompleted = document.createElement('button');
		clearCompleted.append(new SVGIcon('refresh'));

		header.append(clearCompleted);
		clearCompleted.addEventListener('click', () => this.clearCompleted());
		this.append(header, list, form);
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

	clearCompleted() {
		this.list.clearCompleted();
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
