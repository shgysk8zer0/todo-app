import {$, ready} from './std-js/functions.js';
import TodoApp from './components/TodoApp.js';

export async function loaded() {
	await ready();
	if (! (HTMLLinkElement.prototype.hasOwnProperty('import'))) {
		await $('link[rel="import"]:not([async])').map(async link => new Promise(resolve => {
			link.addEventListener('load', () => resolve(), {once: true});
		}));
	}
}

export async function loadedHandler() {
	const app = new TodoApp();
	app.addEventListener('itemAdded', console.info);
	app.addEventListener('itemRemoved', console.info);
	app.addEventListener('clear', console.info);
	document.body.append(app);
}
