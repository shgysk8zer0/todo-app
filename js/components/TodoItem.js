import {$} from '../std-js/functions.js';

export default class TodoItem extends HTMLElement {
	constructor() {
		super();

		const tmp = this.template;
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

	get template() {
		return document.getElementById('todo-item-template').content.cloneNode(true);
	}
}
