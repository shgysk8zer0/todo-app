import './std-js/deprefixer.js';
import './std-js/shims.js';
import {$, ready, registerServiceWorker} from './std-js/functions.js';
import TodoApp from './components/TodoApp.js';
import TodoList from './components/TodoList.js';
import TodoItem from './components/TodoItem.js';
import TodoForm from './components/TodoForm.js';

customElements.define('todo-app', TodoApp);
customElements.define('todo-list', TodoList);
customElements.define('todo-item', TodoItem);
customElements.define('todo-form', TodoForm);

async function loadTemplates(...tags) {
	const parser = new DOMParser();
	await Promise.all(tags.map(async tag => {
		const url = new URL(`templates/${tag}.html`,document.baseURI);
		const resp = await fetch(url);
		const html = await resp.text();
		const doc = parser.parseFromString(html, 'text/html');
		await $('template', doc).each(template => document.body.append(template));
	}));
}

ready().then(async () => {
	$(document.documentElement).replaceClass('no-js', 'js');

	if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
		registerServiceWorker(document.documentElement.dataset.serviceWorker);
	}

	await loadTemplates('todo-item', 'todo-form');

	document.body.append(new TodoApp());
});
