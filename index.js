import * as wasm from "fuzzy-search";
import lorem from './lorem';

window.log = str => console.log('[fuzzy-wasm] ', str);

const loremOpts = {
	isHardcore: false
};

async function renderLorem() {
	let text = await lorem.getLorem(loremOpts);


	document.getElementById('text').innerHTML = text;
	document.getElementById('searchField').disabled = false;
}

async function handleSearch(e) {
	const content = await lorem.getLorem(loremOpts);
	const query = e.target.value;

	console.time('fuzz');
	const fuzzyed = jsFuzzy(query, content);
	console.timeEnd('fuzz');

	document.getElementById('text').innerHTML = fuzzyed;
}

function jsFuzzy(query, content) {
	const rgx = new RegExp(query, 'g');

	return content.replace(rgx, i => `<span>${i}</span>`);
}

async function handleSearchJS(e) {
	const content = await lorem.getLorem(loremOpts);
	const query = e.target.value;

	console.time('fuzz');
	const fuzzyed = wasm.fuzzy(query, content);
	console.timeEnd('fuzz');
	document.getElementById('text').innerHTML = fuzzyed;
}

document.getElementById('searchField').addEventListener('input', handleSearch);

renderLorem();
