export default class TodoForm extends HTMLElement {
	constructor() {
		super();
		this.getTemplate().then(template => {
			template.querySelector('form').addEventListener('submit', async event => {
				event.preventDefault();
				const item = new FormData(event.target);
				const list = this.closest('todo-app').querySelector('todo-list');
				list.add({
					label: item.get('label'),
					due: item.has('due') ? new Date(item.get('due')) : null,
				});
				event.target.reset();
			});
			this.append(template);
		});
	}

	async getTemplate() {
		const template = document.getElementById('todo-form-template') || null;

		if (template instanceof HTMLElement) {
			return template.content.cloneNode(true);
		} else {
			const url = new URL('templates/todo-form.html', document.baseURI);
			const resp = await fetch(url);
			const html = await resp.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const tmp = doc.querySelector('template');
			document.body.append(tmp);
			return tmp.content.cloneNode(true);
		}
	}
}
