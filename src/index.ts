import PSPDFKit from 'pspdfkit';

function load(document: string) {
	console.log(`Loading ${document}...`);
	PSPDFKit.load({
		document,
		container: '.container',
	})
		.then((instance) => {
			console.log('PSPDFKit loaded', instance);
		})
		.catch(console.error);
}

load('document.pdf'); // Pass your PDF file.