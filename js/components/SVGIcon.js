export default class SVGIcon extends HTMLElement {
	constructor(icon) {
		super();
		const template = document.getElementById('svg-icon-template').content.cloneNode(true);
		const use = template.querySelector('use');
		const url = new URL(use.getAttribute('xlink:href'), document.baseURI);
		url.hash = icon || this.icon;
		use.setAttribute('xlink:href', url);
		this.append(template);
	}

	get icon() {
		return this.getAttribute('icon');
	}

	set icon(icon) {
		this.setAttribute('icon', icon);
	}
}
