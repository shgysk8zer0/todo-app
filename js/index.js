import './std-js/deprefixer.js';
import './std-js/shims.js';
import './components/HTMLImportElement.js';
import './shims.js';
import TodoApp from './components/TodoApp.js';
import SVGIcon from './components/SVGIcon.js';
import {$, registerServiceWorker} from './std-js/functions.js';
import {loaded} from './functions.js';
import HTMLImportElement from './components/HTMLImportElement.js';

customElements.define('html-import', HTMLImportElement);

loaded().then(async () => {
	registerServiceWorker(document.documentElement.dataset.serviceWorker);

	$(document.documentElement).replaceClass('no-js', 'js');

	$('#templates').on('import', () => {
		customElements.define('todo-app', TodoApp);
		customElements.define('svg-icon', SVGIcon);
	}, {once: true});
});
