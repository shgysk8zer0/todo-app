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
		const list = await TodoApp.getCustomElement('todo-list');
		const form = await TodoApp.getCustomElement('todo-form');
		// this.shadow = this.attachShadow({mode: 'open'}).append(list, form);
		this.append(list, form);
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
