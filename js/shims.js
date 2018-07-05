if (! (HTMLLinkElement.prototype.hasOwnProperty('import'))) {
	[...document.querySelectorAll('link[rel~="import"]')].forEach(async link => {
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
}
