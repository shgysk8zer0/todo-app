export default class HTMLImportElement extends HTMLElement {
	constructor() {
		super();
		const links = this.imports.split(' ')
			.map(name => document.querySelector(`link[name="${name}"]`));
		Promise.all(links.map(async link => {
			if (link.hasOwnProperty('import')) {
				return link.import;
			} else {
				await new Promise(resolve => link.addEventListener('load', () => resolve(), {once: true}));
				return link.import;
			}
		})).then(content => {
			if (this.replace) {
				const frag = document.createDocumentFragment();
				content.forEach(node => frag.append(node));
				this.replaceWith(frag);
			} else {
				content.forEach(node => this.append(node));
			}
		}).then(() => this.dispatchEvent(new CustomEvent('import')))
			.catch(console.error);
	}

	get imports() {
		return this.getAttribute('imports');
	}

	get replace() {
		return this.hasAttribute('replace');
	}

	set replace(replace) {
		if (replace) {
			this.setAttribute('replace', '');
		} else {
			this.removeAttribute('replace');
		}
	}
}
