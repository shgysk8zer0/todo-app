import './std-js/deprefixer.js';
import './std-js/shims.js';
import {$, ready, registerServiceWorker} from './std-js/functions.js';
import TodoApp from './components/TodoApp.js';

ready().then(async () => {
	$(document.documentElement).replaceClass('no-js', 'js');

	if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
		registerServiceWorker(document.documentElement.dataset.serviceWorker);
	}

	// await loadTemplates('todo-item', 'todo-form');
	const app = new TodoApp();
	document.body.append(app);

	app.addEventListener('itemAdded', console.info);
	app.addEventListener('itemRemoved', console.info);
	app.addEventListener('clear', console.info);
});
