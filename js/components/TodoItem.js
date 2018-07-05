import {$} from '../std-js/functions.js';

export default class TodoItem extends HTMLElement {
	constructor(label = null, {
		due = null,
	} = {}) {
		super();

		this.getTemplate().then(tmp => {
			$('[data-action="remove"]', tmp).click(() => this.remove());
			$('[data-action="done"]', tmp).click(() => {
				this.done = ! this.done;
			});
			this.shadow = this.attachShadow({mode: 'open'}).appendChild(tmp);

			if (label) {
				const labelEl = document.createElement('b');
				labelEl.textContent = label;
				labelEl.slot = 'label';
				this.append(labelEl);
			} else if (! (this.querySelector('[slot="label"]') instanceof HTMLElement)) {
				const labelEl = document.createElement('b');
				labelEl.slot = 'label';
				labelEl.textContent = 'No label';
				this.append(labelEl);
			}

			if (due instanceof Date) {
				const dueEl = document.createElement('time');
				dueEl.textContent = due.toLocaleDateString();
				dueEl.datetime = due;
				dueEl.slot = 'due';
				this.append(dueEl);
			} else if (! (this.querySelector('[slot="due"]') instanceof HTMLElement)) {
				const dueEl = document.createElement('time');
				dueEl.slot = 'due';
				this.append(dueEl);
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

	set done(completed) {
		this.shadowRoot.querySelector('.todo-item').classList.toggle('item-done', completed);
	}

	get done() {
		return this.shadowRoot.querySelector('.todo-item').classList.contains('item-done');
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
