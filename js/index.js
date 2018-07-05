import './std-js/deprefixer.js';
import './std-js/shims.js';
import './components/HTMLImportElement.js';
import {$, ready, registerServiceWorker} from './std-js/functions.js';
import TodoApp from './components/TodoApp.js';

ready().then(async () => {
	if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
		registerServiceWorker(document.documentElement.dataset.serviceWorker);
	}

	$(document.documentElement).replaceClass('no-js', 'js');

	await $('link[rel~="import"]').each(async link => {
		const parser = new DOMParser();
		try {
			const url = new URL(link.href, document.baseURI);
			const resp = await fetch(url);
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			const frag = document.createDocumentFragment();
			[...doc.head.children].forEach(child => frag.append(child));
			[...doc.body.children].forEach(child => frag.append(child));
			link.import = frag;
			link.dispatchEvent(new CustomEvent('load'));
		} catch(error) {
			link.dispatchEvent(new CustomEvent('error', {detail: error}));
		}
	});

	$('#templates').on('import', () => {
		const app = new TodoApp();
		app.addEventListener('itemAdded', console.info);
		app.addEventListener('itemRemoved', console.info);
		app.addEventListener('clear', console.info);
		document.body.append(app);
	}, {once: true});
});
