import {$} from '../std-js/functions.js';

export default class TodoItem extends HTMLElement {
	constructor() {
		super();

		this.getTemplate().then(tmp => {
			$('[data-action="remove"]', tmp).click(() => this.remove());
			$('[data-action="done"]', tmp).click(() => {
				this.classList.toggle('item-done');
			});
			this.shadow = this.attachShadow({mode: 'open'}).appendChild(tmp);

			if (! (this.querySelector('[slot="label"]') instanceof HTMLElement)) {
				const label = document.createElement('b');
				label.slot = 'label';
				label.textContent = 'No label';
				this.append(label);
			}

			if (! (this.querySelector('[slot="due"]') instanceof HTMLElement)) {
				const due = document.createElement('time');
				due.slot = 'due';
				this.append(due);
			}
		});
	}

	delete() {
		this.remove();
		this.list.dispatchEvent(new CustomEvent('itemRemoved'));
	}

	get list() {
		return this.closest('todo-list');
	}

	set label(label) {
		$('[slot="label"]', this).text(label);
	}

	get label() {
		return this.querySelector('[slot="label"]').textContent;
	}

	set due(date) {
		$('[slot="due"]', this).text(date);
	}

	get due() {
		const due = this.querySelector('[slot="due"]');
		return new Date(due.datetime);
	}

	async getTemplate() {
		const template = document.getElementById('todo-item-template') || null;

		if (template instanceof HTMLElement) {
			return template.content.cloneNode(true);
		} else {
			const url = new URL('templates/todo-item.html', document.baseURI);
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

customElements.define('todo-item', TodoItem);
