import './std-js/deprefixer.js';
import './std-js/shims.js';
import './components/HTMLImportElement.js';
import './shims.js';
import {$, registerServiceWorker} from './std-js/functions.js';
import {loaded, loadedHandler} from './functions.js';

loaded().then(async () => {
	registerServiceWorker(document.documentElement.dataset.serviceWorker);

	$(document.documentElement).replaceClass('no-js', 'js');

	$('#templates').on('import', loadedHandler, {once: true});
});
