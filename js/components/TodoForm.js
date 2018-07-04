export default class TodoForm extends HTMLElement {
	constructor() {
		super();
		this.append(this.template);
		this.querySelector('form').addEventListener('submit', async event => {
			event.preventDefault();
			const item = new FormData(event.target);
			console.log(this.parentElement);
			const list = this.closest('todo-app').querySelector('todo-list');
			list.add({
				label: item.get('label'),
				due: item.get('due'),
			});
			event.target.reset();
		});
	}

	get template() {
		return document.getElementById('todo-form-template').content.cloneNode(true);
	}
}
